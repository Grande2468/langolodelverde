import Stripe from 'stripe';
import { adminDb, json } from './_lib/firebaseAdmin';

// Crea l'ordine e la sessione di pagamento Stripe.
// Prezzi, giacenze e spese di spedizione vengono ricalcolati QUI dal database:
// il browser manda solo id prodotto, quantità, metodo di consegna e dati cliente.

interface Body {
  items?: { id: string; qty: number }[];
  shippingMethodId?: string;
  customer?: Record<string, string>;
}

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dut9zxpsq';

const handle = async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Metodo non consentito' }, 405);
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: 'Pagamenti non ancora configurati. Contattaci per ordinare.' }, 503);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Richiesta non valida' }, 400);
  }

  // --- cliente
  const c = body.customer ?? {};
  const customer = {
    nome: str(c.nome, 80),
    cognome: str(c.cognome, 80),
    email: str(c.email, 120).toLowerCase(),
    telefono: str(c.telefono, 30),
    indirizzo: str(c.indirizzo, 200),
    cap: str(c.cap, 10),
    citta: str(c.citta, 80),
    provincia: str(c.provincia, 2).toUpperCase(),
    note: str(c.note, 1000),
  };
  if (!customer.nome || !customer.cognome || !customer.telefono || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return json({ error: 'Compila nome, cognome, email e telefono.' }, 400);
  }

  // --- articoli (unisce eventuali doppioni)
  const qtyById = new Map<string, number>();
  for (const it of body.items ?? []) {
    const id = str(it?.id, 120);
    const qty = Math.floor(Number(it?.qty));
    if (!id || !Number.isFinite(qty) || qty < 1 || qty > 99) return json({ error: 'Quantità non valida' }, 400);
    qtyById.set(id, (qtyById.get(id) ?? 0) + qty);
  }
  if (qtyById.size === 0 || qtyById.size > 50) return json({ error: 'Carrello vuoto o troppo grande' }, 400);

  const db = adminDb();
  const snaps = await db.getAll(...[...qtyById.keys()].map((id) => db.doc(`products/${id}`)));

  const items: { productId: string; name: string; price: number; qty: number; image: string | null }[] = [];
  let pickupOnly = false;
  for (const snap of snaps) {
    const p = snap.data();
    const qty = qtyById.get(snap.id)!;
    if (!snap.exists || !p || !p.visible) return json({ error: 'Un prodotto nel carrello non è più disponibile. Aggiorna il carrello.' }, 409);
    const stock = Number(p.stock?.online ?? 0);
    if (stock < qty) {
      return json({ error: `"${p.name}": disponibili solo ${Math.max(0, stock)} pezzi. Aggiorna il carrello.` }, 409);
    }
    if (!Number.isInteger(p.price) || p.price <= 0) return json({ error: `Prezzo non valido per "${p.name}"` }, 409);
    if (p.pickupOnly) pickupOnly = true;
    items.push({ productId: snap.id, name: p.name, price: p.price, qty, image: p.images?.[0] ?? null });
  }
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  // --- spedizione
  const shipSnap = await db.doc('public/shipping').get();
  const methods: { id: string; name: string; type: 'spedizione' | 'ritiro'; price: number; freeAbove?: number | null; active: boolean }[] =
    shipSnap.data()?.methods ?? [];
  const method = methods.find((m) => m.id === body.shippingMethodId && m.active);
  if (!method) return json({ error: 'Metodo di consegna non valido' }, 400);
  if (pickupOnly && method.type === 'spedizione') {
    return json({ error: 'Nel carrello ci sono prodotti disponibili solo con ritiro in negozio.' }, 400);
  }
  if (method.type === 'spedizione' && (!customer.indirizzo || !/^\d{5}$/.test(customer.cap) || !customer.citta || customer.provincia.length !== 2)) {
    return json({ error: "Compila l'indirizzo di spedizione completo." }, 400);
  }
  const shippingCost = method.freeAbove && subtotal >= method.freeAbove ? 0 : Math.max(0, Math.round(method.price || 0));
  const total = subtotal + shippingCost;

  // --- numero ordine progressivo + ordine "non pagato"
  const orderRef = db.collection('orders').doc();
  const now = Date.now();
  const number = await db.runTransaction(async (tx) => {
    const counterRef = db.doc('counters/orders');
    const counter = await tx.get(counterRef);
    const next = (counter.data()?.last ?? 1000) + 1;
    tx.set(counterRef, { last: next }, { merge: true });
    const num = `ADV-${next}`;
    tx.set(orderRef, {
      number: num,
      status: 'in_attesa_pagamento',
      items,
      subtotal,
      shippingMethod: { id: method.id, name: method.name, type: method.type },
      shippingCost,
      total,
      customer,
      stockApplied: false,
      createdAt: now,
      updatedAt: now,
    });
    return num;
  });

  // --- sessione Stripe (solo carta)
  const origin = new URL(req.url).origin;
  const stripe = new Stripe(secret);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      allowed_payment_method_types: ['card'], // solo carta
      locale: 'it',
      customer_email: customer.email,
      client_reference_id: orderRef.id,
      metadata: { orderId: orderRef.id, orderNumber: number },
      payment_intent_data: { metadata: { orderId: orderRef.id, orderNumber: number }, description: `Ordine ${number}` },
      line_items: [
        ...items.map((i) => ({
          quantity: i.qty,
          price_data: {
            currency: 'eur',
            unit_amount: i.price,
            product_data: {
              name: i.name.slice(0, 250),
              ...(i.image && !/^https?:/.test(i.image)
                ? { images: [`https://res.cloudinary.com/${CLOUD}/image/upload/f_jpg,q_auto,c_pad,b_white,w_400,h_400/${i.image}`] }
                : {}),
            },
          },
        })),
        ...(shippingCost > 0
          ? [{ quantity: 1, price_data: { currency: 'eur', unit_amount: shippingCost, product_data: { name: method.name } } }]
          : []),
      ],
      success_url: `${origin}/ordine-completato?ordine=${encodeURIComponent(number)}`,
      cancel_url: `${origin}/checkout`,
      expires_at: Math.floor(now / 1000) + 60 * 60, // 1 ora
    });
    await orderRef.update({ stripeSessionId: session.id, updatedAt: Date.now() });
    return json({ url: session.url, number });
  } catch (err) {
    console.error('Stripe error', err);
    await orderRef.update({ status: 'annullato', cancelReason: 'Errore creazione pagamento', updatedAt: Date.now() });
    return json({ error: 'Impossibile avviare il pagamento. Riprova tra poco.' }, 502);
  }
};

export default async (req: Request) => {
  try {
    return await handle(req);
  } catch (err) {
    console.error('Errore checkout', err);
    return json({ error: 'Errore del server, riprova tra poco o contattaci al 320 665 8669.' }, 500);
  }
};

export const config = { path: '/api/checkout' };

import Stripe from 'stripe';
import { adminDb, json } from './_lib/firebaseAdmin';

// Stripe chiama questo indirizzo quando un pagamento va a buon fine (o scade).
// Qui l'ordine diventa "pagato" e la merce viene scaricata dal magazzino ONLINE.
// È idempotente: se Stripe ripete l'evento, la merce non viene scaricata due volte.

interface CatalogItem {
  id: string;
  stockOnline: number;
  [k: string]: unknown;
}

const markPaid = async (orderId: string, session: Stripe.Checkout.Session) => {
  const db = adminDb();
  await db.runTransaction(async (tx) => {
    const orderRef = db.doc(`orders/${orderId}`);
    const orderSnap = await tx.get(orderRef);
    const order = orderSnap.data();
    if (!orderSnap.exists || !order) return;
    if (order.stockApplied) return; // già elaborato

    const items: { productId: string; name: string; qty: number }[] = order.items ?? [];
    const productRefs = items.map((i) => db.doc(`products/${i.productId}`));
    const products = productRefs.length ? await tx.getAll(...productRefs) : [];
    const catalogRef = db.doc('public/catalog');
    const catalogSnap = await tx.get(catalogRef);

    const now = Date.now();
    let oversold = false;
    const catalogItems: CatalogItem[] = catalogSnap.data()?.items ?? [];

    items.forEach((it, idx) => {
      const p = products[idx];
      if (!p?.exists) return;
      const current = Number(p.data()?.stock?.online ?? 0);
      const next = current - it.qty;
      if (next < 0) oversold = true;
      tx.update(p.ref, { 'stock.online': next, updatedAt: now });
      tx.set(db.collection('movements').doc(), {
        productId: it.productId,
        productName: it.name,
        location: 'online',
        type: 'vendita_online',
        qty: -it.qty,
        stockAfter: next,
        orderId,
        orderNumber: order.number,
        note: `Ordine ${order.number}`,
        by: 'stripe',
        createdAt: now,
      });
      const ci = catalogItems.find((c) => c.id === it.productId);
      if (ci) ci.stockOnline = next;
    });

    if (catalogSnap.exists) tx.update(catalogRef, { items: catalogItems, updatedAt: now });

    tx.update(orderRef, {
      status: order.status === 'in_attesa_pagamento' || order.status === 'annullato' ? 'pagato' : order.status,
      stockApplied: true,
      oversold,
      cancelReason: null,
      paidAt: now,
      paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
      updatedAt: now,
    });
  });
};

const markExpired = async (orderId: string) => {
  const db = adminDb();
  const ref = db.doc(`orders/${orderId}`);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (snap.data()?.status === 'in_attesa_pagamento') {
      tx.update(ref, { status: 'annullato', cancelReason: 'Pagamento non completato', updatedAt: Date.now() });
    }
  });
};

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Metodo non consentito' }, 405);
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) return json({ error: 'Stripe non configurato' }, 503);

  const stripe = new Stripe(secret);
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, req.headers.get('stripe-signature') ?? '', whSecret);
  } catch (err) {
    console.error('Firma webhook non valida', err);
    return json({ error: 'Firma non valida' }, 400);
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId && session.payment_status === 'paid') await markPaid(orderId, session);
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.orderId) await markExpired(session.metadata.orderId);
    }
  } catch (err) {
    console.error('Errore elaborazione webhook', err);
    return json({ error: 'Errore interno' }, 500); // Stripe riproverà
  }
  return json({ received: true });
};

export const config = { path: '/api/stripe-webhook' };

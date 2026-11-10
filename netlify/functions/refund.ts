import Stripe from 'stripe';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb, json, requireAdmin } from './_lib/firebaseAdmin';

// Rimborso di un ordine dal pannello admin (totale o parziale), con eventuale rientro merce
// nel magazzino online. Solo l'admin loggato può chiamarla.

interface Body {
  orderId?: string;
  amount?: number; // centesimi; se assente = tutto il residuo
  restock?: boolean; // rimetti in magazzino online gli articoli dell'ordine
  reason?: string;
}

interface CatalogItem {
  id: string;
  stockOnline: number;
  [k: string]: unknown;
}

const handle = async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Metodo non consentito' }, 405);
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: 'Stripe non configurato' }, 503);
  const admin = await requireAdmin(req);
  if (!admin) return json({ error: 'Non autorizzato' }, 401);

  const body = (await req.json().catch(() => ({}))) as Body;
  if (!body.orderId) return json({ error: 'Ordine mancante' }, 400);

  const db = adminDb();
  const orderRef = db.doc(`orders/${body.orderId}`);
  const snap = await orderRef.get();
  const order = snap.data();
  if (!snap.exists || !order) return json({ error: 'Ordine non trovato' }, 404);
  if (!order.paymentIntent) return json({ error: "L'ordine non risulta pagato con Stripe" }, 400);

  const already = Number(order.refundedTotal ?? 0);
  const residual = Number(order.total) - already;
  const amount = body.amount == null ? residual : Math.round(Number(body.amount));
  if (!Number.isInteger(amount) || amount <= 0) return json({ error: 'Importo non valido' }, 400);
  if (amount > residual) return json({ error: `Puoi rimborsare al massimo ${(residual / 100).toFixed(2)} €` }, 400);

  const reason = String(body.reason ?? '').slice(0, 300);
  const stripe = new Stripe(secret);
  let refund: Stripe.Refund;
  try {
    refund = await stripe.refunds.create(
      {
        payment_intent: order.paymentIntent,
        amount,
        metadata: { orderId: body.orderId, orderNumber: order.number, by: admin.email ?? 'admin' },
      },
      // evita doppi rimborsi se il pulsante viene premuto due volte
      { idempotencyKey: `refund-${body.orderId}-${already}-${amount}` }
    );
  } catch (err) {
    console.error('Errore rimborso Stripe', err);
    const msg = err instanceof Error ? err.message : 'errore sconosciuto';
    return json({ error: `Stripe ha rifiutato il rimborso: ${msg}` }, 502);
  }

  const now = Date.now();
  const refundedTotal = already + amount;
  const fullyRefunded = refundedTotal >= Number(order.total);

  await db.runTransaction(async (tx) => {
    const fresh = (await tx.get(orderRef)).data() ?? {};
    const doRestock = !!body.restock && !!fresh.stockApplied;
    const items: { productId: string; name: string; qty: number }[] = fresh.items ?? [];
    const productRefs = doRestock ? items.map((i) => db.doc(`products/${i.productId}`)) : [];
    const products = productRefs.length ? await tx.getAll(...productRefs) : [];
    const catalogRef = db.doc('public/catalog');
    const catalogSnap = doRestock ? await tx.get(catalogRef) : null;
    const catalogItems: CatalogItem[] = catalogSnap?.data()?.items ?? [];

    if (doRestock) {
      items.forEach((it, idx) => {
        const p = products[idx];
        if (!p?.exists) return;
        const next = Number(p.data()?.stock?.online ?? 0) + it.qty;
        tx.update(p.ref, { 'stock.online': next, updatedAt: now });
        tx.set(db.collection('movements').doc(), {
          productId: it.productId,
          productName: it.name,
          location: 'online',
          type: 'reso',
          qty: it.qty,
          stockAfter: next,
          orderId: body.orderId,
          orderNumber: fresh.number,
          note: `Rimborso ordine ${fresh.number}${reason ? ` — ${reason}` : ''}`,
          by: admin.email ?? 'admin',
          createdAt: now,
        });
        const ci = catalogItems.find((c) => c.id === it.productId);
        if (ci) ci.stockOnline = next;
      });
      if (catalogSnap?.exists) tx.update(catalogRef, { items: catalogItems, updatedAt: now });
    }

    tx.update(orderRef, {
      refundedTotal,
      refunds: FieldValue.arrayUnion({ id: refund.id, amount, reason, status: refund.status, at: now, by: admin.email ?? 'admin' }),
      ...(doRestock ? { stockApplied: false } : {}),
      ...(fullyRefunded ? { status: 'annullato', cancelReason: reason || 'Rimborsato' } : {}),
      updatedAt: now,
    });
  });

  return json({ ok: true, refundId: refund.id, status: refund.status, refundedTotal, fullyRefunded });
};

export default async (req: Request) => {
  try {
    return await handle(req);
  } catch (err) {
    console.error('Errore rimborso', err);
    return json({ error: 'Errore del server durante il rimborso' }, 500);
  }
};

export const config = { path: '/api/refund' };

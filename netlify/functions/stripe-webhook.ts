import Stripe from 'stripe';
import { adminDb, json } from './_lib/firebaseAdmin';
import { readOrderStock, writeOrderStock } from './_lib/stock';
import { sendOrderEmails } from './_lib/email';

// Stripe chiama questo indirizzo quando un pagamento va a buon fine (o scade).
// Qui l'ordine diventa "pagato" e la merce viene scaricata dal magazzino ONLINE.
// È idempotente: se Stripe ripete l'evento, la merce non viene scaricata due volte.

const markPaid = async (orderId: string, session: Stripe.Checkout.Session) => {
  const db = adminDb();
  const orderRef = db.doc(`orders/${orderId}`);
  let justPaid = false;
  await db.runTransaction(async (tx) => {
    const orderSnap = await tx.get(orderRef);
    const order = orderSnap.data();
    if (!orderSnap.exists || !order) return;
    if (order.stockApplied) return; // già elaborato

    const items: { productId: string; name: string; qty: number }[] = order.items ?? [];
    const reads = await readOrderStock(tx, db, items);
    const now = Date.now();
    const { oversold } = writeOrderStock(tx, db, reads, items, { orderId, orderNumber: order.number, by: 'stripe', now });

    tx.update(orderRef, {
      status: order.status === 'in_attesa_pagamento' || order.status === 'annullato' ? 'pagato' : order.status,
      stockApplied: true,
      oversold,
      cancelReason: null,
      paidAt: now,
      paymentCollected: true,
      paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
      updatedAt: now,
    });
    justPaid = true;
  });
  // email di conferma solo la prima volta (Stripe può ripetere l'evento)
  if (justPaid) {
    const fresh = (await orderRef.get()).data();
    if (fresh) await sendOrderEmails(fresh as Parameters<typeof sendOrderEmails>[0]);
  }
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

/** Rimborsi fatti dal pannello Stripe: aggiorna l'importo rimborsato sull'ordine. */
const syncRefund = async (charge: Stripe.Charge) => {
  const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!pi) return;
  const db = adminDb();
  const found = await db.collection('orders').where('paymentIntent', '==', pi).limit(1).get();
  if (found.empty) return;
  const ref = found.docs[0].ref;
  await db.runTransaction(async (tx) => {
    const o = (await tx.get(ref)).data();
    if (!o) return;
    const refundedTotal = Math.max(Number(o.refundedTotal ?? 0), charge.amount_refunded);
    const full = charge.refunded || refundedTotal >= Number(o.total);
    tx.update(ref, {
      refundedTotal,
      ...(full && o.status !== 'annullato' ? { status: 'annullato', cancelReason: o.cancelReason || 'Rimborsato da Stripe' } : {}),
      updatedAt: Date.now(),
    });
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
    } else if (event.type === 'charge.refunded') {
      await syncRefund(event.data.object as Stripe.Charge);
    }
  } catch (err) {
    console.error('Errore elaborazione webhook', err);
    return json({ error: 'Errore interno' }, 500); // Stripe riproverà
  }
  return json({ received: true });
};

export const config = { path: '/api/stripe-webhook' };

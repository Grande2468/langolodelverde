import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { db } from '../lib/firebase';
import { DEFAULT_CATEGORIES, toCatalogItem, upsertCatalogItems } from '../lib/catalog';
import type {
  CatalogDoc,
  Category,
  Movement,
  MovementType,
  Order,
  Product,
  PaymentsDoc,
  ShippingDoc,
  StockLocation,
} from '../lib/types';
import { auth, idToken } from './auth';
import { randomSuffix, slugify } from '../lib/format';

const catalogRef = () => doc(db, 'public', 'catalog');
const who = () => auth.currentUser?.email ?? 'admin';

const readCatalog = (data: Partial<CatalogDoc> | undefined): CatalogDoc => ({
  items: data?.items ?? [],
  categories: data?.categories?.length ? data.categories : DEFAULT_CATEGORIES,
  updatedAt: data?.updatedAt ?? 0,
});

/* ----------------------------- PRODOTTI ----------------------------- */

export const listProducts = async (): Promise<Product[]> => {
  const snap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ ...(d.data() as Product), id: d.id }));
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? ({ ...(snap.data() as Product), id: snap.id }) : null;
};

export type ProductInput = Omit<Product, 'id' | 'stock' | 'createdAt' | 'updatedAt'>;

/** Crea o aggiorna un prodotto e la sua voce nel catalogo pubblico, in un'unica transazione. */
export const saveProduct = async (
  input: ProductInput,
  existingId?: string,
  initialStock?: { online: number; negozio: number }
): Promise<string> => {
  const id = existingId ?? `${slugify(input.name) || 'prodotto'}-${randomSuffix()}`;
  const ref = doc(db, 'products', id);
  const now = Date.now();

  await runTransaction(db, async (tx) => {
    const [snap, cat] = [await tx.get(ref), await tx.get(catalogRef())];
    const catalog = readCatalog(cat.data() as CatalogDoc | undefined);
    let product: Product;
    if (existingId) {
      if (!snap.exists()) throw new Error('Il prodotto non esiste più');
      const prev = snap.data() as Product;
      product = { ...prev, ...input, id, updatedAt: now };
    } else {
      const stock = { online: Math.max(0, initialStock?.online ?? 0), negozio: Math.max(0, initialStock?.negozio ?? 0) };
      product = { ...input, id, stock, createdAt: now, updatedAt: now };
      (['online', 'negozio'] as StockLocation[]).forEach((loc) => {
        if (stock[loc] > 0) {
          tx.set(doc(collection(db, 'movements')), {
            productId: id,
            productName: input.name,
            location: loc,
            type: 'carico',
            qty: stock[loc],
            stockAfter: stock[loc],
            note: 'Giacenza iniziale',
            by: who(),
            createdAt: now,
          });
        }
      });
    }
    const { id: _omit, ...data } = product;
    void _omit;
    tx.set(ref, data);
    tx.set(catalogRef(), { ...catalog, items: upsertCatalogItems(catalog.items, product), updatedAt: now });
  });
  return id;
};

export const deleteProduct = async (id: string) => {
  await runTransaction(db, async (tx) => {
    const cat = await tx.get(catalogRef());
    const catalog = readCatalog(cat.data() as CatalogDoc | undefined);
    tx.delete(doc(db, 'products', id));
    tx.set(catalogRef(), { ...catalog, items: upsertCatalogItems(catalog.items, null, id), updatedAt: Date.now() });
  });
};

/** Ricostruisce il catalogo pubblico da zero leggendo tutti i prodotti (pulsante "ripara"). */
export const rebuildCatalog = async () => {
  const products = await listProducts();
  const cat = await getDoc(catalogRef());
  const catalog = readCatalog(cat.data() as CatalogDoc | undefined);
  const items = products.filter((p) => p.visible).map(toCatalogItem).sort((a, b) => b.createdAt - a.createdAt);
  await setDoc(catalogRef(), { ...catalog, items, updatedAt: Date.now() });
  return items.length;
};

export const getCatalog = async () => readCatalog((await getDoc(catalogRef())).data() as CatalogDoc | undefined);

export const saveCategories = async (categories: Category[]) => {
  await runTransaction(db, async (tx) => {
    const cat = await tx.get(catalogRef());
    const catalog = readCatalog(cat.data() as CatalogDoc | undefined);
    tx.set(catalogRef(), { ...catalog, categories, updatedAt: Date.now() });
  });
};

/* ----------------------------- MAGAZZINO ----------------------------- */

export interface StockMoveInput {
  productId: string;
  type: Extract<MovementType, 'carico' | 'scarico' | 'trasferimento' | 'rettifica'>;
  location: StockLocation; // per trasferimento: magazzino di PARTENZA
  qty: number; // per rettifica: quantità contata (valore assoluto)
  note?: string;
}

export const moveStock = async ({ productId, type, location, qty, note }: StockMoveInput) => {
  if (!Number.isInteger(qty) || qty < 0 || (type !== 'rettifica' && qty === 0)) throw new Error('Quantità non valida');
  const ref = doc(db, 'products', productId);
  await runTransaction(db, async (tx) => {
    const [snap, cat] = [await tx.get(ref), await tx.get(catalogRef())];
    if (!snap.exists()) throw new Error('Prodotto non trovato');
    const p = { ...(snap.data() as Product), id: snap.id };
    const stock = { online: p.stock?.online ?? 0, negozio: p.stock?.negozio ?? 0 };
    const now = Date.now();
    const base = { productId, productName: p.name, note: note ?? '', by: who(), createdAt: now };
    const addMove = (loc: StockLocation, delta: number, t: MovementType, extraNote?: string) => {
      stock[loc] += delta;
      tx.set(doc(collection(db, 'movements')), {
        ...base,
        location: loc,
        type: t,
        qty: delta,
        stockAfter: stock[loc],
        note: [base.note, extraNote].filter(Boolean).join(' — '),
      });
    };

    if (type === 'carico') addMove(location, qty, 'carico');
    else if (type === 'scarico') {
      if (stock[location] - qty < 0) throw new Error(`Giacenza ${location} insufficiente (${stock[location]})`);
      addMove(location, -qty, 'scarico');
    } else if (type === 'rettifica') {
      const delta = qty - stock[location];
      if (delta === 0) throw new Error('La giacenza è già questa');
      addMove(location, delta, 'rettifica', `contati ${qty}`);
    } else {
      const to: StockLocation = location === 'online' ? 'negozio' : 'online';
      if (stock[location] - qty < 0) throw new Error(`Giacenza ${location} insufficiente (${stock[location]})`);
      addMove(location, -qty, 'trasferimento', `verso ${to}`);
      addMove(to, qty, 'trasferimento', `da ${location}`);
    }

    tx.update(ref, { stock, updatedAt: now });
    const catalog = readCatalog(cat.data() as CatalogDoc | undefined);
    tx.set(catalogRef(), { ...catalog, items: upsertCatalogItems(catalog.items, { ...p, stock }), updatedAt: now });
  });
};

export const listMovements = async (productId?: string, max = 150): Promise<Movement[]> => {
  const q = productId
    ? query(collection(db, 'movements'), where('productId', '==', productId), limit(500))
    : query(collection(db, 'movements'), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ ...(d.data() as Movement), id: d.id }))
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, max);
};

/* ----------------------------- ORDINI ----------------------------- */

export const listOrders = async (max = 300): Promise<Order[]> => {
  const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(max)));
  return snap.docs.map((d) => ({ ...(d.data() as Order), id: d.id }));
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const snap = await getDoc(doc(db, 'orders', id));
  return snap.exists() ? ({ ...(snap.data() as Order), id: snap.id }) : null;
};

export const updateOrder = (id: string, patch: Partial<Order>) =>
  updateDoc(doc(db, 'orders', id), { ...patch, updatedAt: Date.now() });

/** Annulla un ordine pagato e rimette la merce nel magazzino online (il rimborso si fa su Stripe). */
export const cancelOrderAndRestock = async (orderId: string, reason: string) => {
  await runTransaction(db, async (tx) => {
    const oRef = doc(db, 'orders', orderId);
    const oSnap = await tx.get(oRef);
    if (!oSnap.exists()) throw new Error('Ordine non trovato');
    const order = oSnap.data() as Order;
    const now = Date.now();
    if (order.stockApplied) {
      const refs = order.items.map((i) => doc(db, 'products', i.productId));
      const snaps: Awaited<ReturnType<typeof tx.get>>[] = [];
      for (const r of refs) snaps.push(await tx.get(r));
      const cat = await tx.get(catalogRef());
      let catalog = readCatalog(cat.data() as CatalogDoc | undefined);
      order.items.forEach((it, i) => {
        const s = snaps[i];
        if (!s.exists()) return;
        const p = { ...(s.data() as Product), id: s.id };
        const stock = { online: (p.stock?.online ?? 0) + it.qty, negozio: p.stock?.negozio ?? 0 };
        tx.update(s.ref, { stock, updatedAt: now });
        tx.set(doc(collection(db, 'movements')), {
          productId: it.productId,
          productName: it.name,
          location: 'online',
          type: 'reso',
          qty: it.qty,
          stockAfter: stock.online,
          orderId,
          orderNumber: order.number,
          note: `Annullo ordine ${order.number}${reason ? ` — ${reason}` : ''}`,
          by: who(),
          createdAt: now,
        });
        catalog = { ...catalog, items: upsertCatalogItems(catalog.items, { ...p, stock }) };
      });
      tx.set(catalogRef(), { ...catalog, updatedAt: now });
    }
    tx.update(oRef, { status: 'annullato', stockApplied: false, cancelReason: reason || 'Annullato dall\'admin', updatedAt: now });
  });
};

export const deleteOrder = (id: string) => deleteDoc(doc(db, 'orders', id));

/** Rimborso tramite Stripe (totale se amount è omesso), con rientro merce facoltativo. */
export const refundOrder = async (orderId: string, opts: { amount?: number; restock: boolean; reason: string }) => {
  const res = await fetch('/api/refund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await idToken()}` },
    body: JSON.stringify({ orderId, ...opts }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Errore rimborso (${res.status})`);
  return data as { refundId: string; status: string; refundedTotal: number; fullyRefunded: boolean };
};

/* ----------------------------- SPEDIZIONI ----------------------------- */

export const getShipping = async (): Promise<ShippingDoc> => {
  const snap = await getDoc(doc(db, 'public', 'shipping'));
  return snap.exists() ? (snap.data() as ShippingDoc) : { methods: [] };
};

export const saveShipping = (s: ShippingDoc) => setDoc(doc(db, 'public', 'shipping'), s);

export const savePayments = (p: PaymentsDoc) => setDoc(doc(db, 'public', 'payments'), p);

/** Contrassegno / pagamento al ritiro: registra l'incasso. */
export const markCollected = (id: string) =>
  updateDoc(doc(db, 'orders', id), { paymentCollected: true, paidAt: Date.now(), updatedAt: Date.now() });

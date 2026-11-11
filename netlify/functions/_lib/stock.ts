import type { DocumentSnapshot, Firestore, Transaction } from 'firebase-admin/firestore';

// Scarico del magazzino ONLINE per un ordine, dentro una transazione Firestore.
// Le letture (readOrderStock) devono avvenire prima di qualsiasi scrittura della transazione.

interface Item {
  productId: string;
  name: string;
  qty: number;
}

interface CatalogItem {
  id: string;
  stockOnline: number;
  [k: string]: unknown;
}

export interface StockReads {
  products: DocumentSnapshot[];
  catalog: DocumentSnapshot;
}

export const readOrderStock = async (tx: Transaction, db: Firestore, items: Item[]): Promise<StockReads> => {
  const refs = items.map((i) => db.doc(`products/${i.productId}`));
  const products = refs.length ? await tx.getAll(...refs) : [];
  const catalog = await tx.get(db.doc('public/catalog'));
  return { products, catalog };
};

/**
 * Scala la giacenza online e registra i movimenti "vendita_online".
 * Ritorna oversold=true se un prodotto NON su ordinazione va sotto zero.
 */
export const writeOrderStock = (
  tx: Transaction,
  db: Firestore,
  reads: StockReads,
  items: Item[],
  meta: { orderId: string; orderNumber: string; by: string; now: number }
) => {
  let oversold = false;
  const catalogItems: CatalogItem[] = (reads.catalog.data()?.items as CatalogItem[]) ?? [];
  items.forEach((it, idx) => {
    const p = reads.products[idx];
    if (!p?.exists) return;
    const data = p.data() ?? {};
    const next = Number(data.stock?.online ?? 0) - it.qty;
    if (next < 0 && !data.backorder) oversold = true;
    tx.update(p.ref, { 'stock.online': next, updatedAt: meta.now });
    tx.set(db.collection('movements').doc(), {
      productId: it.productId,
      productName: it.name,
      location: 'online',
      type: 'vendita_online',
      qty: -it.qty,
      stockAfter: next,
      orderId: meta.orderId,
      orderNumber: meta.orderNumber,
      note: `Ordine ${meta.orderNumber}${next < 0 && data.backorder ? ' (su ordinazione: da ordinare al fornitore)' : ''}`,
      by: meta.by,
      createdAt: meta.now,
    });
    const ci = catalogItems.find((c) => c.id === it.productId);
    if (ci) ci.stockOnline = next;
  });
  if (reads.catalog.exists) tx.update(reads.catalog.ref, { items: catalogItems, updatedAt: meta.now });
  return { oversold };
};

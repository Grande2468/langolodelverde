import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from './firebase';
import type { CatalogDoc, CatalogItem, Category, PaymentsDoc, Product, ShippingDoc } from './types';
import { DEFAULT_PAYMENTS } from './types';

// Categorie di partenza (le stesse del sito originale). L'admin può cambiarle dalle Impostazioni.
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'motocoltivatori-tosaerba',
    name: 'Motocoltivatori e Tosaerba',
    description: 'Potenza e affidabilità per la lavorazione del terreno e la cura del prato',
    imageId: 'ChatGPT_Image_5_giu_2025_09_22_05_fqxrh8',
  },
  {
    id: 'attrezzatura-giardino',
    name: 'Attrezzatura da Giardino',
    description: 'Tutto il necessario per la manutenzione e la bellezza del tuo giardino',
    imageId: 'ChatGPT_Image_5_giu_2025_09_24_28_pdklkk',
  },
  {
    id: 'ricambi',
    name: 'Ricambi',
    description: 'Componenti originali per mantenere le tue attrezzature sempre efficienti',
    imageId: 'Parti_di_ricambio_per_tosaerba_lwgr9c',
  },
  {
    id: 'utensileria',
    name: 'Utensileria',
    description: 'Utensili professionali e accessori di qualità per ogni tipo di lavorazione',
    imageId: 'creami-un-la-foto-per-la-categoria-utensileria-per_pnsevp',
  },
];

export const EMPTY_CATALOG: CatalogDoc = { items: [], categories: DEFAULT_CATEGORIES, updatedAt: 0 };

// Tutto il catalogo sta in UN documento: una sola lettura Firestore per visita,
// così si resta comodamente nel piano gratuito anche con centinaia di prodotti.
const CACHE_KEY = 'adv_catalog_v1';
const CACHE_TTL = 5 * 60 * 1000;
let memory: Promise<CatalogDoc> | null = null;

const normalize = (data: Partial<CatalogDoc> | undefined): CatalogDoc => ({
  items: data?.items ?? [],
  categories: data?.categories?.length ? data.categories : DEFAULT_CATEGORIES,
  updatedAt: data?.updatedAt ?? 0,
});

export const fetchCatalog = async (fresh = false): Promise<CatalogDoc> => {
  if (!fresh) {
    if (memory) return memory;
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const { at, data } = JSON.parse(raw);
        if (Date.now() - at < CACHE_TTL) {
          memory = Promise.resolve(data as CatalogDoc);
          return memory;
        }
      }
    } catch {
      /* sessionStorage non disponibile */
    }
  }
  memory = getDoc(doc(db, 'public', 'catalog'))
    .then((snap) => {
      const data = normalize(snap.exists() ? (snap.data() as CatalogDoc) : undefined);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
      } catch {
        /* ignora */
      }
      return data;
    })
    .catch((err) => {
      memory = null;
      throw err;
    });
  return memory;
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    return snap.exists() ? ({ ...(snap.data() as Product), id: snap.id }) : null;
  } catch {
    // permesso negato = prodotto nascosto: per il pubblico non esiste
    return null;
  }
};

export const fetchShipping = async (): Promise<ShippingDoc> => {
  const snap = await getDoc(doc(db, 'public', 'shipping'));
  return snap.exists() ? (snap.data() as ShippingDoc) : { methods: [] };
};

export const fetchPayments = async (): Promise<PaymentsDoc> => {
  const snap = await getDoc(doc(db, 'public', 'payments'));
  const d = (snap.exists() ? snap.data() : {}) as Partial<PaymentsDoc>;
  return {
    card: d.card ?? DEFAULT_PAYMENTS.card,
    cod: { ...DEFAULT_PAYMENTS.cod, ...(d.cod ?? {}) },
    payOnPickup: { ...DEFAULT_PAYMENTS.payOnPickup, ...(d.payOnPickup ?? {}) },
  };
};

/** Prodotto completo → voce del catalogo pubblico */
export const toCatalogItem = (p: Product): CatalogItem => ({
  id: p.id,
  name: p.name,
  categoryId: p.categoryId,
  brand: p.brand || '',
  image: p.images?.[0] ?? null,
  shortDescription: (p.shortDescription || '').slice(0, 180),
  price: p.price,
  comparePrice: p.comparePrice ?? null,
  stockOnline: p.stock?.online ?? 0,
  featured: !!p.featured,
  pickupOnly: !!p.pickupOnly,
  backorder: !!p.backorder,
  leadTime: p.leadTime || '',
  createdAt: p.createdAt,
});

/** Quantità massima ordinabile: la giacenza online, oppure fino a 20 pezzi se il prodotto è su ordinazione. */
export const BACKORDER_MAX = 20;
export const maxOrderable = (i: Pick<CatalogItem, 'stockOnline' | 'backorder'>) =>
  Math.max(0, i.stockOnline) > 0 && !i.backorder ? i.stockOnline : i.backorder ? Math.max(BACKORDER_MAX, i.stockOnline) : 0;
export const isOnBackorder = (i: Pick<CatalogItem, 'stockOnline' | 'backorder'>, qty = 1) => !!i.backorder && i.stockOnline < qty;

/** Inserisce/aggiorna/rimuove un prodotto nella lista del catalogo, ordinata dal più recente. */
export const upsertCatalogItems = (items: CatalogItem[], product: Product | null, removeId?: string) => {
  const id = product?.id ?? removeId;
  const rest = items.filter((i) => i.id !== id);
  if (product && product.visible) rest.push(toCatalogItem(product));
  return rest.sort((a, b) => b.createdAt - a.createdAt);
};

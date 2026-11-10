// Tutti i prezzi sono in CENTESIMI (intero), IVA inclusa. Tutte le date in millisecondi.

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageId?: string; // public_id Cloudinary
}

export interface StockLevels {
  online: number;
  negozio: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  brand?: string;
  sku?: string;
  images: string[]; // public_id Cloudinary, la prima è la copertina
  shortDescription: string;
  description: string;
  price: number;
  comparePrice?: number | null; // prezzo barrato
  visible: boolean;
  featured: boolean;
  pickupOnly: boolean; // solo ritiro in negozio (es. macchine ingombranti)
  stock: StockLevels;
  createdAt: number;
  updatedAt: number;
}

/** Versione ridotta del prodotto salvata nel documento unico public/catalog. */
export interface CatalogItem {
  id: string;
  name: string;
  categoryId: string;
  brand?: string;
  image: string | null;
  shortDescription: string;
  price: number;
  comparePrice?: number | null;
  stockOnline: number;
  featured: boolean;
  pickupOnly: boolean;
  createdAt: number;
}

export interface CatalogDoc {
  items: CatalogItem[];
  categories: Category[];
  updatedAt: number;
}

export type ShippingType = 'spedizione' | 'ritiro';

export interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  type: ShippingType;
  price: number;
  freeAbove?: number | null; // gratis sopra questo subtotale
  active: boolean;
}

export interface ShippingDoc {
  methods: ShippingMethod[];
}

export type OrderStatus =
  | 'in_attesa_pagamento'
  | 'pagato'
  | 'in_preparazione'
  | 'spedito'
  | 'pronto_ritiro'
  | 'completato'
  | 'annullato';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string | null;
}

export interface Customer {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
  note?: string;
}

export interface InvoiceData {
  tipo: 'privato' | 'azienda';
  codiceFiscale?: string;
  ragioneSociale?: string;
  partitaIva?: string;
  codiceDestinatario?: string; // codice SDI (7 caratteri)
  pec?: string;
  indirizzo: string; // indirizzo di fatturazione completo
}

export interface Refund {
  id: string;
  amount: number;
  reason?: string;
  status?: string | null;
  at: number;
  by?: string;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingMethod: { id: string; name: string; type: ShippingType };
  shippingCost: number;
  total: number;
  customer: Customer;
  invoice?: InvoiceData | null;
  refundedTotal?: number;
  refunds?: Refund[];
  stripeSessionId?: string;
  paymentIntent?: string;
  stockApplied?: boolean;
  oversold?: boolean;
  courier?: string;
  tracking?: string;
  adminNotes?: string;
  cancelReason?: string;
  createdAt: number;
  paidAt?: number;
  updatedAt: number;
}

export type MovementType = 'carico' | 'scarico' | 'trasferimento' | 'rettifica' | 'vendita_online' | 'reso';
export type StockLocation = keyof StockLevels;

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  location: StockLocation;
  type: MovementType;
  qty: number; // variazione con segno
  stockAfter: number;
  note?: string;
  orderId?: string;
  orderNumber?: string;
  by?: string;
  createdAt: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  in_attesa_pagamento: 'Non pagato',
  pagato: 'Pagato — da preparare',
  in_preparazione: 'In preparazione',
  spedito: 'Spedito',
  pronto_ritiro: 'Pronto per il ritiro',
  completato: 'Completato',
  annullato: 'Annullato',
};

export const MOVEMENT_LABELS: Record<MovementType, string> = {
  carico: 'Carico',
  scarico: 'Scarico',
  trasferimento: 'Trasferimento',
  rettifica: 'Rettifica inventario',
  vendita_online: 'Vendita online',
  reso: 'Reso / annullo ordine',
};

export const LOCATION_LABELS: Record<StockLocation, string> = {
  online: 'Online',
  negozio: 'Negozio',
};

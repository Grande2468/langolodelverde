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
  backorder?: boolean; // ordinabile anche se esaurito (su ordinazione dal fornitore)
  leadTime?: string; // tempi di consegna per i prodotti su ordinazione, es. "7-10 giorni lavorativi"
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
  backorder?: boolean;
  leadTime?: string;
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

export type PaymentMethod = 'carta' | 'contrassegno' | 'ritiro';

export interface PaymentsDoc {
  card: boolean;
  cod: { enabled: boolean; fee: number; maxTotal?: number | null }; // contrassegno: commissione e importo massimo
  payOnPickup: { enabled: boolean }; // pagamento in negozio al ritiro
}

export const DEFAULT_PAYMENTS: PaymentsDoc = {
  card: true,
  cod: { enabled: true, fee: 400, maxTotal: 50000 },
  payOnPickup: { enabled: true },
};

export type OrderStatus =
  | 'in_attesa_pagamento'
  | 'da_pagare'
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
  backorder?: boolean; // ordinato oltre la giacenza: da procurare dal fornitore
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
  codFee?: number;
  total: number;
  paymentMethod?: PaymentMethod;
  paymentCollected?: boolean; // contrassegno / ritiro: incasso registrato
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
  da_pagare: 'Da preparare — paga alla consegna/ritiro',
  pagato: 'Pagato — da preparare',
  in_preparazione: 'In preparazione',
  spedito: 'Spedito',
  pronto_ritiro: 'Pronto per il ritiro',
  completato: 'Completato',
  annullato: 'Annullato',
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  carta: 'Carta (Stripe)',
  contrassegno: 'Contrassegno',
  ritiro: 'Pagamento al ritiro in negozio',
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

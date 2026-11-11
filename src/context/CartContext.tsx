import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import type { CatalogItem } from '../lib/types';
import { maxOrderable } from '../lib/catalog';

export interface CartLine {
  id: string;
  qty: number;
  name: string;
  price: number;
  image: string | null;
  pickupOnly: boolean;
  maxQty: number;
  backorder?: boolean;
  leadTime?: string;
  stock?: number; // giacenza online al momento dell'aggiunta/verifica
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: CatalogItem, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** riallinea prezzi/disponibilità al catalogo aggiornato; ritorna i messaggi per l'utente */
  sync: (items: CatalogItem[]) => string[];
  lastAdded: { name: string; at: number } | null;
}

const KEY = 'adv_cart_v1';
const Ctx = createContext<CartCtx | null>(null);

const load = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(load);
  const [lastAdded, setLastAdded] = useState<CartCtx['lastAdded']>(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignora */
    }
  }, [lines]);

  const add = useCallback((item: CatalogItem, qty = 1) => {
    setLines((prev) => {
      const max = maxOrderable(item);
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) => (l.id === item.id ? { ...l, qty: Math.min(max, l.qty + qty), maxQty: max, stock: item.stockOnline } : l));
      }
      return [
        ...prev,
        {
          id: item.id,
          qty: Math.min(max, qty),
          name: item.name,
          price: item.price,
          image: item.image,
          pickupOnly: item.pickupOnly,
          maxQty: max,
          backorder: !!item.backorder,
          leadTime: item.leadTime || '',
          stock: item.stockOnline,
        },
      ];
    });
    setLastAdded({ name: item.name, at: Date.now() });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(l.maxQty || 1, Math.floor(qty) || 1)) } : l))
    );
  }, []);

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const sync = useCallback((items: CatalogItem[]) => {
    const messages: string[] = [];
    setLines((prev) => {
      const next: CartLine[] = [];
      for (const l of prev) {
        const item = items.find((i) => i.id === l.id);
        if (!item) {
          messages.push(`"${l.name}" non è più disponibile ed è stato rimosso dal carrello.`);
          continue;
        }
        const max = maxOrderable(item);
        if (max <= 0) {
          messages.push(`"${l.name}" è esaurito ed è stato rimosso dal carrello.`);
          continue;
        }
        if (item.price !== l.price) messages.push(`Il prezzo di "${l.name}" è stato aggiornato.`);
        const qty = Math.min(l.qty, max);
        if (qty < l.qty) messages.push(`Per "${l.name}" sono disponibili solo ${max} pezzi.`);
        next.push({
          ...l,
          qty,
          name: item.name,
          price: item.price,
          image: item.image,
          pickupOnly: item.pickupOnly,
          maxQty: max,
          backorder: !!item.backorder,
          leadTime: item.leadTime || '',
          stock: item.stockOnline,
        });
      }
      return next;
    });
    return messages;
  }, []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return { lines, count, subtotal, add, setQty, remove, clear, sync, lastAdded };
  }, [lines, add, setQty, remove, clear, sync, lastAdded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart fuori da CartProvider');
  return ctx;
};

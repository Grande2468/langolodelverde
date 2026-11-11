import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Search, Truck, Store, AlertTriangle } from 'lucide-react';
import { listOrders } from '../api';
import { ADMIN_BASE } from '../base';
import { Btn, Card, ErrorBox, PageTitle, Spinner, StatusBadge, errMsg, inputCls } from '../components/ui';
import { dateTime, euro } from '../../lib/format';
import type { Order, OrderStatus } from '../../lib/types';

const TABS: { id: string; label: string; statuses: OrderStatus[] }[] = [
  { id: 'da-evadere', label: 'Da evadere', statuses: ['pagato', 'da_pagare', 'in_preparazione'] },
  { id: 'in-consegna', label: 'Spediti / da ritirare', statuses: ['spedito', 'pronto_ritiro'] },
  { id: 'completati', label: 'Completati', statuses: ['completato'] },
  { id: 'annullati', label: 'Annullati', statuses: ['annullato'] },
  { id: 'non-pagati', label: 'Non pagati', statuses: ['in_attesa_pagamento'] },
  { id: 'tutti', label: 'Tutti', statuses: [] },
];

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('da-evadere');
  const [q, setQ] = useState('');

  const load = () => {
    setOrders(null);
    listOrders()
      .then(setOrders)
      .catch((e) => setError(errMsg(e)));
  };
  useEffect(load, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const t of TABS) m[t.id] = (orders ?? []).filter((o) => !t.statuses.length || t.statuses.includes(o.status)).length;
    return m;
  }, [orders]);

  const filtered = useMemo(() => {
    const t = TABS.find((x) => x.id === tab)!;
    const s = q.trim().toLowerCase();
    return (orders ?? []).filter(
      (o) =>
        (!t.statuses.length || t.statuses.includes(o.status)) &&
        (!s ||
          `${o.number} ${o.customer.nome} ${o.customer.cognome} ${o.customer.email} ${o.customer.telefono} ${o.customer.citta}`
            .toLowerCase()
            .includes(s))
    );
  }, [orders, tab, q]);

  return (
    <>
      <PageTitle title="Ordini">
        <Btn variant="secondary" onClick={load}>
          <RefreshCw className="h-4 w-4" /> Aggiorna
        </Btn>
      </PageTitle>
      <ErrorBox error={error} />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
              tab === t.id ? 'bg-primary-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t.label} {orders && <span className="opacity-70">({counts[t.id]})</span>}
          </button>
        ))}
      </div>

      <label className="relative block mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input className={`${inputCls} pl-9`} placeholder="Cerca per numero, cliente, email, telefono, città" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>

      {!orders ? (
        !error && <Spinner />
      ) : filtered.length === 0 ? (
        <Card className="p-10 text-center text-gray-500">Nessun ordine.</Card>
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y">
            {filtered.map((o) => (
              <li key={o.id}>
                <Link to={`${ADMIN_BASE}/ordini/${o.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 hover:bg-gray-50">
                  <span className="font-semibold w-24">{o.number}</span>
                  <span className="flex-grow min-w-[10rem]">
                    <span className="block font-medium">
                      {o.customer.nome} {o.customer.cognome}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      {o.shippingMethod.type === 'ritiro' ? <Store className="h-3.5 w-3.5" /> : <Truck className="h-3.5 w-3.5" />}
                      {o.shippingMethod.type === 'ritiro' ? 'Ritiro in negozio' : `${o.customer.citta} (${o.customer.provincia})`} ·{' '}
                      {o.items.reduce((s, i) => s + i.qty, 0)} articoli · {dateTime(o.createdAt)}
                    </span>
                  </span>
                  {o.paymentMethod && o.paymentMethod !== 'carta' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-800">
                      {o.paymentMethod === 'contrassegno' ? 'Contrassegno' : 'Paga al ritiro'}
                      {o.paymentCollected ? ' ✓' : ''}
                    </span>
                  )}
                  {o.oversold && <AlertTriangle className="h-4 w-4 text-red-600" aria-label="Giacenza insufficiente" />}
                  <span className="font-semibold">{euro(o.total)}</span>
                  <StatusBadge status={o.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};

export default OrdersAdmin;

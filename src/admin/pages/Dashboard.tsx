import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listOrders, listProducts } from '../api';
import { ADMIN_BASE } from '../base';
import { Card, ErrorBox, PageTitle, Spinner, StatusBadge, errMsg } from '../components/ui';
import { dateTime, euro } from '../../lib/format';
import type { Order, Product } from '../../lib/types';

const PAID = ['pagato', 'in_preparazione', 'spedito', 'pronto_ritiro', 'completato'];

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listOrders(), listProducts()])
      .then(([o, p]) => {
        setOrders(o);
        setProducts(p);
      })
      .catch((e) => setError(errMsg(e)));
  }, []);

  if (error) return <ErrorBox error={error} />;
  if (!orders) return <Spinner />;

  const toShip = orders.filter((o) => o.status === 'pagato' || o.status === 'in_preparazione');
  const monthAgo = Date.now() - 30 * 864e5;
  const revenue = orders.filter((o) => PAID.includes(o.status) && (o.paidAt ?? o.createdAt) > monthAgo).reduce((s, o) => s + o.total, 0);
  const soldOut = products.filter((p) => p.visible && (p.stock?.online ?? 0) <= 0);
  const low = products.filter((p) => p.visible && (p.stock?.online ?? 0) > 0 && (p.stock?.online ?? 0) <= 2);

  const stat = (label: string, value: string | number, to?: string, alert = false) => {
    const body = (
      <Card className={`p-5 h-full ${alert ? 'border-amber-300 bg-amber-50' : ''}`}>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </Card>
    );
    return to ? <Link to={to}>{body}</Link> : body;
  };

  return (
    <>
      <PageTitle title="Riepilogo" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stat('Ordini da evadere', toShip.length, `${ADMIN_BASE}/ordini`, toShip.length > 0)}
        {stat('Incassato ultimi 30 giorni', euro(revenue))}
        {stat('Esauriti online', soldOut.length, `${ADMIN_BASE}/magazzino`, soldOut.length > 0)}
        {stat('Prodotti in negozio online', products.filter((p) => p.visible).length, `${ADMIN_BASE}/prodotti`)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-semibold px-5 pt-5 pb-3">Ordini da evadere</h2>
          {toShip.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-gray-500">Nessun ordine in attesa. 🎉</p>
          ) : (
            <ul className="divide-y">
              {toShip.slice(0, 10).map((o) => (
                <li key={o.id}>
                  <Link to={`${ADMIN_BASE}/ordini/${o.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50">
                    <span>
                      <span className="font-medium">{o.number}</span>{' '}
                      <span className="text-sm text-gray-500">
                        {o.customer.nome} {o.customer.cognome} · {dateTime(o.paidAt ?? o.createdAt)}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{euro(o.total)}</span>
                      <StatusBadge status={o.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-semibold px-5 pt-5 pb-3">Scorte da controllare</h2>
          {soldOut.length + low.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-gray-500">Tutto in ordine.</p>
          ) : (
            <ul className="divide-y">
              {[...soldOut, ...low].slice(0, 12).map((p) => (
                <li key={p.id} className="flex justify-between px-5 py-2.5 text-sm">
                  <Link to={`${ADMIN_BASE}/prodotti/${p.id}`} className="hover:text-primary-700 truncate">
                    {p.name}
                  </Link>
                  <span className={(p.stock?.online ?? 0) <= 0 ? 'text-red-600 font-semibold' : 'text-amber-700'}>
                    online {p.stock?.online ?? 0} · negozio {p.stock?.negozio ?? 0}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;

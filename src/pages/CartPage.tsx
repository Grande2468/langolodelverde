import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Minus, Plus, Trash2, ShoppingBag, Store } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useCart } from '../context/CartContext';
import { fetchCatalog } from '../lib/catalog';
import { cld } from '../lib/cloudinary';
import { euro } from '../lib/format';

const CartPage = () => {
  const { lines, subtotal, setQty, remove, sync } = useCart();
  const [notices, setNotices] = useState<string[]>([]);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  // allinea il carrello a prezzi e disponibilità aggiornati
  useEffect(() => {
    fetchCatalog(true)
      .then((c) => setNotices(sync(c.items)))
      .catch(() => undefined)
      .finally(() => setChecking(false));
  }, [sync]);

  return (
    <>
      <Helmet>
        <title>Carrello | L'angolo del verde</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeader title="Il tuo carrello" />

      <div className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
        {notices.length > 0 && (
          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-900 text-sm space-y-1">
            {notices.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </div>
        )}

        {lines.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-6">Il carrello è vuoto.</p>
            <Link to="/prodotti" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
              Scopri i prodotti
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <ul className="lg:col-span-2 divide-y border rounded-lg bg-white">
              {lines.map((l) => (
                <li key={l.id} className="p-4 flex gap-4">
                  <Link to={`/prodotti/${l.id}`} className="shrink-0">
                    <img src={cld(l.image, { w: 96, h: 96, crop: 'pad' })} alt={l.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain border rounded" />
                  </Link>
                  <div className="flex-grow min-w-0">
                    <Link to={`/prodotti/${l.id}`} className="font-semibold text-gray-800 hover:text-primary-600 line-clamp-2">
                      {l.name}
                    </Link>
                    <p className="text-sm text-gray-500">{euro(l.price)} cad.</p>
                    {l.pickupOnly && (
                      <p className="text-xs text-secondary-700 flex items-center gap-1 mt-1">
                        <Store className="h-3.5 w-3.5" /> Solo ritiro in negozio
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button className="p-2 disabled:opacity-30" onClick={() => setQty(l.id, l.qty - 1)} disabled={l.qty <= 1} aria-label="Diminuisci">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{l.qty}</span>
                        <button className="p-2 disabled:opacity-30" onClick={() => setQty(l.id, l.qty + 1)} disabled={l.qty >= l.maxQty} aria-label="Aumenta">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{euro(l.price * l.qty)}</span>
                        <button onClick={() => remove(l.id)} className="text-gray-400 hover:text-red-600" aria-label="Rimuovi">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="border rounded-lg p-6 h-fit bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Riepilogo</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotale</span>
                <span className="font-semibold">{euro(subtotal)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Spedizione calcolata al passo successivo. Prezzi IVA inclusa.</p>
              <button
                onClick={() => navigate('/checkout')}
                disabled={checking}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-60"
              >
                {checking ? 'Verifico disponibilità…' : 'Procedi all\'ordine'}
              </button>
              <Link to="/prodotti" className="block text-center text-sm text-primary-700 mt-4 hover:underline">
                ← Continua lo shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;

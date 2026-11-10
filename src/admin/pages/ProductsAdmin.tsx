import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, EyeOff, Star } from 'lucide-react';
import { getCatalog, listProducts } from '../api';
import { ADMIN_BASE } from '../base';
import { Btn, Card, ErrorBox, PageTitle, Spinner, errMsg, inputCls } from '../components/ui';
import { cld } from '../../lib/cloudinary';
import { euro } from '../../lib/format';
import type { Category, Product } from '../../lib/types';

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');

  useEffect(() => {
    Promise.all([listProducts(), getCatalog()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c.categories);
      })
      .catch((e) => setError(errMsg(e)));
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (products ?? []).filter(
      (p) => (!cat || p.categoryId === cat) && (!s || `${p.name} ${p.brand ?? ''} ${p.sku ?? ''}`.toLowerCase().includes(s))
    );
  }, [products, q, cat]);

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  return (
    <>
      <PageTitle title="Prodotti">
        <Link to={`${ADMIN_BASE}/prodotti/nuovo`}>
          <Btn>
            <Plus className="h-4 w-4" /> Nuovo prodotto
          </Btn>
        </Link>
      </PageTitle>
      <ErrorBox error={error} />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input className={`${inputCls} pl-9`} placeholder="Cerca per nome, marca o codice" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className={`${inputCls} sm:w-64`} value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {!products ? (
        !error && <Spinner />
      ) : products.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-gray-600 mb-4">Non ci sono ancora prodotti.</p>
          <Link to={`${ADMIN_BASE}/prodotti/nuovo`}>
            <Btn>
              <Plus className="h-4 w-4" /> Aggiungi il primo prodotto
            </Btn>
          </Link>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <p className="px-4 py-2 text-xs text-gray-500 border-b">{filtered.length} prodotti</p>
          <ul className="divide-y">
            {filtered.map((p) => (
              <li key={p.id}>
                <Link to={`${ADMIN_BASE}/prodotti/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <img src={cld(p.images?.[0], { w: 64, h: 64, crop: 'pad' })} alt="" className="w-12 h-12 object-contain border rounded bg-white shrink-0" />
                  <div className="flex-grow min-w-0">
                    <p className="font-medium truncate flex items-center gap-1.5">
                      {p.name}
                      {!p.visible && <EyeOff className="h-4 w-4 text-gray-400 shrink-0" aria-label="Nascosto" />}
                      {p.featured && <Star className="h-4 w-4 text-amber-500 shrink-0" aria-label="In evidenza" />}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {catName(p.categoryId)}
                      {p.sku ? ` · ${p.sku}` : ''}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-sm">{euro(p.price)}</p>
                    <p className={`text-xs ${(p.stock?.online ?? 0) <= 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      online {p.stock?.online ?? 0} · neg. {p.stock?.negozio ?? 0}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};

export default ProductsAdmin;

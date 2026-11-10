import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Section from '../components/ui/Section';
import BrandsBanner from '../components/products/BrandsBanner';
import { useCatalog } from '../hooks/useCatalog';

const PAGE = 24;
type Sort = 'recenti' | 'prezzo-asc' | 'prezzo-desc' | 'nome';

const ProductsPage = () => {
  const location = useLocation();
  const { catalog, loading, error } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<Sort>('recenti');
  const [visible, setVisible] = useState(PAGE);

  // supporta sia /prodotti#categoria (link della home/footer) sia /prodotti?categoria=
  useEffect(() => {
    const fromHash = location.hash.replace('#', '');
    const fromQuery = new URLSearchParams(location.search).get('categoria');
    setSelectedCategory(fromQuery || fromHash || null);
  }, [location.hash, location.search]);

  useEffect(() => setVisible(PAGE), [selectedCategory, search, sort]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = catalog.items.filter(
      (p) =>
        (!selectedCategory || p.categoryId === selectedCategory) &&
        (!q || `${p.name} ${p.brand ?? ''} ${p.shortDescription}`.toLowerCase().includes(q))
    );
    list = [...list];
    if (sort === 'prezzo-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'prezzo-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'nome') list.sort((a, b) => a.name.localeCompare(b.name, 'it'));
    // disponibili prima degli esauriti
    return list.sort((a, b) => Number(b.stockOnline > 0) - Number(a.stockOnline > 0));
  }, [catalog.items, selectedCategory, search, sort]);

  const pill = (active: boolean) =>
    `px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
      active ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <>
      <Helmet>
        <title>Negozio online | L'angolo del verde</title>
        <meta
          name="description"
          content="Acquista online attrezzature per giardinaggio: motocoltivatori, tosaerba, attrezzatura da giardino, ricambi e utensileria. Spedizione o ritiro in negozio."
        />
      </Helmet>

      <div className="pt-20 md:pt-24">
        <BrandsBanner />

        <Section>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 text-center">I Nostri Prodotti</h1>

            <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0">
                <button onClick={() => setSelectedCategory(null)} className={pill(!selectedCategory)}>
                  Tutti
                </button>
                {catalog.categories.map((c) => (
                  <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={pill(selectedCategory === c.id)}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <label className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca un prodotto o una marca…"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="py-2.5 px-3 border border-gray-300 rounded-lg bg-white"
                aria-label="Ordina"
              >
                <option value="recenti">Più recenti</option>
                <option value="prezzo-asc">Prezzo crescente</option>
                <option value="prezzo-desc">Prezzo decrescente</option>
                <option value="nome">Nome A–Z</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                {catalog.items.length === 0
                  ? 'Il negozio online sarà presto disponibile. Nel frattempo vieni a trovarci in negozio!'
                  : 'Nessun prodotto trovato.'}
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">{filtered.length} prodotti</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filtered.slice(0, visible).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                {visible < filtered.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisible((v) => v + PAGE)}
                      className="px-6 py-3 border-2 border-primary-600 text-primary-700 font-semibold rounded-lg hover:bg-primary-50"
                    >
                      Mostra altri prodotti ({filtered.length - visible})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </Section>
      </div>
    </>
  );
};

export default ProductsPage;

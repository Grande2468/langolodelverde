import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Minus, Plus, ShoppingCart, Store, Truck, MessageCircle, Check } from 'lucide-react';
import Section from '../components/ui/Section';
import ProductCard from '../components/products/ProductCard';
import { fetchProduct, maxOrderable, toCatalogItem } from '../lib/catalog';
import { cld } from '../lib/cloudinary';
import { euro } from '../lib/format';
import type { Product } from '../lib/types';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../hooks/useCatalog';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);
  const { add, lines } = useCart();
  const { catalog } = useCatalog();

  useEffect(() => {
    setProduct(undefined);
    setSelected(0);
    setQty(1);
    if (productId) fetchProduct(productId).then(setProduct);
  }, [productId]);

  if (product === undefined) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-gray-100 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/3" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || !product.visible) {
    return (
      <Section className="pt-32 text-center">
        <Helmet>
          <title>Prodotto non trovato | L'angolo del verde</title>
        </Helmet>
        <h1 className="text-3xl font-bold mb-4">Prodotto non trovato</h1>
        <p className="mb-8">Il prodotto che stai cercando non esiste o è stato rimosso.</p>
        <Link to="/prodotti" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
          Torna ai prodotti
        </Link>
      </Section>
    );
  }

  const item = toCatalogItem(product);
  const stock = product.stock?.online ?? 0;
  const inCart = lines.find((l) => l.id === product.id)?.qty ?? 0;
  const orderable = maxOrderable(item);
  const onOrder = orderable > 0 && stock <= 0;
  const maxAdd = Math.max(0, orderable - inCart);
  const images = product.images?.length ? product.images : [null];
  const current = images[selected] ?? null;
  const discounted = !!product.comparePrice && product.comparePrice > product.price;
  const related = catalog.items.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const category = catalog.categories.find((c) => c.id === product.categoryId);
  const whatsapp = `https://wa.me/393206658669?text=${encodeURIComponent(
    `Ciao, vorrei informazioni sul prodotto: ${product.name}`
  )}`;

  const handleAdd = () => {
    add(item, Math.min(qty, maxAdd));
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | L'angolo del verde`}</title>
        <meta name="description" content={product.shortDescription} />
        {product.images?.[0] && <meta property="og:image" content={cld(product.images[0], { w: 1200 })} />}
      </Helmet>

      <Section className="pt-28 md:pt-32">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/prodotti" className="hover:text-primary-600">
            Prodotti
          </Link>
          {category && (
            <>
              {' / '}
              <Link to={`/prodotti#${category.id}`} className="hover:text-primary-600">
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <button
              className="w-full mb-4 border rounded-lg overflow-hidden shadow-sm bg-white aspect-square cursor-zoom-in"
              onClick={() => current && setZoom(true)}
            >
              <img
                src={cld(current, { w: 800, h: 800, crop: 'pad' })}
                srcSet={current ? `${cld(current, { w: 800, h: 800, crop: 'pad' })} 1x, ${cld(current, { w: 1400, h: 1400, crop: 'pad' })} 2x` : undefined}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </button>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`aspect-square border rounded-md overflow-hidden bg-white ${
                      i === selected ? 'ring-2 ring-primary-600 border-primary-600' : 'border-gray-300 hover:opacity-75'
                    }`}
                  >
                    <img src={cld(img, { w: 150, h: 150, crop: 'pad' })} alt="" loading="lazy" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {product.brand && <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">{product.brand}</p>}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-semibold text-primary-700">{euro(product.price)}</span>
              {discounted && <span className="text-lg text-gray-400 line-through">{euro(product.comparePrice)}</span>}
            </div>
            <p className="text-xs text-gray-500 mb-6">IVA inclusa{product.sku ? ` · Cod. ${product.sku}` : ''}</p>

            {product.shortDescription && <p className="text-lg text-gray-700 mb-6">{product.shortDescription}</p>}

            <div className="rounded-lg border border-gray-200 p-4 mb-6 space-y-2 text-sm">
              {onOrder ? (
                <p className="text-secondary-700 font-medium">
                  ● Disponibile su ordinazione — consegna in {product.leadTime || 'alcuni giorni'}
                </p>
              ) : stock > 0 ? (
                <p className="text-primary-700 font-medium">
                  ● Disponibile online{stock <= 3 ? ` — solo ${stock} pezz${stock === 1 ? 'o' : 'i'}` : ''}
                </p>
              ) : (
                <p className="text-gray-600 font-medium">● Esaurito online — chiedi la disponibilità in negozio</p>
              )}
              {product.pickupOnly ? (
                <p className="flex items-center gap-2 text-gray-700">
                  <Store className="h-4 w-4" /> Solo ritiro in negozio (non spedibile)
                </p>
              ) : (
                <p className="flex items-center gap-2 text-gray-700">
                  <Truck className="h-4 w-4" /> Spedizione a domicilio o ritiro in negozio
                </p>
              )}
            </div>

            {orderable > 0 ? (
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button className="p-3 disabled:opacity-30" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Diminuisci">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button className="p-3 disabled:opacity-30" onClick={() => setQty((q) => Math.min(maxAdd, q + 1))} disabled={qty >= maxAdd} aria-label="Aumenta">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={maxAdd <= 0}
                  className="flex-grow inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-300 text-lg"
                >
                  {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                  {added ? 'Aggiunto!' : maxAdd <= 0 ? 'Tutti i pezzi sono nel carrello' : 'Aggiungi al carrello'}
                </button>
              </div>
            ) : null}
            {inCart > 0 && (
              <Link to="/carrello" className="mb-4 text-center text-primary-700 font-medium hover:underline">
                Vai al carrello ({inCart} di questo prodotto) →
              </Link>
            )}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-green-700 hover:text-green-800 text-sm">
              <MessageCircle className="h-4 w-4" /> Hai domande? Scrivici su WhatsApp
            </a>

            {product.description && (
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-xl font-semibold mb-3">Descrizione</h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</div>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Potrebbe interessarti anche</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Section>

      {zoom && current && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setZoom(false)}>
          <img src={cld(current, { w: 1600 })} alt={product.name} className="max-w-full max-h-[90vh] object-contain bg-white rounded-lg" />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;

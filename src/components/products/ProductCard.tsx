import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import type { CatalogItem } from '../../lib/types';
import { cld, cldSrcSet } from '../../lib/cloudinary';
import { euro } from '../../lib/format';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }: { product: CatalogItem }) => {
  const { add, lines } = useCart();
  const inCart = lines.find((l) => l.id === product.id)?.qty ?? 0;
  const soldOut = product.stockOnline <= 0;
  const canAdd = !soldOut && inCart < product.stockOnline;
  const discounted = !!product.comparePrice && product.comparePrice > product.price;

  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
      <Link to={`/prodotti/${product.id}`} className="relative aspect-square bg-white overflow-hidden block">
        <img
          src={cld(product.image, { w: 400, h: 400, crop: 'pad' })}
          srcSet={cldSrcSet(product.image, 400, 400, 'pad')}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {soldOut && (
          <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded">
            Esaurito online
          </span>
        )}
        {!soldOut && discounted && (
          <span className="absolute top-3 left-3 bg-accent-600 text-white text-xs font-semibold px-2 py-1 rounded">
            -{Math.round((1 - product.price / (product.comparePrice as number)) * 100)}%
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {product.brand && <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.brand}</p>}
        <Link to={`/prodotti/${product.id}`}>
          <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.shortDescription}</p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-bold text-primary-700">{euro(product.price)}</span>
          {discounted && <span className="text-sm text-gray-400 line-through">{euro(product.comparePrice)}</span>}
        </div>
        {product.pickupOnly && (
          <p className="text-xs text-secondary-700 flex items-center gap-1 mb-2">
            <Store className="h-3.5 w-3.5" /> Solo ritiro in negozio
          </p>
        )}
        <button
          onClick={() => add(product)}
          disabled={!canAdd}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          {soldOut ? 'Esaurito' : !canAdd ? 'Massimo nel carrello' : inCart ? `Aggiungi (${inCart} nel carrello)` : 'Aggiungi al carrello'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

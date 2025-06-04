import React from 'react';
import { Product } from '../../data/productsData'; // Importo l'interfaccia Product
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react'; // Importa AdvancedImage
import cloudinaryInstance from '../../services/cloudinary'; // Importa l'istanza Cloudinary
import { scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Prende la prima immagine per l'anteprima della card
  const firstImageId = product.images && product.images.length > 0 ? product.images[0] : 'samples/placeholder'; // Usa un placeholder di Cloudinary se non ci sono immagini

  const cldImage = cloudinaryInstance.image(firstImageId);
  cldImage
    .resize(scale().width(400))
    .delivery(format('auto')) // Formato immagine automatico (es. WebP)
    .delivery(quality('auto')); // Qualità automatica

  return (
    <Link to={`/prodotti/${product.id}`} className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <AdvancedImage 
          cldImg={cldImage} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-primary-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 truncate flex-grow">{product.shortDescription}</p>
        <p className="text-xl font-bold text-primary-700 mb-4">{product.price}</p>
        <button className="mt-auto w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
          Vedi Dettagli
        </button>
      </div>
    </Link>
  );
};

export default ProductCard; 
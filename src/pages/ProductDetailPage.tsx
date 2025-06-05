import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AdvancedImage } from '@cloudinary/react';
import cloudinaryInstance from '../services/cloudinary';
import { allProducts, Product as ProductType } from '../data/productsData'; // Rinomino Product per evitare conflitto con React.Product
import Section from '../components/ui/Section';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { MessageCircle } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct && foundProduct.images.length > 0) {
      setSelectedImage(foundProduct.images[0]);
    }
    setLoading(false);
  }, [productId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Caricamento...</div>;
  }

  if (!product) {
    return (
      <Section className="py-12 text-center">
        <Helmet>
            <title>Prodotto non trovato | L'angolo del verde</title>
        </Helmet>
        <h1 className="text-3xl font-bold mb-4">Prodotto non Trovato</h1>
        <p className="mb-8">Il prodotto che stai cercando non esiste o è stato rimosso.</p>
        <Link to="/prodotti" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
          Torna ai Prodotti
        </Link>
      </Section>
    );
  }

  const mainImageCld = cloudinaryInstance.image(selectedImage || 'default-product');
  mainImageCld
    .resize(scale().width(800))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null; // Previene loop infiniti
    img.src = 'https://res.cloudinary.com/dut9zxpsq/image/upload/v1/default-product';
  };

  const numeroWhatsApp = '320 665 8669';
  const messaggioWhatsApp = `Ciao, sarei interessato al prodotto: ${product.name} (ID: ${product.id}). Potrei avere maggiori informazioni?`;
  const linkWhatsApp = `https://wa.me/393206658669?text=${encodeURIComponent(messaggioWhatsApp)}`;

  return (
    <Section className="py-8 md:py-12">
      <Helmet>
        <title>{`${product.name} | L'angolo del verde`}</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div 
              className="mb-4 border rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative aspect-square">
                <AdvancedImage 
                  cldImg={mainImageCld} 
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((imgId, index) => {
                  const thumbCld = cloudinaryInstance.image(imgId);
                  thumbCld
                    .resize(scale().width(150))
                    .delivery(format('auto'))
                    .delivery(quality('auto'));
                  return (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(imgId)} 
                      className={`relative aspect-square border rounded-md overflow-hidden hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${selectedImage === imgId ? 'ring-2 ring-primary-600 border-primary-600' : 'border-gray-300'}`}
                    >
                      <AdvancedImage 
                        cldImg={thumbCld} 
                        className="w-full h-full object-contain"
                        onError={handleImageError}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary-700 mb-6">{product.price}</p>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: product.fullDescription.replace(/\n/g, '<br />') }} />

            <a 
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg text-lg"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Contattaci per l'acquisto
            </a>
            <Link to="/prodotti" className="mt-4 block text-center text-primary-600 hover:text-primary-700 transition-colors">
              &larr; Torna a tutti i prodotti
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for full-size image */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-2 rounded-lg">
            <AdvancedImage 
              cldImg={mainImageCld}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default ProductDetailPage; 
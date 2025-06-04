import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import Button from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Decespugliatore Pro X3",
    category: "Decespugliatori",
    description: "Decespugliatore professionale per impieghi gravosi con motore potente e design ergonomico per la massima efficienza nella pulizia della vegetazione fitta.",
    image: "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg",
  },
  {
    id: 2,
    name: "Motozappa GardenMaster",
    category: "Motozappe",
    description: "Motozappa ad alte prestazioni con larghezza e profondità di lavoro regolabili per una perfetta preparazione del terreno in vari terreni.",
    image: "https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg",
  },
  {
    id: 3,
    name: "Tosaerba LawnKing 500",
    category: "Tosaerba",
    description: "Tosaerba semovente premium con sistema di mulching avanzato e resistente piatto in acciaio per risultati professionali.",
    image: "https://images.pexels.com/photos/589/garden-gardening-grass-mow.jpg",
  },
];

const FeaturedProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextProduct = () => {
    setActiveIndex((current) => (current === FEATURED_PRODUCTS.length - 1 ? 0 : current + 1));
  };
  
  const prevProduct = () => {
    setActiveIndex((current) => (current === 0 ? FEATURED_PRODUCTS.length - 1 : current - 1));
  };

  return (
    <Section background="light">
      <SectionHeading 
        title="Attrezzature in Evidenza" 
        subtitle="Esplora la nostra selezione di attrezzi da giardinaggio e paesaggistica premium progettati per i professionisti."
      />
      
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          {FEATURED_PRODUCTS.map((product, index) => (
            index === activeIndex && (
              <motion.div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-64 md:h-auto relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-primary-600 uppercase">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <Button to="/prodotti">Vedi Dettagli</Button>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="absolute z-10 bottom-4 right-4 flex gap-2">
          <button
            onClick={prevProduct}
            className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-primary-600 hover:text-white transition-colors shadow-md"
            aria-label="Prodotto precedente"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextProduct}
            className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-primary-600 hover:text-white transition-colors shadow-md"
            aria-label="Prossimo prodotto"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Indicator Dots */}
        <div className="absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {FEATURED_PRODUCTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'bg-primary-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Vai alla diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedProducts;
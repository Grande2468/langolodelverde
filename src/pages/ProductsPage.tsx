import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { productCategories, allProducts } from '../data/productsData';
import ProductCard from '../components/products/ProductCard';
import Section from '../components/ui/Section';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? allProducts.filter(product => product.categoryId === selectedCategory)
    : allProducts;

  return (
    <>
      <Helmet>
        <title>I Nostri Prodotti | L'angolo del verde</title>
        <meta name="description" content="Scopri la nostra gamma completa di attrezzature per giardinaggio e paesaggistica. Motocoltivatori, tosaerba, decespugliatori e molto altro per la cura del tuo verde." />
      </Helmet>
      
      <div className="pt-24">
        <Section>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              I Nostri Prodotti
          </h1>

            {/* Filtri Categorie */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                    ${!selectedCategory 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  Tutti
                </button>
                {productCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                      ${selectedCategory === category.id 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
        </div>
      </div>
      
            {/* Griglia Prodotti */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {/* Messaggio se non ci sono prodotti */}
            {filteredProducts.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                Nessun prodotto trovato in questa categoria.
              </div>
            )}
          </div>
        </Section>
      </div>
    </>
  );
};

export default ProductsPage;
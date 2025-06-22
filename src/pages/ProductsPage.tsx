import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { productCategories, allProducts } from '../data/productsData';
import ProductCard from '../components/products/ProductCard';
import Section from '../components/ui/Section';
import { motion } from 'framer-motion';
import BrandsBanner from '../components/products/BrandsBanner';

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
      
      <div className="pt-20 md:pt-24">
        {/* Banner dei marchi */}
        <BrandsBanner />

        {/* Messaggio showroom */}
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-3 md:mb-4">
              Scopri la Nostra Vasta Gamma di Prodotti
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Quello che vedi online è solo una piccola selezione dei prodotti disponibili nel nostro showroom.
              Vieni a trovarci per scoprire l'intera gamma, ricevere consulenza personalizzata
              e toccare con mano la qualità dei nostri articoli. Il nostro staff esperto è pronto
              ad aiutarti nella scelta migliore per le tue esigenze.
            </p>
          </div>
        </div>

        <Section>
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              I Nostri Prodotti
            </h1>

            {/* Filtri Categorie */}
            <div className="mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 min-w-max md:min-w-0">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors
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
                    className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
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
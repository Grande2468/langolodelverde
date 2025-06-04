import React from 'react';
import ProductCategoriesDisplay from '../components/products/ProductCategories';
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Prodotti | L'angolo del verde</title>
        <meta name="description" content="Esplora la nostra gamma di attrezzature da giardino di alta qualità tra cui decespugliatori, motozappe, tosaerba e altro ancora presso L'angolo del verde." />
      </Helmet>
      
      <div className="pt-16 md:pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Le Nostre Attrezzature
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sfoglia le nostre categorie e scopri la soluzione perfetta per la cura del tuo verde.
          </p>
        </div>
      </div>
      
      <ProductCategoriesDisplay />
      <CtaSection />
    </>
  );
};

export default ProductsPage;
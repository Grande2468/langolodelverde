import React from 'react';
import ProductCategories from '../components/products/ProductCategories';
import ProductInfo from '../components/products/ProductInfo';
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Prodotti | GreenPower Attrezzature</title>
        <meta name="description" content="Esplora la nostra gamma di attrezzature da giardino di alta qualità tra cui decespugliatori, motozappe, tosaerba e altro ancora." />
      </Helmet>
      
      <div className="pt-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              La Nostra Gamma di Prodotti
            </h1>
            <p className="text-xl text-primary-100">
              Scopri la nostra selezione di attrezzature da giardinaggio e paesaggistica premium progettate per professionisti e appassionati.
            </p>
          </div>
        </div>
      </div>
      
      <ProductCategories />
      <ProductInfo />
      <CtaSection />
    </>
  );
};

export default ProductsPage;
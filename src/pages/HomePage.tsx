import React from 'react';
import Hero from '../components/home/Hero';
// import FeaturedProducts from '../components/home/FeaturedProducts'; // Rimosso
import Categories from '../components/home/Categories'; // Questo verrà modificato o sostituito dopo
// import PromoSection from '../components/home/PromoSection';
// import Testimonials from '../components/home/Testimonials'; // Rimosso
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';
// import CloudinaryTestComponent from '../components/CloudinaryTest'; // Rimuovo importazione

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>L'angolo del verde | Attrezzi da Giardino e Paesaggistica</title>
        <meta name="description" content="Attrezzature da giardino e paesaggistica di qualità tra cui decespugliatori, motocoltivatori e attrezzi da giardinaggio professionali per L'angolo del verde." />
      </Helmet>
      
      <Hero />
      {/* <CloudinaryTestComponent /> Rimuovo visualizzazione */}
      {/* <FeaturedProducts /> Rimosso */}
      <Categories /> {/* Questo componente verrà probabilmente aggiornato o sostituito in seguito per riflettere le nuove categorie di prodotto e la nuova struttura */}
      {/* <PromoSection /> */}
      {/* <Testimonials /> Rimosso */}
      <CtaSection />
    </>
  );
};

export default HomePage;
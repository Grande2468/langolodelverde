import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import PromoSection from '../components/home/PromoSection';
// import Testimonials from '../components/home/Testimonials'; // Rimosso
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>GreenPower Attrezzature | Attrezzi da Giardino e Paesaggistica</title>
        <meta name="description" content="Attrezzature da giardino e paesaggistica di qualità tra cui decespugliatori, motocoltivatori e attrezzi da giardinaggio professionali." />
      </Helmet>
      
      <Hero />
      <FeaturedProducts />
      <Categories />
      <PromoSection />
      {/* <Testimonials /> Rimosso */}
      <CtaSection />
    </>
  );
};

export default HomePage;
import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import OurValues from '../components/about/OurValues';
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Chi Siamo | L'angolo del verde</title>
        <meta name="description" content="Scopri la storia di L'angolo del verde, i nostri valori e il team dietro i nostri attrezzi da giardinaggio e paesaggistica premium." />
      </Helmet>
      
      <AboutHero />
      <OurStory />
      <OurValues />
      <CtaSection />
    </>
  );
};

export default AboutPage;
import React from 'react';
import Section from '../components/ui/Section';
import ContactInfo from '../components/contact/ContactInfo';
import MapSection from '../components/contact/MapSection';
import { Helmet } from 'react-helmet';
import Button from '../components/ui/Button';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contattaci | GreenPower Attrezzature</title>
        <meta name="description" content="Mettiti in contatto con GreenPower Attrezzature. Visita il nostro showroom, chiamaci o invia un messaggio per informazioni sui nostri attrezzi da giardinaggio e paesaggistica." />
      </Helmet>
      
      <div className="pt-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Contattaci
            </h1>
            <p className="text-xl text-primary-100 mb-4">
              Siamo qui per aiutarti con qualsiasi domanda sulle nostre attrezzature.
            </p>
            <p className="text-xl text-primary-100 mb-8">
              Vuoi più informazioni sui nostri prodotti o vuoi acquistarne uno? Contattaci direttamente!
            </p>
            <Button 
              href="#"
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white mx-auto"
            >
              Contattaci su WhatsApp
            </Button>
          </div>
        </div>
      </div>
      
      <Section>
        <div className="max-w-2xl mx-auto">
          <ContactInfo />
        </div>
      </Section>
      
      <MapSection />
    </>
  );
};

export default ContactPage;
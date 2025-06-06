import React from 'react';
import Section from '../components/ui/Section';
import ContactInfo from '../components/contact/ContactInfo';
import MapSection from '../components/contact/MapSection';
import { Helmet } from 'react-helmet';
import { Phone, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contattaci | L'angolo del verde</title>
        <meta name="description" content="Mettiti in contatto con L'angolo del verde. Visita il nostro showroom, chiamaci o invia un messaggio per informazioni sui nostri attrezzi da giardinaggio e paesaggistica." />
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a 
                href="tel:3206658669"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 w-full sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                320 665 8669
              </a>
              <a 
              href="https://wa.me/393206658669"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 w-full sm:w-auto"
            >
                <MessageCircle className="h-5 w-5" />
              Contattaci su WhatsApp
              </a>
            </div>
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
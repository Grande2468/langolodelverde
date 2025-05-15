import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';
import FeaturedImage from '../ui/FeaturedImage';

const OurStory = () => {
  return (
    <Section background="light">
      <SectionHeading 
        title="La Nostra Storia" 
        subtitle="Da piccola impresa familiare a fornitore di fiducia di attrezzature"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FeaturedImage
          src="https://images.pexels.com/photos/2566040/pexels-photo-2566040.jpeg"
          alt="Attrezzi da giardinaggio vintage"
          priority="left"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Come Abbiamo Iniziato</h3>
              <p className="text-gray-600">
                GreenPower è nata nel 1985 come piccolo negozio familiare che vendeva e riparava attrezzi da giardino. Fondata dalla famiglia Ricci, la nostra passione per le attrezzature di qualità e il servizio eccezionale ci ha rapidamente fatto guadagnare un seguito fedele tra giardinieri e paesaggisti locali.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Crescendo con la Comunità</h3>
              <p className="text-gray-600">
                Durante gli anni \'90, abbiamo ampliato il nostro inventario per includere attrezzature professionali, servendo le crescenti esigenze dei paesaggisti commerciali mantenendo il nostro impegno verso i giardinieri hobbisti. Abbiamo aperto il nostro attuale negozio principale nel 2005.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">GreenPower Oggi</h3>
              <p className="text-gray-600">
                Oggi, GreenPower è riconosciuta come fornitore principale di attrezzature per giardinaggio e paesaggistica nella regione. Selezioniamo attentamente i prodotti in base a prestazioni, durabilità e valore, garantendo ai nostri clienti solo i migliori strumenti per le loro esigenze.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default OurStory;
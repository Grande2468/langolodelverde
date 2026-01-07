import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';
import { AdvancedImage } from '@cloudinary/react';
import cloudinaryInstance from '../../services/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const OurStory = () => {
  const storyImage = cloudinaryInstance.image('IMG_3125_jid5sj');
  storyImage
    .resize(fill().width(800).height(600).gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  return (
    <Section background="light">
      <SectionHeading 
        title="La Nostra Storia" 
        subtitle="Da piccola impresa familiare a fornitore di fiducia di attrezzature"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <AdvancedImage
          cldImg={storyImage}
          className="w-full h-auto rounded-xl"
          alt="L'angolo del verde - La nostra storia"
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
                L'angolo del verde è nato come piccolo negozio familiare che vendeva e riparava attrezzi da giardino. Fondata dalla famiglia Grande, la nostra passione per le attrezzature di qualità e il servizio eccezionale ci ha rapidamente fatto guadagnare un seguito fedele tra giardinieri e paesaggisti locali.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Crescendo con la Comunità</h3>
              <p className="text-gray-600">
                Durante gli anni, abbiamo ampliato il nostro inventario per includere attrezzature professionali, servendo le crescenti esigenze dei paesaggisti commerciali mantenendo il nostro impegno verso i giardinieri hobbisti. Abbiamo aperto il nostro attuale negozio principale di recente.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">L'angolo del verde Oggi</h3>
              <p className="text-gray-600">
                Oggi, L'angolo del verde è riconosciuto come fornitore principale di attrezzature per giardinaggio e paesaggistica nella regione. Selezioniamo attentamente i prodotti in base a prestazioni, durabilità e valore, garantendo ai nostri clienti solo i migliori strumenti per le loro esigenze.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default OurStory;
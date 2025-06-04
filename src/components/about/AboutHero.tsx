import Section from '../ui/Section';
import { motion } from 'framer-motion';
import { AdvancedImage } from '@cloudinary/react';
import cloudinaryInstance from '../../services/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const AboutHero = () => {
  const aboutImage = cloudinaryInstance.image('DSC03900_llw1de');
  aboutImage
    .resize(fill().width(800).height(600).gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  return (
    <Section background="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">10+</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Anni di Esperienza</h3>
                <p className="text-gray-600">Al servizio di giardinieri professionisti e appassionati</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">200+</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Prodotti Premium</h3>
                <p className="text-gray-600">Offriamo una vasta gamma di attrezzature e accessori di alta qualità</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">400+</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Clienti Soddisfatti</h3>
                <p className="text-gray-600">Si fidano di noi per le loro esigenze di giardinaggio e paesaggistica</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AdvancedImage 
            cldImg={aboutImage}
            className="w-full h-auto rounded-xl"
            alt="L'angolo del verde - La nostra storia"
          />
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutHero;
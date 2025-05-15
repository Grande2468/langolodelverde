import Section from '../ui/Section';
import { motion } from 'framer-motion';
import AnimatedText from '../ui/AnimatedText';

const AboutHero = () => {
  return (
    <Section className="pt-32 md:pt-40 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <AnimatedText as="h1" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Chi è GreenPower Equipment
          </AnimatedText>
          
          <AnimatedText delay={0.2} className="text-lg text-gray-600 mb-8">
            Da oltre trent\'anni, forniamo attrezzature di alta qualità per il giardinaggio e il paesaggio sia a professionisti che ad appassionati. Il nostro impegno per la qualità, la durabilità e un servizio eccellente ci ha reso un nome affidabile nel settore.
          </AnimatedText>
          
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">35+</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Anni di Esperienza</h3>
                <p className="text-gray-600">Al servizio di giardinieri professionisti e appassionati dal 1985</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">500+</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Prodotti Premium</h3>
                <p className="text-gray-600">Offriamo una vasta gamma di attrezzature e accessori di alta qualità</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 text-2xl font-bold">10k+</span>
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
          <img 
            src="https://images.pexels.com/photos/1480690/pexels-photo-1480690.jpeg" 
            alt="Negozio GreenPower" 
            className="w-full h-auto rounded-xl"
          />
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutHero;
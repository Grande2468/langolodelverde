import Section from '../ui/Section';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { PhoneCall, Phone } from 'lucide-react';

const CtaSection = () => {
  return (
    <Section background="dark" className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Pronto a Migliorare la Tua Esperienza di Giardinaggio?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Visita il nostro showroom per vedere le nostre attrezzature in azione o contatta il nostro team per una consulenza esperta sulla scelta degli strumenti perfetti per le tue esigenze.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              to="/contatti" 
              size="lg"
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              Contattaci
            </Button>
            
            <a 
              href="tel:3206658669" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-300"
            >
              <Phone className="h-5 w-5" />
              320 665 8669
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default CtaSection;
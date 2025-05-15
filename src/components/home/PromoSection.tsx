import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

const PromoSection = () => {
  return (
    <Section className="py-0" withContainer={false}>
      <div className="relative h-[500px] flex items-center">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <img 
            src="https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg" 
            alt="Persona che usa attrezzatura da giardino"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
        </motion.div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1 bg-accent-500 text-white text-sm font-medium rounded-full mb-6">
                Offerta a Tempo Limitato
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Speciale Primavera: 15% di Sconto su Attrezzature Selezionate
              </h2>
              <p className="text-gray-200 mb-8">
                Prepara il tuo giardino per la primavera con le nostre attrezzature premium. Attrezzi di qualità professionale per hobbisti e professionisti, con sconti stagionali esclusivi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/products" size="lg">
                  Acquista Ora
                </Button>
                <Button 
                  to="/contact" 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Scopri di Più
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PromoSection;
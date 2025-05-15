import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AnimatedText from '../ui/AnimatedText';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg" 
          alt="Paesaggio giardino" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <AnimatedText as="h1" className="text-4xl md:text-5xl lg:text-6xl text-white font-display font-bold leading-tight mb-6">
            Attrezzature da Giardino di Qualità per Professionisti
          </AnimatedText>
          
          <AnimatedText 
            delay={0.2} 
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
          >
            Scopri la nostra selezione premium di decespugliatori, motozappe e attrezzi da giardinaggio progettati per durabilità e prestazioni.
          </AnimatedText>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button to="/products" size="lg">
              Esplora Prodotti
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              Contattaci
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div className="w-1.5 h-3 bg-white/80 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
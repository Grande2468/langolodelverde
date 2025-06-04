import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import cloudinaryInstance from '../../services/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const Hero = () => {
  // Configura l'immagine Cloudinary
  const heroImage = cloudinaryInstance.image('DSC03943_sxkqll');
  heroImage
    .resize(fill().width(1920).height(800).gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  // Immagine di fallback se Cloudinary fallisce
  const fallbackImage = "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg";

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AdvancedImage 
          cldImg={heroImage}
          plugins={[lazyload()]}
          className="w-full h-full object-cover"
          alt="L'angolo del verde - Attrezzature da giardino professionali"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const imgElement = e.currentTarget;
            imgElement.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            L'Angolo del Verde - Vendita e Assistenza
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            La tua fonte affidabile per attrezzature da giardinaggio.
            Vendita, riparazione e assistenza qualificata.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="/prodotti" variant="primary" size="lg">
              Esplora i Prodotti
            </Button>
            <Button to="/contatti" variant="outline" size="lg">
              Contattaci
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
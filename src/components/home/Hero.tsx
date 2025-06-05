import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import cloudinaryInstance from '../../services/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const Hero = () => {
  const heroImage = cloudinaryInstance.image('DSC03943_sxkqll');
  
  // Ottimizzazione per desktop
  heroImage
    .resize(fill().width(1920).height(800))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));

  // Ottimizzazione per mobile
  const heroImageMobile = cloudinaryInstance.image('DSC03943_sxkqll');
  heroImageMobile
    .resize(fill().width(640).height(800))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));

  // Immagine di fallback se Cloudinary fallisce
  const fallbackImage = "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg";

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Desktop Image */}
      <div className="absolute inset-0 hidden md:block">
        <AdvancedImage
          cldImg={heroImage}
          plugins={[lazyload()]}
          className="w-full h-full object-cover"
          alt="L'angolo del verde - Attrezzature per giardinaggio"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const imgElement = e.currentTarget;
            imgElement.src = fallbackImage;
          }}
        />
      </div>
      
      {/* Mobile Image */}
      <div className="absolute inset-0 block md:hidden">
        <AdvancedImage
          cldImg={heroImageMobile}
          plugins={[lazyload()]}
          className="w-full h-full object-cover"
          alt="L'angolo del verde - Attrezzature per giardinaggio"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const imgElement = e.currentTarget;
            imgElement.src = fallbackImage;
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          L'angolo del verde
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Attrezzature e ricambi per giardinaggio e paesaggistica
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/prodotti" variant="primary" size="lg">
            Esplora i Prodotti
          </Button>
          <Button to="/contatti" variant="outline" size="lg">
            Contattaci
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/40 z-[1]" />
    </div>
  );
};

export default Hero;
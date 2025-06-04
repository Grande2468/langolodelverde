import cloudinaryInstance from '../services/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Configurazione delle immagini del sito
export const siteImages = {
  // Hero e sezioni principali
  hero: 'samples/landscapes/nature-mountains',
  about: 'samples/landscapes/architecture-signs',
  promo: 'samples/food/spices',
  
  // Categorie
  categories: {
    motocoltivatori: 'samples/landscapes/girl-urban-view',
    attrezzatura: 'samples/food/pot-mussels',
    ricambi: 'samples/industrial/machinery',
    utensileria: 'samples/industrial/tools'
  },
  
  // Logo e favicon
  logo: 'samples/cloudinary-logo',
  favicon: 'samples/cloudinary-icon'
};

// Funzione helper per ottenere l'URL ottimizzato di un'immagine
export const getOptimizedImage = (publicId: string, options: { width?: number; height?: number; quality?: string } = {}) => {
  const cldImage = cloudinaryInstance.image(publicId);
  
  if (options.width || options.height) {
    cldImage
      .resize(fill()
        .width(options.width || 800)
        .height(options.height || 600)
        .gravity(autoGravity()));
  }
  
  cldImage
    .delivery(format('auto'))
    .delivery(quality(options.quality || 'auto'));
  
  return cldImage;
}; 
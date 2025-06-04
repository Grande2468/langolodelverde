import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import cloudinaryInstance from '../../services/cloudinary';
import { useState } from 'react';

interface ProductImageProps {
  publicId: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
}

const ProductImage = ({ publicId, alt, className = '', aspectRatio = 1 }: ProductImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const image = cloudinaryInstance.image(publicId);
  image
    .resize(scale().width(400))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  const fullImage = cloudinaryInstance.image(publicId);
  fullImage
    .delivery(format('auto'))
    .delivery(quality('auto'));

  return (
    <>
      <div 
        className="cursor-pointer relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <AdvancedImage 
          cldImg={image} 
          alt={alt}
          plugins={[lazyload()]}
          className={`w-full h-full object-contain ${className}`}
        />
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-2 rounded-lg">
            <AdvancedImage 
              cldImg={fullImage}
              alt={alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImage; 
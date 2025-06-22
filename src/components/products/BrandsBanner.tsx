import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cloudinaryInstance from '../../services/cloudinary';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const brandLogos = [
  'logo_ehpsnc',
  'logo-kasei-arancio_uoqeqy',
  'logo-echo_2x_gn9bld',
  'Logo-Blue-Bird-new_av01de',
  'logo-payoff-volpi_r64rlf',
  'download_oj4q3n'
];

const BrandsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-4 md:py-8 overflow-hidden">
      <div className="relative">
        {/* Contenitore per l'animazione */}
        <div className="flex animate-scroll-fast">
          {/* Duplico i loghi per creare un effetto infinito */}
          {[...brandLogos, ...brandLogos].map((logoId, index) => {
            const cldImage = cloudinaryInstance.image(logoId);
            cldImage
              .resize(scale().width(150).height(75))
              .delivery(format('auto'))
              .delivery(quality('auto'));

            return (
              <div 
                key={index} 
                className="mx-4 md:mx-8 flex-shrink-0 bg-white rounded-lg p-2"
                style={{ minWidth: '120px', maxWidth: '150px' }}
              >
                <AdvancedImage
                  cldImg={cldImage}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandsBanner; 
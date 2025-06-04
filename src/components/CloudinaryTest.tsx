import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const CloudinaryTestComponent = () => {
  // 1. Configura Cloudinary con il tuo Cloud Name
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dut9zxpsq" // Il tuo Cloud Name
    }
  });

  // 2. Usa l'immagine di esempio fornita da Cloudinary
  const publicIdImmagine = 'cld-sample-5'; 

  // 3. Crea un oggetto immagine Cloudinary e applica trasformazioni
  const miaImmagine = cld
    .image(publicIdImmagine)
    .format('auto') // Formato automatico (es. WebP se supportato)
    .quality('auto') // Qualità automatica
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Ridimensiona e taglia a 500x500 con focus automatico

  return (
    <div style={{ textAlign: 'center', margin: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Immagine da Cloudinary (Test):</h2>
      <AdvancedImage cldImg={miaImmagine} alt="Immagine di esempio da Cloudinary" />
      <p style={{ marginTop: '10px' }}>Se vedi un'immagine qui sopra, la configurazione base di Cloudinary funziona!</p>
    </div>
  );
};

export default CloudinaryTestComponent; 
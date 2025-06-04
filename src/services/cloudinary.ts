import { Cloudinary } from '@cloudinary/url-gen';

const cloudinaryInstance = new Cloudinary({
  cloud: {
    cloudName: 'dut9zxpsq' // Il tuo Cloud Name fornito
  }
});

export default cloudinaryInstance; 
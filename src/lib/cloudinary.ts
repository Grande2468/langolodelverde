// Costruisce gli URL Cloudinary già ridimensionati e compressi (f_auto = WebP/AVIF, q_auto).
// Ogni immagine arriva al browser della misura che serve: piccola nelle liste, grande nella scheda.

export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dut9zxpsq';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f0f9f1"/><path d="M30 65l12-15 9 11 7-8 12 12z" fill="#94ce9c"/><circle cx="62" cy="38" r="6" fill="#94ce9c"/></svg>'
  );

interface Opts {
  w: number;
  h?: number;
  crop?: 'limit' | 'fill' | 'pad';
}

export const cld = (publicId: string | null | undefined, { w, h, crop = 'limit' }: Opts) => {
  if (!publicId) return PLACEHOLDER;
  if (/^https?:\/\//.test(publicId)) return publicId;
  const parts = ['f_auto', 'q_auto', `c_${crop}`, `w_${w}`];
  if (h) parts.push(`h_${h}`);
  if (crop === 'pad') parts.push('b_white');
  if (crop === 'fill') parts.push('g_auto');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${parts.join(',')}/${publicId}`;
};

/** srcset per schermi retina */
export const cldSrcSet = (publicId: string | null | undefined, w: number, h?: number, crop?: Opts['crop']) =>
  publicId ? `${cld(publicId, { w, h, crop })} 1x, ${cld(publicId, { w: w * 2, h: h ? h * 2 : undefined, crop })} 2x` : undefined;

export const PLACEHOLDER_IMAGE = PLACEHOLDER;

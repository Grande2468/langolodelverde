import { idToken } from './auth';

/**
 * Ridimensiona e comprime la foto nel browser PRIMA di caricarla:
 * una foto da 5 MB del telefono diventa ~150-300 KB (WebP, lato lungo 1600 px).
 */
export const compressImage = async (file: File, maxSide = 1600, quality = 0.82): Promise<Blob> => {
  if (!file.type.startsWith('image/')) throw new Error(`"${file.name}" non è un'immagine`);
  let source: ImageBitmap | HTMLImageElement;
  try {
    source = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    source = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Formato di "${file.name}" non supportato (usa JPG, PNG o WebP)`));
      img.src = URL.createObjectURL(file);
    });
  }
  const w0 = source.width;
  const h0 = source.height;
  const scale = Math.min(1, maxSide / Math.max(w0, h0));
  const w = Math.round(w0 * scale);
  const h = Math.round(h0 * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas non disponibile');
  ctx.fillStyle = '#ffffff'; // sfondo bianco per PNG trasparenti
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(source, 0, 0, w, h);
  const toBlob = (type: string) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, quality));
  let blob = await toBlob('image/webp');
  if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg');
  if (!blob) throw new Error('Compressione non riuscita');
  return blob;
};

const signed = async (body: object) => {
  const res = await fetch('/api/cloudinary-sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await idToken()}` },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Errore firma upload (${res.status})`);
  return data as { cloudName: string; apiKey: string; timestamp: number; signature: string; folder?: string; publicId?: string };
};

/** Comprime e carica su Cloudinary. Ritorna il public_id da salvare nel prodotto. */
export const uploadImage = async (file: File): Promise<string> => {
  const blob = await compressImage(file);
  const sig = await signed({ action: 'upload' });
  const form = new FormData();
  form.append('file', blob, file.name.replace(/\.[^.]+$/, '') + (blob.type === 'image/webp' ? '.webp' : '.jpg'));
  form.append('api_key', sig.apiKey);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('folder', sig.folder!);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'Upload non riuscito');
  return data.public_id as string;
};

/** Elimina una foto da Cloudinary (solo foto caricate dal pannello). Errori ignorati. */
export const destroyImage = async (publicId: string) => {
  if (!publicId.startsWith('langolodelverde/prodotti/')) return;
  try {
    const sig = await signed({ action: 'destroy', publicId });
    const form = new FormData();
    form.append('public_id', publicId);
    form.append('api_key', sig.apiKey);
    form.append('timestamp', String(sig.timestamp));
    form.append('signature', sig.signature);
    await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/destroy`, { method: 'POST', body: form });
  } catch (e) {
    console.warn('Eliminazione foto non riuscita', e);
  }
};

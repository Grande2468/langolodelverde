import { DragEvent, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Star, X } from 'lucide-react';
import { uploadImage } from '../imageUpload';
import { cld } from '../../lib/cloudinary';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
}

/** Foto del prodotto: trascina o scegli, compressione automatica, riordino, la prima è la copertina. */
const ImageUploader = ({ images, onChange, max = 10 }: Props) => {
  const [uploading, setUploading] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const current = useRef(images);
  current.current = images;

  const handleFiles = async (files: FileList | File[]) => {
    setError(null);
    const list = Array.from(files).slice(0, Math.max(0, max - images.length - uploading.length));
    if (list.length === 0) return setError(`Massimo ${max} foto per prodotto.`);
    setUploading((u) => [...u, ...list.map((f) => f.name)]);
    // in sequenza: niente picchi di memoria sul telefono
    for (const file of list) {
      try {
        const id = await uploadImage(file);
        onChange([...current.current, id]);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload non riuscito');
      } finally {
        setUploading((u) => {
          const i = u.indexOf(file.name);
          return i < 0 ? u : [...u.slice(0, i), ...u.slice(i + 1)];
        });
      }
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const next = [...images];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((id, i) => (
          <div key={id} className="relative group aspect-square border rounded-lg overflow-hidden bg-white">
            <img src={cld(id, { w: 200, h: 200, crop: 'pad' })} alt="" className="w-full h-full object-contain" />
            {i === 0 && (
              <span className="absolute top-1 left-1 bg-primary-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Star className="h-3 w-3" /> Copertina
              </span>
            )}
            <button
              type="button"
              onClick={() => onChange(images.filter((x) => x !== id))}
              className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-red-600 shadow"
              aria-label="Rimuovi foto"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-1 inset-x-1 flex justify-between">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="bg-white/90 rounded-full p-1 shadow disabled:opacity-0" aria-label="Sposta a sinistra">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} className="bg-white/90 rounded-full p-1 shadow disabled:opacity-0" aria-label="Sposta a destra">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {uploading.map((name, i) => (
          <div key={`${name}-${i}`} className="aspect-square border rounded-lg flex flex-col items-center justify-center bg-gray-50 text-xs text-gray-500 p-2 text-center">
            <div className="h-6 w-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-2" />
            <span className="line-clamp-2">Comprimo e carico…</span>
          </div>
        ))}
        {images.length + uploading.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-sm text-gray-500 hover:border-primary-500 hover:text-primary-600 ${
              drag ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
          >
            <ImagePlus className="h-7 w-7 mb-1" />
            Aggiungi foto
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <p className="text-xs text-gray-500 mt-2">
        Puoi scattare o scegliere più foto insieme: vengono ridotte automaticamente (max 1600 px, ~200 KB). La prima è la copertina.
      </p>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;

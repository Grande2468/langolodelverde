const euroFmt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

/** 145000 → "1.450,00 €" */
export const euro = (cents: number | null | undefined) => euroFmt.format((cents ?? 0) / 100);

/** "1.450,50" / "1450.5" / "1450" → 145050. Ritorna null se non valido. */
export const parseEuro = (value: string): number | null => {
  const clean = value.trim().replace(/[€\s]/g, '');
  if (!clean) return null;
  // se ci sono sia punti che virgole, il punto è il separatore delle migliaia
  const normalized = clean.includes(',') ? clean.replace(/\./g, '').replace(',', '.') : clean;
  const n = Number(normalized);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
};

/** 145050 → "1450,50" (per i campi dei form) */
export const centsToInput = (cents: number | null | undefined) =>
  cents == null ? '' : (cents / 100).toFixed(2).replace('.', ',');

export const dateTime = (ms: number | undefined) =>
  ms ? new Date(ms).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }) : '—';

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

export const randomSuffix = () => Math.random().toString(36).slice(2, 6);

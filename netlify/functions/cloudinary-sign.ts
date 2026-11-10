import { createHash } from 'node:crypto';
import { json, requireAdmin } from './_lib/firebaseAdmin';

// Firma le richieste di upload/cancellazione foto su Cloudinary.
// Solo l'admin loggato può ottenere una firma: nessuno può caricare file sul vostro account.
// Il segreto Cloudinary resta sul server.

const FOLDER = 'langolodelverde/prodotti';

const sign = (params: Record<string, string | number>, secret: string) => {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1').update(toSign + secret).digest('hex');
};

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Metodo non consentito' }, 405);
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dut9zxpsq';
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) return json({ error: 'Cloudinary non configurato su Netlify' }, 503);

  const admin = await requireAdmin(req);
  if (!admin) return json({ error: 'Non autorizzato' }, 401);

  const body = (await req.json().catch(() => ({}))) as { action?: string; publicId?: string };
  const timestamp = Math.floor(Date.now() / 1000);

  if (body.action === 'destroy') {
    const publicId = String(body.publicId || '');
    if (!publicId.startsWith(`${FOLDER}/`)) return json({ error: 'Si possono eliminare solo le foto dei prodotti' }, 400);
    const params = { public_id: publicId, timestamp };
    return json({ cloudName, apiKey, timestamp, signature: sign(params, apiSecret), publicId });
  }

  const params = { folder: FOLDER, timestamp };
  return json({ cloudName, apiKey, timestamp, folder: FOLDER, signature: sign(params, apiSecret) });
};

export const config = { path: '/api/cloudinary-sign' };

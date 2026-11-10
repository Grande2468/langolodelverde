import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

let app: App | undefined;

const getApp = () => {
  if (app) return app;
  app = getApps()[0];
  if (app) return app;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) {
    throw new Error('Mancano FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY nelle variabili di Netlify');
  }
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID || 'langolodelverde-9da32',
      clientEmail,
      privateKey,
    }),
  });
  return app;
};

export const adminDb = (): Firestore => getFirestore(getApp());
export const adminAuth = (): Auth => getAuth(getApp());

export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'langolodelverde@admin.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** Verifica il token Firebase dell'admin (header Authorization: Bearer <idToken>). */
export const requireAdmin = async (req: Request) => {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(token);
    return decoded.email && ADMIN_EMAILS.includes(decoded.email.toLowerCase()) ? decoded : null;
  } catch {
    return null;
  }
};

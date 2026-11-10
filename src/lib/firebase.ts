import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// La configurazione web di Firebase è pubblica per natura:
// la sicurezza è nelle regole di Firestore (firestore.rules).
const firebaseConfig = {
  apiKey: 'AIzaSyD4Y0FBVugCuy0d9dEyyAlzhzUoG6DB5Kc',
  authDomain: 'langolodelverde-9da32.firebaseapp.com',
  projectId: 'langolodelverde-9da32',
  storageBucket: 'langolodelverde-9da32.firebasestorage.app',
  messagingSenderId: '1081496928824',
  appId: '1:1081496928824:web:1def0c6649b86a50329ccd',
};

export const app = initializeApp(firebaseConfig);

// Firestore "lite": più leggera, niente listener in tempo reale (non servono).
export const db = getFirestore(app);

export const ADMIN_EMAILS = ['langolodelverde@admin.com'];

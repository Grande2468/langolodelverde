import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { app, ADMIN_EMAILS } from '../lib/firebase';

export const auth = getAuth(app);

export const isAdminUser = (u: User | null) => !!u?.email && ADMIN_EMAILS.includes(u.email.toLowerCase());

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email.trim(), password);
export const logout = () => signOut(auth);

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [ready, setReady] = useState(false);
  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setReady(true);
      }),
    []
  );
  return { user, ready };
};

/** Token da mandare alle funzioni Netlify protette */
export const idToken = async () => {
  const u = auth.currentUser;
  if (!u) throw new Error('Sessione scaduta: effettua di nuovo il login');
  return u.getIdToken();
};

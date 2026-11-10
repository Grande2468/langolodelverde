import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'adv_cookie_notice_v2';

/**
 * Il sito usa solo cookie/archiviazione TECNICI (carrello, preferenze): secondo le Linee guida
 * del Garante Privacy (10 giugno 2021) non serve il consenso, basta l'informativa.
 * Questo avviso informa una volta e non blocca la navigazione.
 */
const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignora */
    }
    setVisible(false);
  };

  return (
    <div role="region" aria-label="Informativa cookie" className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-sm flex-grow">
          Questo sito usa solo cookie e strumenti tecnici necessari al funzionamento (ad esempio per ricordare il
          carrello). Nessun cookie di profilazione o di statistica.{' '}
          <Link to="/cookie-policy" className="underline hover:text-primary-300">
            Cookie policy
          </Link>
        </p>
        <button onClick={close} className="px-5 py-2 bg-primary-600 rounded hover:bg-primary-700 text-sm font-semibold shrink-0">
          Ho capito
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;

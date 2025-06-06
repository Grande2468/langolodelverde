import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';
import CookieConsent, { Cookies } from 'react-cookie-consent';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Sempre true e non modificabile
    functional: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
    Cookies.set('cookiePreferences', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }), { expires: 365 });
    setShowCookieSettings(false);
  };

  const handleSavePreferences = () => {
    Cookies.set('cookiePreferences', JSON.stringify(cookiePreferences), { expires: 365 });
    setShowCookieSettings(false);
  };

  const handleDeclineAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
    Cookies.set('cookiePreferences', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }), { expires: 365 });
    setShowCookieSettings(false);
  };

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar isScrolled={isScrolled} />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chi-siamo" element={<AboutPage />} />
              <Route path="/prodotti" element={<ProductsPage />} />
              <Route path="/prodotti/:productId" element={<ProductDetailPage />} />
              <Route path="/contatti" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent
          buttonText="Accetta tutti"
          declineButtonText="Rifiuta tutti"
          enableDeclineButton
          disableStyles={true}
          containerClasses="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50"
          buttonClasses="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          declineButtonClasses="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors mr-4"
          contentClasses="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
          onAccept={handleAcceptAll}
          onDecline={handleDeclineAll}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-sm flex-grow">
                Questo sito utilizza i cookie per migliorare l'esperienza utente.{' '}
                <a href="/cookie-policy" className="underline hover:text-primary-300">
                  Maggiori informazioni
                </a>
              </span>
              <button
                onClick={() => setShowCookieSettings(!showCookieSettings)}
                className="text-sm underline hover:text-primary-300"
              >
                Personalizza preferenze
              </button>
            </div>
            
            {showCookieSettings && (
              <div className="bg-gray-800 p-4 rounded-lg mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Cookie necessari</h4>
                      <p className="text-sm text-gray-300">Essenziali per il funzionamento del sito</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.necessary}
                      disabled
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Cookie funzionali</h4>
                      <p className="text-sm text-gray-300">Per funzionalità aggiuntive e preferenze</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.functional}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        functional: e.target.checked
                      })}
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Cookie analitici</h4>
                      <p className="text-sm text-gray-300">Per analizzare l'utilizzo del sito</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        analytics: e.target.checked
                      })}
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Cookie di marketing</h4>
                      <p className="text-sm text-gray-300">Per pubblicità personalizzata</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        marketing: e.target.checked
                      })}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                  >
                    Salva preferenze
                  </button>
                </div>
              </div>
            )}
          </div>
        </CookieConsent>
      </div>
    </>
  );
};

export default App;
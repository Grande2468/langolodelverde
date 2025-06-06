import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import CookieConsent from 'react-cookie-consent';

const Layout = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieConsent
        buttonText="Accetta"
        declineButtonText="Rifiuta"
        enableDeclineButton
        disableStyles={true}
        containerClasses="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50"
        buttonClasses="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
        declineButtonClasses="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors mr-4"
        contentClasses="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <span className="text-sm">
          Questo sito utilizza i cookie per migliorare l'esperienza utente.{' '}
          <a href="/cookie-policy" className="underline hover:text-primary-300">
            Maggiori informazioni
          </a>
        </span>
      </CookieConsent>
    </div>
  );
};

export default Layout;
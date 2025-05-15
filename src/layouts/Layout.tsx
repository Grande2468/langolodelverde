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
        location="bottom"
        buttonText="Capito!"
        cookieName="greenpowerCookieConsent"
        style={{ background: "#2B373B", fontSize: "14px" }}
        buttonStyle={{ color: "#4e503b", background: "#F0EFEB", fontSize: "14px", borderRadius: "3px" }}
        expires={150}
      >
        Questo sito utilizza cookie tecnici per migliorare l'esperienza utente. Utilizzando il nostro sito, accetti l'uso di questi cookie. Per maggiori informazioni, consulta la nostra {" "}
        <a href="/cookie-policy" style={{ color: '#A0AEC0' }} className="hover:underline">Cookie Policy</a>.
      </CookieConsent>
    </div>
  );
};

export default Layout;
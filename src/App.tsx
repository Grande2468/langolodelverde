import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';
import CookieNotice from './components/ui/CookieNotice';
import { ADMIN_BASE } from './admin/base';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const WithdrawalPage = lazy(() => import('./pages/WithdrawalPage'));
// Area admin nascosta: caricata solo da chi apre la rotta, non pesa sul sito pubblico
const AdminApp = lazy(() => import('./admin/AdminApp'));

const App = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith(ADMIN_BASE)) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar isScrolled={isScrolled || location.pathname !== '/'} />
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
              <Route path="/condizioni-di-vendita" element={<TermsPage />} />
              <Route path="/recesso" element={<WithdrawalPage />} />
              <Route path="/carrello" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/ordine-completato" element={<OrderSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieNotice />
      </div>
    </>
  );
};

export default App;

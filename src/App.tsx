import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
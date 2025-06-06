import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logo}
                alt="L'angolo del verde logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-xl font-bold text-white">
                L'angolo del verde
              </span>
            </div>
            <p className="text-primary-100 mb-6 max-w-xs">
              Il tuo partner di fiducia per attrezzature da giardinaggio, paesaggistica e agricoltura di qualità.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1Cc57fSwiu/" className="text-primary-200 hover:text-white transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/langolodelverde_caianello?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-primary-200 hover:text-white transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Link Rapidi</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/chi-siamo" className="text-primary-200 hover:text-white transition-colors">
                  Chi Siamo
                </NavLink>
              </li>
              <li>
                <NavLink to="/prodotti" className="text-primary-200 hover:text-white transition-colors">
                  Prodotti
                </NavLink>
              </li>
              <li>
                <NavLink to="/contatti" className="text-primary-200 hover:text-white transition-colors">
                  Contatti
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Prodotti</h3>
            <ul className="space-y-3">
              <li>
                <a href="/prodotti#motocoltivatori-tosaerba" className="text-primary-200 hover:text-white transition-colors">
                  Motocoltivatori e Tosaerba
                </a>
              </li>
              <li>
                <a href="/prodotti#attrezzatura-giardino" className="text-primary-200 hover:text-white transition-colors">
                  Attrezzatura da Giardino
                </a>
              </li>
              <li>
                <a href="/prodotti#ricambi" className="text-primary-200 hover:text-white transition-colors">
                  Ricambi
                </a>
              </li>
              <li>
                <a href="/prodotti#utensileria" className="text-primary-200 hover:text-white transition-colors">
                  Utensileria
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contattaci</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-primary-100">
                  Via Ceraselle, n 78<br />
                  81059 Caianello (CE)
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:3206658669" className="text-primary-100 hover:text-white transition-colors">
                  320 665 8669
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:antoniogrande2014@gmail.com" className="text-primary-100 hover:text-white transition-colors">
                  antoniogrande2014@gmail.com
                </a>
              </li>
              <li className="text-primary-100">
                <strong className="block text-white mb-2">Orari di Apertura:</strong>
                Lun-Ven: 8:00-13:00, 15:00-20:00<br />
                Sabato: 8:00-13:00<br />
                Domenica: Chiuso
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            &copy; {currentYear} L'angolo del verde. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
            <NavLink 
              to="/privacy-policy" 
              className="text-primary-300 hover:text-white text-sm transition-colors"
            >
              Informativa sulla Privacy
            </NavLink>
            <NavLink 
              to="/cookie-policy" 
              className="text-primary-300 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
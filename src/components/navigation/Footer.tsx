import { NavLink } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="h-8 w-8 text-primary-400" strokeWidth={2} />
              <span className="font-display text-xl font-bold text-white">
                GreenPower
              </span>
            </div>
            <p className="text-primary-100 mb-6 max-w-xs">
              Il tuo partner di fiducia per attrezzature da giardinaggio, paesaggistica e agricoltura di qualità dal 1985.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
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
                <NavLink to="/about" className="text-primary-200 hover:text-white transition-colors">
                  Chi Siamo
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-primary-200 hover:text-white transition-colors">
                  Prodotti
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-primary-200 hover:text-white transition-colors">
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
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Decespugliatori
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Motozappe
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Tosaerba
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Trattorini da Giardino
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Accessori
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
                  Via Giardino 1234<br />
                  Milano, Italia 20100
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+3902123456789" className="text-primary-100 hover:text-white transition-colors">
                  +39 02 1234 5678
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@greenpower.com" className="text-primary-100 hover:text-white transition-colors">
                  info@greenpower.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            &copy; {currentYear} GreenPower Attrezzature. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">
              Informativa sulla Privacy
            </a>
            <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">
              Termini di Servizio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
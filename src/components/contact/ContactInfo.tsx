import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactItems = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Indirizzo',
    details: ['Via Ceraselle 9 81059 Caianello (CE), 78, 81059 Caianello CE'],
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Telefono',
    details: ['320 6658669'],
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    details: ['antoniogrande2014@gmail.com'],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Orari di Apertura',
    details: ['Lunedì - Venerdì: 9:00 - 18:00', 'Sabato: 9:00 - 13:00', 'Domenica: Chiuso'],
  },
];

const ContactInfo = () => {
  return (
    <motion.div
      className="bg-primary-900 text-white p-6 md:p-8 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-2xl font-semibold mb-6">Mettiti in Contatto</h3>
      
      <div className="space-y-8">
        {contactItems.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="bg-primary-700 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              {item.details.map((detail, i) => (
                <p key={i} className="text-primary-100">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <h4 className="font-semibold text-lg mb-4">Seguici</h4>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/share/1Cc57fSwiu/" className="bg-primary-800 hover:bg-primary-700 text-white p-3 rounded-full transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/langolodelverde_caianello?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="bg-primary-800 hover:bg-primary-700 text-white p-3 rounded-full transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
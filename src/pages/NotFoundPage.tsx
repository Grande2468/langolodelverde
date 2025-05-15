import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div 
        className="max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1 
            className="mt-6 text-9xl font-display font-bold text-primary-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Pagina non trovata
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Spiacenti, non siamo riusciti a trovare la pagina che stai cercando.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600">
            Potrebbe essere stata spostata, eliminata o non essere mai esistita.
          </p>
          
          <Button to="/" className="inline-flex items-center mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
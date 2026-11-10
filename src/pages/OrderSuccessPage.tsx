import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useCart } from '../context/CartContext';

const OrderSuccessPage = () => {
  const [params] = useSearchParams();
  const number = params.get('ordine');
  const { clear } = useCart();

  useEffect(() => {
    clear();
    try {
      sessionStorage.removeItem('adv_catalog_v1'); // le giacenze sono cambiate
    } catch {
      /* ignora */
    }
  }, [clear]);

  return (
    <>
      <Helmet>
        <title>Ordine ricevuto | L'angolo del verde</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeader title="Grazie per il tuo ordine!" />
      <div className="container mx-auto px-4 py-16 max-w-xl text-center">
        <CheckCircle2 className="h-16 w-16 text-primary-600 mx-auto mb-4" />
        {number && (
          <p className="text-xl mb-2">
            Numero ordine: <strong>{number}</strong>
          </p>
        )}
        <p className="text-gray-600 mb-8">
          Il pagamento è andato a buon fine. Riceverai la ricevuta via email e ti contatteremo per la consegna o il
          ritiro. Per qualsiasi domanda chiamaci al <a href="tel:3206658669" className="underline">320 665 8669</a>.
        </p>
        <Link to="/prodotti" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
          Torna al negozio
        </Link>
      </div>
    </>
  );
};

export default OrderSuccessPage;

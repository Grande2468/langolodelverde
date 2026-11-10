import { Helmet } from 'react-helmet';
import PageHeader from '../components/ui/PageHeader';

// Dati del venditore presi dall'informativa privacy. Far verificare al titolare tempi e condizioni di reso.
const TermsPage = () => (
  <>
    <Helmet>
      <title>Condizioni di vendita | L'angolo del verde</title>
    </Helmet>
    <PageHeader title="Condizioni di vendita" />
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6 text-gray-700 leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Venditore</h2>
        <p>
          I prodotti sono venduti da L'angolo del verde, Via Ceraselle 78, 81059 Caianello (CE) — Partita IVA
          04874830617 — tel. 320 665 8669, email antoniogrande2014@gmail.com.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Prezzi e pagamento</h2>
        <p>
          Tutti i prezzi sono in euro e comprendono l'IVA. Le spese di consegna sono indicate prima della conferma
          dell'ordine. Il pagamento avviene con carta tramite Stripe: i dati della carta non vengono mai registrati
          sul nostro sito.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Conclusione del contratto</h2>
        <p>
          Il contratto si conclude quando il pagamento è completato. Riceverai una conferma via email. In caso di
          indisponibilità sopravvenuta di un prodotto ti contatteremo e ti rimborseremo l'importo pagato.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Consegna e ritiro</h2>
        <p>
          Puoi scegliere la spedizione all'indirizzo indicato oppure il ritiro in negozio, secondo le opzioni mostrate
          nel checkout. Alcuni prodotti ingombranti sono disponibili solo con ritiro in negozio. Al ricevimento
          controlla che l'imballo sia integro e segnala subito eventuali danni.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Diritto di recesso</h2>
        <p>
          Se sei un consumatore hai diritto di recedere entro 14 giorni dal ricevimento della merce, senza
          indicarne il motivo (artt. 52 e ss. Codice del Consumo), comunicandolo via email o telefono. Il prodotto va
          restituito integro, nella confezione originale; le spese di restituzione sono a tuo carico. Rimborseremo
          l'importo entro 14 giorni dal ricevimento del reso, con lo stesso metodo di pagamento.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Garanzia</h2>
        <p>
          Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi per i consumatori (artt. 128 e
          ss. Codice del Consumo).
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Controversie</h2>
        <p>
          Il contratto è regolato dalla legge italiana. Per le controversie con i consumatori è competente il foro
          del luogo di residenza del consumatore.
        </p>
      </section>
    </div>
  </>
);

export default TermsPage;

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
          Tutti i prezzi sono in euro e comprendono l'IVA. Le spese di consegna ed eventuali commissioni sono indicate
          prima della conferma dell'ordine. Puoi pagare, secondo le opzioni mostrate nel checkout:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            <strong>con carta</strong> tramite Stripe: i dati della carta non vengono mai registrati sul nostro sito;
          </li>
          <li>
            <strong>in contrassegno</strong> (solo con spedizione): paghi in contanti al corriere alla consegna. Può
            essere prevista una commissione e un importo massimo per ordine, sempre indicati nel checkout;
          </li>
          <li>
            <strong>in negozio al ritiro</strong> (solo con ritiro in negozio): paghi quando ritiri la merce.
          </li>
        </ul>
        <p className="mt-2">
          Se richiedi la fattura, inserisci i dati nel checkout: la fattura elettronica ti arriverà tramite il Sistema
          di Interscambio.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Conclusione del contratto</h2>
        <p>
          Con il pagamento con carta il contratto si conclude quando il pagamento è completato; con il contrassegno o
          il pagamento al ritiro si conclude quando invii l'ordine. In ogni caso riceverai una email di conferma con il
          riepilogo dell'ordine. In caso di indisponibilità sopravvenuta di un prodotto ti contatteremo e, se avevi già
          pagato, ti rimborseremo l'importo.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Consegna e ritiro</h2>
        <p>
          Puoi scegliere la spedizione all'indirizzo indicato oppure il ritiro in negozio, secondo le opzioni mostrate
          nel checkout. Alcuni prodotti ingombranti sono disponibili solo con ritiro in negozio. Al ricevimento
          controlla che l'imballo sia integro e segnala subito eventuali danni.
        </p>
        <p className="mt-2">
          <strong>Prodotti su ordinazione.</strong> Alcuni prodotti possono essere ordinati anche se non sono
          disponibili a magazzino: in questo caso li procuriamo dal fornitore e i tempi di consegna indicati nella
          scheda del prodotto decorrono dalla conferma dell'ordine. Ti avvisiamo quando la merce è pronta per la
          spedizione o il ritiro. Se il fornitore non riuscisse a consegnarla, ti informeremo subito e potrai annullare
          l'ordine con il rimborso integrale di quanto eventualmente pagato.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Diritto di recesso</h2>
        <p>
          Se sei un consumatore hai diritto di recedere entro 14 giorni dal ricevimento (o dal ritiro) della merce,
          senza indicarne il motivo (artt. 52 e ss. Codice del Consumo), con una dichiarazione esplicita inviata per
          email o lettera, anche usando il <a href="/recesso" className="underline">modulo di recesso tipo</a>. I beni
          vanno restituiti entro 14 giorni dalla comunicazione; i costi diretti della restituzione sono a tuo carico.
          Rimborseremo tutti i pagamenti ricevuti, compresi i costi di consegna standard, entro 14 giorni dalla
          comunicazione del recesso, con lo stesso metodo di pagamento; possiamo trattenere il rimborso finché non
          riceviamo i beni o la prova della loro spedizione. Tutti i dettagli nella pagina{' '}
          <a href="/recesso" className="underline">Diritto di recesso</a>.
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

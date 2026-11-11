import { Helmet } from 'react-helmet';
import { Mail, Printer } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const SELLER = "L'angolo del verde — Via Ceraselle 78, 81059 Caianello (CE) — P.IVA 04874830617 — antoniogrande2014@gmail.com";

const mailBody = encodeURIComponent(
  `Destinatario: ${SELLER}

Con la presente notifico il recesso dal mio contratto di vendita dei seguenti beni:
[prodotti]

Numero ordine: [ADV-....]
Ordinato il: [data]   Ricevuto il: [data]
Nome del consumatore: [nome e cognome]
Indirizzo del consumatore: [indirizzo]
Data: [data]`
);

// Istruzioni e modulo tipo di recesso (D.Lgs. 206/2005 "Codice del Consumo", artt. 52-59 e Allegato I, parte B).
const WithdrawalPage = () => (
  <>
    <Helmet>
      <title>Diritto di recesso | L'angolo del verde</title>
      <meta name="description" content="Come esercitare il diritto di recesso entro 14 giorni e modulo di recesso tipo." />
    </Helmet>
    <div className="print:hidden">
      <PageHeader title="Diritto di recesso" subtitle="Hai 14 giorni per ripensarci" />
    </div>

    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="prose print:hidden">
        <h2>Come funziona</h2>
        <p>
          Se sei un consumatore (acquisti come privato, non per la tua attività) hai diritto di recedere dal contratto,
          senza indicarne le ragioni, entro <strong>14 giorni</strong> dal giorno in cui tu, o una persona da te
          indicata, ricevete i beni. In caso di ritiro in negozio, i 14 giorni decorrono dal ritiro.
        </p>
        <p>
          Per esercitare il recesso devi informarci della tua decisione con una dichiarazione esplicita, ad esempio
          per email a <a href="mailto:antoniogrande2014@gmail.com">antoniogrande2014@gmail.com</a> o con lettera a
          Via Ceraselle 78, 81059 Caianello (CE). Puoi usare il modulo qui sotto, ma non è obbligatorio. Basta inviare
          la comunicazione prima della scadenza dei 14 giorni.
        </p>

        <h2>Restituzione dei beni</h2>
        <p>
          Devi restituire i beni, o consegnarli in negozio, senza indebiti ritardi e comunque entro 14 giorni dal giorno
          in cui ci hai comunicato il recesso. <strong>I costi diretti della restituzione sono a tuo carico.</strong>
          Sei responsabile solo della diminuzione di valore dei beni dovuta a una manipolazione diversa da quella
          necessaria per verificarne natura, caratteristiche e funzionamento. Ti chiediamo di rispedirli integri, con
          accessori, manuali e se possibile nella confezione originale.
        </p>

        <h2>Rimborso</h2>
        <p>
          Ti rimborseremo tutti i pagamenti ricevuti, <strong>compresi i costi di consegna standard</strong>, entro 14
          giorni dal giorno in cui siamo informati del recesso. Il rimborso avviene con lo stesso metodo di pagamento
          usato per l'acquisto (la tua carta, tramite Stripe), senza costi per te. Se hai pagato in contanti (contrassegno o
          pagamento in negozio), ti rimborseremo con bonifico sul conto che ci indicherai, sempre senza costi, oppure in
          contanti in negozio se preferisci. Possiamo trattenere il rimborso
          finché non abbiamo ricevuto i beni o finché non ci dimostri di averli spediti, se precede.
        </p>

        <h2>Esclusioni</h2>
        <p>
          Il recesso non si applica, tra gli altri casi previsti dall'art. 59 del Codice del Consumo, ai beni
          confezionati su misura o personalizzati e ai beni sigillati che non si prestano a essere restituiti per
          motivi igienici o di protezione della salute e sono stati aperti dopo la consegna.
        </p>

        <h2>Prodotti difettosi</h2>
        <p>
          Il recesso è diverso dalla garanzia: se un prodotto è difettoso o non conforme hai diritto alla garanzia
          legale di 24 mesi (artt. 128 e ss. Codice del Consumo). Contattaci al 320 665 8669.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 my-8 print:hidden">
        <a
          href={`mailto:antoniogrande2014@gmail.com?subject=${encodeURIComponent('Recesso dal contratto')}&body=${mailBody}`}
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
        >
          <Mail className="h-5 w-5" /> Invia il recesso via email
        </a>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-3 border-2 border-primary-600 text-primary-700 rounded-lg font-semibold hover:bg-primary-50"
        >
          <Printer className="h-5 w-5" /> Stampa il modulo
        </button>
      </div>

      <section className="border-2 border-gray-300 rounded-lg p-6 md:p-8 text-gray-800 print:border-0 print:p-0">
        <h2 className="text-xl font-bold mb-1">Modulo di recesso tipo</h2>
        <p className="text-sm text-gray-500 mb-6">
          (compilare e restituire il presente modulo solo se si desidera recedere dal contratto)
        </p>
        <div className="space-y-5 leading-relaxed">
          <p>
            — Destinatario: <strong>{SELLER}</strong>
          </p>
          <p>
            — Con la presente io/noi (*) notifichiamo il recesso dal mio/nostro (*) contratto di vendita dei seguenti
            beni/servizi (*):
            <span className="block border-b border-gray-400 h-8" />
            <span className="block border-b border-gray-400 h-8" />
          </p>
          <p>
            — Ordinato il (*) / ricevuto il (*): <span className="inline-block border-b border-gray-400 w-48" /> — Numero
            ordine: <span className="inline-block border-b border-gray-400 w-32" />
          </p>
          <p>
            — Nome del/dei consumatore(i): <span className="inline-block border-b border-gray-400 w-64" />
          </p>
          <p>
            — Indirizzo del/dei consumatore(i): <span className="inline-block border-b border-gray-400 w-64" />
          </p>
          <p>
            — Firma del/dei consumatore(i) (solo se il presente modulo è notificato in versione cartacea):{' '}
            <span className="inline-block border-b border-gray-400 w-48" />
          </p>
          <p>
            — Data: <span className="inline-block border-b border-gray-400 w-40" />
          </p>
          <p className="text-sm text-gray-500">(*) Cancellare la dicitura inutile.</p>
        </div>
      </section>
    </div>
  </>
);

export default WithdrawalPage;

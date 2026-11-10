import Section from '../components/ui/Section';
import { Helmet } from 'react-helmet';

const CookiePolicyPage = () => (
  <>
    <Helmet>
      <title>Cookie Policy | L'angolo del verde</title>
      <meta name="description" content="Informativa sull'uso dei cookie e degli strumenti tecnici del sito L'angolo del verde." />
    </Helmet>

    <div className="pt-24 bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-primary-100">Ultimo aggiornamento: 11 Novembre 2026</p>
        </div>
      </div>
    </div>

    <Section>
      <div className="prose max-w-3xl mx-auto">
        <p>
          Questa pagina spiega quali cookie e strumenti simili usa il sito di L'angolo del verde (Via Ceraselle 78,
          81059 Caianello (CE) — P.IVA 04874830617), ai sensi dell'art. 122 del Codice Privacy e delle Linee guida del
          Garante per la protezione dei dati personali del 10 giugno 2021.
        </p>

        <h2>In breve</h2>
        <p>
          <strong>Il sito usa solo strumenti tecnici</strong>, necessari a farlo funzionare. Non usiamo cookie di
          profilazione, pubblicità, statistiche o tracciamento, né di nostri né di terze parti. Per questo non ti
          chiediamo un consenso: la legge lo richiede solo per i cookie non tecnici.
        </p>

        <h2>Cosa salviamo sul tuo dispositivo</h2>
        <ul>
          <li>
            <strong>Carrello</strong> (memoria locale del browser, <code>adv_cart_v1</code>): ricorda i prodotti che hai
            aggiunto, anche se chiudi la pagina. Resta finché non completi l'ordine o svuoti il carrello.
          </li>
          <li>
            <strong>Catalogo temporaneo</strong> (memoria di sessione, <code>adv_catalog_v1</code>): una copia dei
            prodotti per caricare le pagine più velocemente. Si cancella quando chiudi la scheda.
          </li>
          <li>
            <strong>Avviso cookie letto</strong> (memoria locale, <code>adv_cookie_notice_v2</code>): evita di mostrarti
            di nuovo l'avviso.
          </li>
        </ul>
        <p>Questi dati restano sul tuo dispositivo e non vengono usati per riconoscerti o profilarti.</p>

        <h2>Servizi di terze parti</h2>
        <ul>
          <li>
            <strong>Stripe</strong> (pagamenti): quando paghi vieni portato sulla pagina sicura di Stripe, che usa
            cookie tecnici e antifrode propri, sul suo dominio. Vedi la{' '}
            <a href="https://stripe.com/it/cookie-settings" target="_blank" rel="noopener noreferrer">
              cookie policy di Stripe
            </a>
            .
          </li>
          <li>
            <strong>Cloudinary</strong> (immagini dei prodotti) e <strong>Google Firebase</strong> (catalogo): servono
            i contenuti del sito e ricevono dati tecnici come l'indirizzo IP, senza impostare cookie di profilazione.
          </li>
          <li>
            <strong>OpenStreetMap</strong> (mappa nella pagina Contatti): la mappa si carica solo se clicchi su
            "Mostra la mappa".
          </li>
        </ul>
        <p>I caratteri tipografici sono ospitati direttamente sul nostro sito: non vengono caricati da Google.</p>

        <h2>Come gestire o cancellare questi dati</h2>
        <p>
          Puoi cancellare in qualsiasi momento cookie e dati dei siti dalle impostazioni del tuo browser (ad esempio in
          Chrome: Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti). Cancellandoli perderai il
          contenuto del carrello.
        </p>

        <h2>Contatti</h2>
        <p>
          Per domande scrivi a antoniogrande2014@gmail.com o chiama il 320 665 8669. Maggiori informazioni sul
          trattamento dei dati nell'<a href="/privacy-policy">informativa privacy</a>.
        </p>
      </div>
    </Section>
  </>
);

export default CookiePolicyPage;

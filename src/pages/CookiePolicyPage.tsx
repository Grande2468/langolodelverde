import React from 'react';
import Section from '../components/ui/Section';
import { Helmet } from 'react-helmet';

const CookiePolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | L'angolo del verde</title>
        <meta name="description" content="Informativa sull'uso dei cookie del sito L'angolo del verde." />
      </Helmet>
      
      <div className="pt-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-primary-100">Ultimo aggiornamento: 13 Marzo 2024</p>
          </div>
        </div>
      </div>

      <Section>
        <div className="prose prose-lg max-w-3xl mx-auto">
          <p>
            Benvenuto/a nella Cookie Policy de L'angolo del verde (di seguito "noi", "nostro", o "Sito"). Questa policy fornisce informazioni dettagliate su come e perché utilizziamo i cookie sul nostro sito web www.langolodelverde.com e su qualsiasi altro sito web, applicazione mobile o servizio che collega a questa Cookie Policy.
          </p>

          <h2>Cosa sono i Cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web, o farli funzionare in modo più efficiente, così come per fornire informazioni ai proprietari del sito.
          </p>

          <h2>Come utilizziamo i Cookie?</h2>
          <p>
            Utilizziamo i cookie per diversi scopi, tra cui:
          </p>
          <ul>
            <li>
              <strong>Cookie Tecnici (Essenziali):</strong> Questi cookie sono strettamente necessari per fornirti i servizi disponibili attraverso il nostro Sito e per utilizzare alcune delle sue funzionalità, come l'accesso ad aree sicure. Poiché questi cookie sono strettamente necessari per erogare il Sito, non puoi rifiutarli senza impattare sul funzionamento del nostro Sito. Puoi bloccarli o eliminarli modificando le impostazioni del tuo browser, come descritto di seguito nella sezione "Come puoi controllare i cookie?".
              <ul>
                <li><em>langolodelverdeCookieConsent:</em> Utilizzato per memorizzare le tue preferenze di consenso ai cookie. Durata: 150 giorni.</li>
                {/* Aggiungi altri cookie tecnici se ne usi */}
              </ul>
            </li>
            <li>
              <strong>Cookie di Preferenza (Funzionali):</strong> Questi cookie vengono utilizzati per riconoscerti quando ritorni sul nostro Sito e ci consentono di ricordare le scelte che fai (come la tua lingua o la regione in cui ti trovi) e fornire funzionalità migliorate e più personali. Questi cookie possono anche essere utilizzati per ricordare le modifiche che hai apportato alla dimensione del testo, ai caratteri e ad altre parti delle pagine web che puoi personalizzare. Le informazioni raccolte da questi cookie possono essere rese anonime e non possono tracciare la tua attività di navigazione su altri siti web.
            </li>
            <li>
              <strong>Cookie Statistici (di Performance/Analitici):</strong> Questi cookie raccolgono informazioni su come utilizzi il nostro Sito, ad esempio quali pagine visiti più spesso e se ricevi messaggi di errore dalle pagine web. Questi cookie non raccolgono informazioni che ti identificano. Tutte le informazioni raccolte da questi cookie sono aggregate e quindi anonime. Vengono utilizzate solo per migliorare il funzionamento del nostro Sito. 
              <br/>
              Attualmente, potremmo utilizzare servizi come:
              <ul>
                <li><em>Google Fonts:</em> Per visualizzare caratteri personalizzati. Google potrebbe raccogliere il tuo indirizzo IP. Per maggiori informazioni, consulta la privacy policy di Google.</li>
                <li><em>OpenStreetMap (tramite React Leaflet):</em> Per visualizzare mappe interattive. I server di OpenStreetMap potrebbero registrare il tuo indirizzo IP per scopi tecnici.</li>
                <li><em>Vercel Analytics (se attivato):</em> Vercel potrebbe raccogliere dati analitici anonimizzati sull'utilizzo del sito. Controlla la documentazione di Vercel per i dettagli specifici sulla loro raccolta dati quando Vercel Analytics è abilitato.</li>
                 {/* Se attivi Google Analytics o simili, aggiungilo qui */}
              </ul>
            </li>
            <li>
              <strong>Cookie di Marketing (Profilazione):</strong> Questi cookie vengono utilizzati per rendere i messaggi pubblicitari più pertinenti per te e i tuoi interessi. Svolgono anche funzioni come impedire la continua ricomparsa dello stesso annuncio, garantire che gli annunci vengano visualizzati correttamente per gli inserzionisti e, in alcuni casi, selezionare annunci pubblicitari basati sui tuoi interessi. 
              <br/>
              <em>Attualmente non utilizziamo cookie di marketing di prima parte in modo estensivo. Se dovessimo integrare servizi pubblicitari di terze parti che impostano tali cookie (es. pixel di Facebook, Google Ads), aggiorneremo questa sezione e richiederemo il tuo consenso specifico.</em>
            </li>
          </ul>

          <h2>Cookie di Terze Parti</h2>
          <p>
            Alcuni cookie sul nostro Sito sono impostati da terze parti quando visiti il nostro Sito. Le terze parti possono impostare cookie quando visiti il nostro Sito per consentire loro di fornirti i loro servizi. Per ulteriori informazioni su questi cookie, così come informazioni su come rinunciare, consulta le loro informative sulla privacy.
          </p>
          <ul>
            <li>Google (per Google Fonts): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy di Google</a></li>
            <li>OpenStreetMap Foundation (per le mappe): <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy di OSMF</a></li>
            <li>Vercel (per l'hosting e potenzialmente analytics): <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy di Vercel</a></li>
             {/* Aggiungi link alle policy di altre terze parti che impostano cookie */}
          </ul>

          <h2>Come puoi controllare i cookie?</h2>
          <p>
            Hai il diritto di decidere se accettare o rifiutare i cookie. Puoi esercitare le tue preferenze sui cookie attraverso il nostro banner di consenso ai cookie.
          </p>
          <p>
            Oltre al nostro banner, puoi impostare o modificare i controlli del tuo browser web per accettare o rifiutare i cookie. Se scegli di rifiutare i cookie, potresti comunque utilizzare il nostro sito web, sebbene il tuo accesso ad alcune funzionalità e aree del nostro sito web potrebbe essere limitato.
          </p>
          <p>
            La maggior parte dei browser pubblicitari fornisce anche un modo per disattivare la pubblicità mirata. Se desideri saperne di più, visita 
            <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">http://www.aboutads.info/choices/</a> o 
            <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">http://www.youronlinechoices.com</a>. 
            Per gli utenti nell'UE: <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.youronlinechoices.eu</a>.
          </p>
          <p>
            Per saperne di più su come gestire i cookie sui browser più diffusi, consulta i seguenti link:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=it" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/windows/eliminare-e-gestire-i-cookie-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Microsoft Edge</a></li>
          </ul>

          <h2>Modifiche a questa Cookie Policy</h2>
          <p>
            Potremmo aggiornare questa Cookie Policy di volta in volta per riflettere, ad esempio, modifiche ai cookie che utilizziamo o per altri motivi operativi, legali o normativi. Ti invitiamo quindi a rivedere regolarmente questa Cookie Policy per rimanere informato sul nostro utilizzo dei cookie e delle tecnologie correlate.
          </p>
          <p>
            La data in cima a questa Cookie Policy indica quando è stata aggiornata l'ultima volta.
          </p>

          <h2>Dove puoi ottenere ulteriori informazioni?</h2>
          <p>
            Se hai domande sul nostro utilizzo dei cookie o di altre tecnologie, ti preghiamo di inviarci un'email a antoniogrande2014@gmail.com.
          </p>
        </div>
      </Section>
    </>
  );
};

export default CookiePolicyPage; 
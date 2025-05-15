import React from 'react';
import Section from '../components/ui/Section';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | GreenPower Attrezzature</title>
        <meta name="description" content="Informativa sulla privacy del sito GreenPower Attrezzature." />
      </Helmet>
      
      <div className="pt-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Informativa sulla Privacy</h1>
            <p className="text-xl text-primary-100">Ultimo aggiornamento: [DATA ODIERNA]</p>
          </div>
        </div>
      </div>

      <Section>
        <div className="prose prose-lg max-w-3xl mx-auto">
          <p>
            Benvenuto/a nell'Informativa sulla Privacy di GreenPower Attrezzature (di seguito "noi", "nostro", o "Sito"). La tua privacy è importante per noi. Questa informativa spiega quali dati personali raccogliamo dagli utenti e come li utilizziamo.
          </p>
          <p>
            Ti invitiamo a leggere attentamente questi termini prima di fornirci i tuoi dati personali su questo sito web. Gli utenti di età inferiore ai quattordici anni non dovrebbero fornire dati personali senza il consenso dei genitori o dei tutori.
          </p>

          <h2>Titolare del Trattamento dei Dati</h2>
          <p>
            <strong>Nome Azienda/Persona:</strong> [IL TUO NOME AZIENDA O NOME PERSONALE QUI]<br />
            <strong>Sede Legale/Indirizzo:</strong> [IL TUO INDIRIZZO QUI]<br />
            <strong>Email di Contatto:</strong> [LA TUA EMAIL DI CONTATTO QUI, es. privacy@greenpowerattrezzature.it]<br />
            {/* <strong>Partita IVA/Codice Fiscale:</strong> [SE APPLICABILE] */}
          </p>

          <h2>Quali Dati Personali Raccogliamo e Perché</h2>
          <p>
            Raccogliamo diversi tipi di informazioni per vari scopi al fine di fornire e migliorare il nostro Servizio per te.
          </p>
          <h3>Tipi di Dati Raccolti</h3>
          <h4>Dati Personali</h4>
          <p>
            Mentre utilizzi il nostro Sito, potremmo chiederti di fornirci alcune informazioni di identificazione personale che possono essere utilizzate per contattarti o identificarti ("Dati Personali"). Le informazioni di identificazione personale possono includere, ma non sono limitate a:
          </p>
          <ul>
            <li>Indirizzo email (se ci contatti direttamente o ti iscrivi a una newsletter, se presente)</li>
            <li>Nome e cognome (se forniti volontariamente, ad esempio, in un modulo di contatto)</li>
            <li>Numero di telefono (se fornito volontariamente)</li>
            <li>Dati di utilizzo e cookie (vedi la nostra <a href="/cookie-policy" className="text-primary-600 hover:underline">Cookie Policy</a> per i dettagli)</li>
          </ul>

          <h4>Dati di Utilizzo</h4>
          <p>
            Potremmo anche raccogliere informazioni su come si accede e si utilizza il Sito ("Dati di Utilizzo"). Questi Dati di Utilizzo possono includere informazioni come l'indirizzo del Protocollo Internet del tuo computer (ad es. indirizzo IP), il tipo di browser, la versione del browser, le pagine del nostro Sito che visiti, l'ora e la data della tua visita, il tempo trascorso su tali pagine, identificatori unici del dispositivo e altri dati diagnostici.
          </p>
          <p>
            Utilizziamo questi dati per:
          </p>
          <ul>
            <li>Fornire e mantenere il nostro Sito.</li>
            <li>Notificarti le modifiche al nostro Sito.</li>
            <li>Consentirti di partecipare a funzionalità interattive del nostro Sito quando scegli di farlo (ad esempio, modulo di contatto, sezione commenti se presente).</li>
            <li>Fornire assistenza ai clienti.</li>
            <li>Raccogliere analisi o informazioni preziose in modo da poter migliorare il nostro Sito.</li>
            <li>Monitorare l'utilizzo del nostro Sito.</li>
            <li>Rilevare, prevenire e affrontare problemi tecnici.</li>
          </ul>

          <h2>Base Giuridica del Trattamento</h2>
          <p>
            Trattiamo i Dati Personali relativi a te se si verifica una delle seguenti condizioni:
          </p>
          <ul>
            <li>Hai prestato il tuo consenso per una o più finalità specifiche. Nota: In alcune giurisdizioni potremmo essere autorizzati a trattare i Dati Personali fino a quando non ti opponi a tale trattamento ("opt-out"), senza dover fare affidamento sul consenso o su qualsiasi altra delle seguenti basi giuridiche. Ciò, tuttavia, non si applica qualora il trattamento dei Dati Personali sia soggetto alla legge europea sulla protezione dei dati (GDPR);</li>
            <li>Il trattamento è necessario per l'esecuzione di un contratto con te e/o per eventuali obblighi precontrattuali dello stesso;</li>
            <li>Il trattamento è necessario per adempiere un obbligo legale al quale siamo soggetti;</li>
            <li>Il trattamento è necessario per l'esecuzione di un compito di interesse pubblico o per l'esercizio di pubblici poteri di cui siamo investiti;</li>
            <li>Il trattamento è necessario per il perseguimento del nostro legittimo interesse o di terzi, a condizione che non prevalgano i tuoi interessi o i tuoi diritti e libertà fondamentali che richiedono la protezione dei dati personali.</li>
          </ul>
          <p>
            Saremo lieti di aiutarti a chiarire la specifica base giuridica che si applica al trattamento, e in particolare se la fornitura di Dati Personali è un requisito legale o contrattuale, o un requisito necessario per stipulare un contratto.
          </p>

          <h2>Luogo del Trattamento e Trasferimento dei Dati</h2>
          <p>
            I dati sono trattati presso le nostre sedi operative ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Ciò significa che queste informazioni possono essere trasferite a — e mantenute su — computer situati al di fuori del tuo stato, provincia, nazione o altra giurisdizione governativa dove le leggi sulla protezione dei dati possono differire da quelle della tua giurisdizione.
          </p>
          <p>
            Il tuo consenso a questa Informativa sulla Privacy seguito dall'invio di tali informazioni rappresenta il tuo accordo a tale trasferimento.
          </p>
          <p>
            Adotteremo tutte le misure ragionevolmente necessarie per garantire che i tuoi dati siano trattati in modo sicuro e in conformità con questa Informativa sulla Privacy e nessun trasferimento dei tuoi Dati Personali avrà luogo verso un'organizzazione o un paese a meno che non vi siano controlli adeguati in atto, inclusa la sicurezza dei tuoi dati e di altre informazioni personali.
          </p>
          <p>
            In particolare, se sei un utente situato nello Spazio Economico Europeo (SEE), i tuoi dati potrebbero essere trasferiti in paesi al di fuori del SEE. In tali casi, garantiremo che tali trasferimenti siano effettuati in conformità con le leggi sulla protezione dei dati applicabili, ad esempio stipulando Clausole Contrattuali Standard approvate dalla Commissione Europea o affidandoci a decisioni di adeguatezza.
          </p>

          <h2>Periodo di Conservazione dei Dati</h2>
          <p>
            Tratteremo e conserveremo i tuoi Dati Personali per il tempo richiesto dalla finalità per la quale sono stati raccolti.
          </p>
          <p>Pertanto:</p>
          <ul>
            <li>I Dati Personali raccolti per scopi collegati all'esecuzione di un contratto tra noi e te saranno conservati fino a quando tale contratto non sia stato completamente eseguito.</li>
            <li>I Dati Personali raccolti per le finalità del nostro legittimo interesse saranno conservati per il tempo necessario a soddisfare tali finalità. Puoi trovare informazioni specifiche riguardo ai legittimi interessi da noi perseguiti nelle relative sezioni di questo documento o contattandoci.</li>
          </ul>
          <p>
            Potremmo essere autorizzati a conservare i Dati Personali per un periodo più lungo ogniqualvolta tu abbia prestato il consenso a tale trattamento, fintanto che tale consenso non venga revocato. Inoltre, potremmo essere obbligati a conservare i Dati Personali per un periodo più lungo ogniqualvolta ciò sia richiesto per l'adempimento di un obbligo legale o per ordine di un'autorità.
          </p>
          <p>
            Una volta scaduto il periodo di conservazione, i Dati Personali saranno cancellati. Pertanto, il diritto di accesso, il diritto alla cancellazione, il diritto di rettifica ed il diritto alla portabilità dei dati non potranno essere esercitati dopo la scadenza del periodo di conservazione.
          </p>

          <h2>I Tuoi Diritti ai Sensi del GDPR</h2>
          <p>
            Se sei residente nello Spazio Economico Europeo (SEE), hai determinati diritti di protezione dei dati. Miriamo a prendere misure ragionevoli per consentirti di correggere, modificare, eliminare o limitare l'uso dei tuoi Dati Personali.
          </p>
          <p>
            Se desideri essere informato su quali Dati Personali deteniamo su di te e se desideri che vengano rimossi dai nostri sistemi, ti preghiamo di contattarci.
          </p>
          <p>
            In determinate circostanze, hai i seguenti diritti di protezione dei dati:
          </p>
          <ul>
            <li><strong>Il diritto di accesso, aggiornamento o cancellazione</strong> delle informazioni che abbiamo su di te.</li>
            <li><strong>Il diritto di rettifica.</strong> Hai il diritto di far rettificare le tue informazioni se tali informazioni sono inesatte o incomplete.</li>
            <li><strong>Il diritto di opposizione.</strong> Hai il diritto di opporti al nostro trattamento dei tuoi Dati Personali.</li>
            <li><strong>Il diritto di limitazione.</strong> Hai il diritto di richiederci di limitare il trattamento delle tue informazioni personali.</li>
            <li><strong>Il diritto alla portabilità dei dati.</strong> Hai il diritto di ricevere una copia delle informazioni che abbiamo su di te in un formato strutturato, leggibile da dispositivo automatico e di uso comune.</li>
            <li><strong>Il diritto di revoca del consenso.</strong> Hai anche il diritto di revocare il tuo consenso in qualsiasi momento qualora ci fossimo basati sul tuo consenso per trattare le tue informazioni personali.</li>
          </ul>
          <p>
            Si prega di notare che potremmo chiederti di verificare la tua identità prima di rispondere a tali richieste. Potremmo non essere in grado di fornire il nostro Servizio senza alcuni dati necessari.
          </p>
          <p>
            Hai il diritto di presentare un reclamo a un'Autorità Garante per la protezione dei dati in merito alla nostra raccolta e utilizzo dei tuoi Dati Personali. Per ulteriori informazioni, se sei nello Spazio Economico Europeo (SEE), contatta la tua autorità locale per la protezione dei dati nel SEE.
          </p>

          <h2>Fornitori di Servizi (Service Provider)</h2>
          <p>
            Potremmo impiegare società e individui di terze parti per facilitare il nostro Sito ("Fornitori di Servizi"), per fornire il Sito per nostro conto, per eseguire servizi relativi al Sito o per assisterci nell'analisi di come viene utilizzato il nostro Sito.
          </p>
          <p>
            Queste terze parti hanno accesso ai tuoi Dati Personali solo برای eseguire questi compiti per nostro conto e sono obbligate a non divulgarli o utilizzarli per altri scopi. Esempi includono:
          </p>
          <ul>
            <li><strong>Hosting Provider:</strong> Come Vercel, che ospita il nostro sito. Consulta la loro <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy di Vercel</a>.</li>
            <li><strong>Servizi di Mappe:</strong> Come OpenStreetMap.</li>
            <li><strong>Servizi di Font:</strong> Come Google Fonts.</li>
             {/* Aggiungi altri fornitori se pertinenti */}
          </ul>

          <h2>Sicurezza dei Dati</h2>
          <p>
            La sicurezza dei tuoi dati è importante per noi, ma ricorda che nessun metodo di trasmissione su Internet o metodo di archiviazione elettronica è sicuro al 100%. Sebbene ci sforziamo di utilizzare mezzi commercialmente accettabili per proteggere i tuoi Dati Personali, non possiamo garantirne la sicurezza assoluta.
          </p>

          <h2>Link ad Altri Siti</h2>
          <p>
            Il nostro Sito può contenere link ad altri siti che non sono gestiti da noi. Se fai clic su un link di terze parti, verrai indirizzato al sito di quella terza parte. Ti consigliamo vivamente di rivedere l'Informativa sulla Privacy di ogni sito che visiti.
          </p>
          <p>
            Non abbiamo alcun controllo e non ci assumiamo alcuna responsabilità per il contenuto, le politiche sulla privacy o le pratiche di siti o servizi di terze parti.
          </p>

          <h2>Privacy dei Minori</h2>
          <p>
            Il nostro Servizio non si rivolge a persone di età inferiore ai 18 anni ("Minori").
          </p>
          <p>
            Non raccogliamo consapevolmente informazioni di identificazione personale da minori di 18 anni. Se sei un genitore o tutore e sei consapevole che tuo figlio ci ha fornito Dati Personali, ti preghiamo di contattarci. Se veniamo a conoscenza del fatto che abbiamo raccolto Dati Personali da minori senza la verifica del consenso dei genitori, adottiamo misure per rimuovere tali informazioni dai nostri server.
          </p>

          <h2>Modifiche a Questa Informativa sulla Privacy</h2>
          <p>
            Potremmo aggiornare la nostra Informativa sulla Privacy di volta in volta. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina.
          </p>
          <p>
            Ti informeremo via email e/o un avviso ben visibile sul nostro Sito, prima che la modifica diventi effettiva e aggiorneremo la "data di ultimo aggiornamento" in cima a questa Informativa sulla Privacy.
          </p>
          <p>
            Si consiglia di rivedere periodicamente la presente Informativa sulla Privacy per eventuali modifiche. Le modifiche alla presente Informativa sulla Privacy entrano in vigore nel momento in cui vengono pubblicate su questa pagina.
          </p>

          <h2>Contattaci</h2>
          <p>
            Se hai domande sulla presente Informativa sulla Privacy, ti preghiamo di contattarci:
          </p>
          <ul>
            <li>Tramite email: [LA TUA EMAIL DI CONTATTO QUI, es. privacy@greenpowerattrezzature.it]</li>
            {/* Aggiungi altri metodi di contatto se lo desideri */}
          </ul>
        </div>
      </Section>
    </>
  );
};

export default PrivacyPolicyPage; 
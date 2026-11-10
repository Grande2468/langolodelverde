# Setup e-commerce — L'angolo del verde

Il sito è un'app React su **Netlify**. Il database e il login sono su **Firebase**, le foto su **Cloudinary** e i pagamenti con carta su **Stripe**.
Il codice è pronto. Questi passaggi si fanno una volta sola, dalle console dei vari servizi.

## 1. Firebase (console.firebase.google.com → progetto `langolodelverde-9da32`)

1. **Firestore Database**: se non esiste, crealo in modalità produzione (regione `eur3` o `europe-west`).
2. **Firestore → Regole**: incolla tutto il contenuto del file [`firestore.rules`](firestore.rules) e premi **Pubblica**.
   Senza questo passaggio il sito mostra "Non riusciamo a caricare i prodotti".
3. **Authentication → Metodo di accesso**: abilita **Email/Password**.
   In **Users** deve esistere `langolodelverde@admin.com`. Cambia la password con una nuova, non quella scritta in chat.
4. **Impostazioni progetto (ingranaggio) → Account di servizio → Genera nuova chiave privata**.
   Si scarica un file `.json`: **non metterlo nel repository**. Da quel file ti servono `client_email` e `private_key` (punto 4).

## 2. Cloudinary (cloudinary.com, account con cloud name `dut9zxpsq`)

Dashboard → **API Keys**: copia **API Key** e **API Secret**.
Se usi un altro account Cloudinary, imposta anche `CLOUDINARY_CLOUD_NAME` e `VITE_CLOUDINARY_CLOUD_NAME` con il suo cloud name.

## 3. Stripe (dashboard.stripe.com)

1. **Developers → API keys**: copia la **Secret key** (`sk_test_...` per le prove, `sk_live_...` quando si va online davvero).
   La Publishable key non serve.
2. **Developers → Webhooks → Add endpoint**:
   - URL: `https://<il-tuo-sito>.netlify.app/api/stripe-webhook` (poi il dominio vero)
   - Eventi: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`
   - Copia il **Signing secret** (`whsec_...`).
3. **Settings → Customer emails**: attiva "Successful payments", così il cliente riceve la ricevuta.

## 4. Netlify → Site configuration → Environment variables

| Variabile | Valore |
|---|---|
| `FIREBASE_CLIENT_EMAIL` | `client_email` dal file json del punto 1.4 |
| `FIREBASE_PRIVATE_KEY` | `private_key` dal file json, incollata intera (da `-----BEGIN` a `END PRIVATE KEY-----\n`) |
| `STRIPE_SECRET_KEY` | `sk_test_...` / `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `CLOUDINARY_API_KEY` | API Key Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret Cloudinary |
| `ADMIN_EMAILS` | (facoltativa) default `langolodelverde@admin.com` |

Le impostazioni di build sono già nel file `netlify.toml` (comando `npm run build`, cartella `dist`, Node 22).
Dopo aver aggiunto le variabili: **Deploys → Trigger deploy → Clear cache and deploy site**.

## 5. Primo utilizzo

1. Apri `https://<sito>/gestione-adv` e accedi.
2. **Impostazioni → Metodi di consegna**: controlla i prezzi e premi **Salva spedizioni**. È obbligatorio: senza questo il checkout non ha metodi di consegna.
3. **Impostazioni → Categorie**: premi **Salva categorie**. Partono già le 4 categorie del sito vecchio.
4. **Prodotti → Nuovo prodotto**: foto, prezzo, giacenza online e negozio.
5. Ordine di prova con la carta di test Stripe: `4242 4242 4242 4242`, una data futura qualsiasi, CVC `123`.
   L'ordine compare in **Ordini** come "Pagato" e la giacenza online scende di 1.

## Come funziona (in breve)

- **Catalogo**: tutti i prodotti visibili stanno in un solo documento (`public/catalog`). Ogni visita al negozio costa una sola lettura Firestore, quindi il piano gratuito basta anche con centinaia di prodotti.
- **Foto**: vengono compresse nel browser prima dell'upload (WebP, max 1600 px, circa 200 KB). Cloudinary le serve già della misura giusta.
- **Ordini**: li crea solo il server (`netlify/functions/checkout.ts`), che ricalcola prezzi e spedizione dal database. Il webhook Stripe segna l'ordine come pagato e scarica il magazzino **online**.
- **Magazzino**: due giacenze per prodotto, **online** (quello che si vende sul sito) e **negozio** (separato). Carichi, scarichi, trasferimenti e inventari restano registrati nei movimenti.
- **Annullare un ordine pagato** dal pannello rimette la merce in magazzino. Il **rimborso** si fa dal pannello Stripe.

## Prima di andare online con pagamenti veri

- Su Stripe passa alle chiavi **live**, crea il webhook live e aggiorna le due variabili su Netlify.
- Completa i dati aziendali (ragione sociale, P.IVA) in **Condizioni di vendita** (`src/pages/TermsPage.tsx`).
- Aggiorna l'**Informativa privacy**: ora il sito raccoglie i dati dei clienti per gli ordini e usa Stripe.

// Email di conferma ordine al cliente e avviso al negozio, tramite Resend (https://resend.com).
// Si attiva solo se su Netlify ci sono RESEND_API_KEY ed EMAIL_FROM: altrimenti non fa nulla
// (l'ordine viene comunque registrato). Un errore di invio non blocca mai l'ordine.

const euro = (cents: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format((cents ?? 0) / 100);
const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const PAYMENT_LABEL: Record<string, string> = {
  carta: 'Carta di pagamento (pagato)',
  contrassegno: 'Contrassegno: paghi in contanti al corriere alla consegna',
  ritiro: 'Pagamento in negozio al momento del ritiro',
};

interface OrderLike {
  number: string;
  items: { name: string; qty: number; price: number; backorder?: boolean }[];
  subtotal: number;
  shippingCost: number;
  codFee?: number;
  total: number;
  shippingMethod: { name: string; type: string };
  paymentMethod?: string;
  customer: { nome: string; cognome: string; email: string; telefono: string; indirizzo: string; cap: string; citta: string; provincia: string; note?: string };
  invoice?: Record<string, string> | null;
}

const send = async (to: string, subject: string, html: string, replyTo?: string) => {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error('Invio email non riuscito', res.status, await res.text().catch(() => ''));
};

const orderTable = (o: OrderLike) => `
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${o.items
      .map(
        (i) => `<tr><td style="padding:6px 0;border-bottom:1px solid #eee">${i.qty} × ${esc(i.name)}${
          i.backorder ? '<br><small style="color:#847a56">Su ordinazione</small>' : ''
        }</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${euro(i.price * i.qty)}</td></tr>`
      )
      .join('')}
    <tr><td style="padding:6px 0">${esc(o.shippingMethod.name)}</td><td style="text-align:right">${euro(o.shippingCost)}</td></tr>
    ${o.codFee ? `<tr><td style="padding:6px 0">Commissione contrassegno</td><td style="text-align:right">${euro(o.codFee)}</td></tr>` : ''}
    <tr><td style="padding:8px 0;font-weight:bold">Totale</td><td style="text-align:right;font-weight:bold">${euro(o.total)}</td></tr>
  </table>`;

export const sendOrderEmails = async (o: OrderLike) => {
  try {
    const c = o.customer;
    const shop = process.env.SHOP_EMAIL || 'antoniogrande2014@gmail.com';
    const address =
      o.shippingMethod.type === 'spedizione'
        ? `${esc(c.indirizzo)}, ${esc(c.cap)} ${esc(c.citta)} (${esc(c.provincia)})`
        : 'Ritiro in negozio — Via Ceraselle 78, 81059 Caianello (CE)';
    const hasBackorder = o.items.some((i) => i.backorder);

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#222">
        <h2 style="color:#274e2f">Grazie per il tuo ordine, ${esc(c.nome)}!</h2>
        <p>Abbiamo ricevuto il tuo ordine <strong>${esc(o.number)}</strong>. Questa email è la conferma del contratto di acquisto.</p>
        ${orderTable(o)}
        <p><strong>Pagamento:</strong> ${esc(PAYMENT_LABEL[o.paymentMethod ?? 'carta'])}</p>
        <p><strong>Consegna:</strong> ${address}</p>
        ${hasBackorder ? '<p>Alcuni prodotti sono <strong>su ordinazione</strong>: ti avviseremo quando saranno disponibili per la spedizione o il ritiro.</p>' : ''}
        <p>Hai 14 giorni dalla consegna per recedere: <a href="https://www.langolodelverde.it/recesso">diritto di recesso e modulo</a>.
        Condizioni di vendita: <a href="https://www.langolodelverde.it/condizioni-di-vendita">langolodelverde.it/condizioni-di-vendita</a>.</p>
        <p>Per qualsiasi domanda rispondi a questa email o chiamaci al 320 665 8669.</p>
        <p style="color:#777;font-size:12px">L'angolo del verde — Via Ceraselle 78, 81059 Caianello (CE) — P.IVA 04874830617</p>
      </div>`;

    const shopHtml = `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#222">
        <h2>Nuovo ordine ${esc(o.number)} — ${euro(o.total)}</h2>
        <p><strong>${esc(c.nome)} ${esc(c.cognome)}</strong> — ${esc(c.telefono)} — ${esc(c.email)}</p>
        <p><strong>Pagamento:</strong> ${esc(PAYMENT_LABEL[o.paymentMethod ?? 'carta'])}<br><strong>Consegna:</strong> ${address}</p>
        ${orderTable(o)}
        ${c.note ? `<p><strong>Note:</strong> ${esc(c.note)}</p>` : ''}
        ${o.invoice ? '<p><strong>Il cliente ha richiesto la fattura</strong> (dati nel pannello).</p>' : ''}
        <p><a href="https://www.langolodelverde.it/gestione-adv/ordini">Apri il pannello ordini</a></p>
      </div>`;

    await Promise.all([
      send(c.email, `Conferma ordine ${o.number} — L'angolo del verde`, customerHtml, shop),
      send(shop, `Nuovo ordine ${o.number} (${euro(o.total)})`, shopHtml, c.email),
    ]);
  } catch (err) {
    console.error('Errore email ordine', err);
  }
};

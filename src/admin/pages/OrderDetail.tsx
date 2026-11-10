import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Printer, Phone, Mail, AlertTriangle, ExternalLink } from 'lucide-react';
import { cancelOrderAndRestock, getOrder, refundOrder, updateOrder } from '../api';
import { ADMIN_BASE } from '../base';
import { Btn, Card, ErrorBox, Field, PageTitle, Spinner, StatusBadge, errMsg, inputCls } from '../components/ui';
import { cld } from '../../lib/cloudinary';
import { centsToInput, dateTime, euro, parseEuro } from '../../lib/format';
import { ORDER_STATUS_LABELS, type Order, type OrderStatus } from '../../lib/types';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const printSlip = (o: Order) => {
  const c = o.customer;
  const w = window.open('', '_blank', 'width=800,height=900');
  if (!w) return;
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${o.number}</title>
  <style>body{font-family:system-ui,sans-serif;padding:32px;color:#111}h1{margin:0 0 4px}table{width:100%;border-collapse:collapse;margin-top:16px}
  td,th{border-bottom:1px solid #ddd;padding:8px;text-align:left}.addr{border:2px solid #111;padding:16px;font-size:18px;margin-top:16px;max-width:420px}.r{text-align:right}</style>
  </head><body><h1>L'angolo del verde</h1><div>Ordine <b>${esc(o.number)}</b> del ${esc(dateTime(o.createdAt))} — ${esc(o.shippingMethod.name)}</div>
  <div class="addr"><b>${esc(c.nome)} ${esc(c.cognome)}</b><br>${
    o.shippingMethod.type === 'spedizione' ? `${esc(c.indirizzo)}<br>${esc(c.cap)} ${esc(c.citta)} (${esc(c.provincia)})<br>` : 'RITIRO IN NEGOZIO<br>'
  }Tel. ${esc(c.telefono)}</div>
  <table><tr><th>Prodotto</th><th class="r">Qtà</th><th class="r">Prezzo</th></tr>${o.items
    .map((i) => `<tr><td>${esc(i.name)}</td><td class="r">${i.qty}</td><td class="r">${esc(euro(i.price * i.qty))}</td></tr>`)
    .join('')}<tr><td>Consegna</td><td></td><td class="r">${esc(euro(o.shippingCost))}</td></tr>
  <tr><th>Totale pagato</th><th></th><th class="r">${esc(euro(o.total))}</th></tr></table>
  ${c.note ? `<p><b>Note cliente:</b> ${esc(c.note)}</p>` : ''}<script>window.print()</script></body></html>`);
  w.document.close();
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<OrderStatus>('pagato');
  const [courier, setCourier] = useState('');
  const [tracking, setTracking] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundRestock, setRefundRestock] = useState(true);
  const [refundReason, setRefundReason] = useState('');
  const [refundMsg, setRefundMsg] = useState<string | null>(null);

  const load = () =>
    id &&
    getOrder(id)
      .then((o) => {
        if (!o) return setError('Ordine non trovato');
        setOrder(o);
        setStatus(o.status);
        setCourier(o.courier ?? '');
        setTracking(o.tracking ?? '');
        setNotes(o.adminNotes ?? '');
        setRefundAmount(centsToInput(o.total - (o.refundedTotal ?? 0)));
      })
      .catch((e) => setError(errMsg(e)));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <ErrorBox error={error} />;
  if (!order) return <Spinner />;
  const c = order.customer;
  const isShip = order.shippingMethod.type === 'spedizione';
  const address = `${c.nome} ${c.cognome}\n${c.indirizzo}\n${c.cap} ${c.citta} (${c.provincia})\nTel. ${c.telefono}`;

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateOrder(order.id, { status, courier: courier.trim(), tracking: tracking.trim(), adminNotes: notes.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await load();
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const residual = order.total - (order.refundedTotal ?? 0);
  const canRefund = !!order.paymentIntent && residual > 0;

  const refund = async () => {
    const cents = parseEuro(refundAmount);
    if (!cents || cents > residual) return setError(`Importo non valido (massimo ${euro(residual)})`);
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Rimborsare ${euro(cents)} al cliente tramite Stripe? L'operazione non si può annullare.`)) return;
    setSaving(true);
    setError(null);
    setRefundMsg(null);
    try {
      const r = await refundOrder(order.id, { amount: cents, restock: refundRestock, reason: refundReason.trim() });
      setRefundMsg(`Rimborso di ${euro(cents)} inviato (${r.status}). Il cliente lo vedrà sulla carta in 5–10 giorni lavorativi.`);
      setRefundReason('');
      await load();
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const cancel = async () => {
    const reason = prompt(
      order.stockApplied
        ? 'Annullare l\'ordine? La merce tornerà nel magazzino online.\nRicorda di fare il RIMBORSO dal pannello Stripe.\n\nMotivo (facoltativo):'
        : 'Annullare l\'ordine?\n\nMotivo (facoltativo):'
    );
    if (reason === null) return;
    setSaving(true);
    try {
      await cancelOrderAndRestock(order.id, reason.trim());
      await load();
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <Link to={`${ADMIN_BASE}/ordini`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
        <ArrowLeft className="h-4 w-4" /> Ordini
      </Link>
      <PageTitle title={`Ordine ${order.number}`}>
        <StatusBadge status={order.status} />
        <Btn variant="secondary" onClick={() => printSlip(order)}>
          <Printer className="h-4 w-4" /> Stampa riepilogo
        </Btn>
      </PageTitle>

      {order.oversold && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm p-3 flex gap-2">
          <AlertTriangle className="h-5 w-5 shrink-0" /> Al momento del pagamento la giacenza online non bastava per tutti i
          prodotti (giacenza andata sotto zero). Controlla il magazzino o contatta il cliente.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="font-semibold">{isShip ? 'Spedire a' : 'Ritiro in negozio'}</h2>
              {isShip && (
                <Btn
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  <Copy className="h-4 w-4" /> {copied ? 'Copiato!' : 'Copia indirizzo'}
                </Btn>
              )}
            </div>
            <p className="text-lg font-medium">
              {c.nome} {c.cognome}
            </p>
            {isShip && (
              <p className="text-gray-700">
                {c.indirizzo}
                <br />
                {c.cap} {c.citta} ({c.provincia})
              </p>
            )}
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <a href={`tel:${c.telefono}`} className="flex items-center gap-1 text-primary-700 hover:underline">
                <Phone className="h-4 w-4" /> {c.telefono}
              </a>
              <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Il tuo ordine ${order.number}`)}`} className="flex items-center gap-1 text-primary-700 hover:underline">
                <Mail className="h-4 w-4" /> {c.email}
              </a>
            </div>
            {c.note && (
              <p className="mt-4 text-sm bg-amber-50 border border-amber-200 rounded p-3">
                <strong>Note del cliente:</strong> {c.note}
              </p>
            )}
          </Card>

          <Card className="overflow-hidden">
            <h2 className="font-semibold px-5 pt-5 pb-3">Prodotti</h2>
            <ul className="divide-y">
              {order.items.map((i) => (
                <li key={i.productId} className="flex items-center gap-3 px-5 py-3">
                  <img src={cld(i.image, { w: 64, h: 64, crop: 'pad' })} alt="" className="w-12 h-12 object-contain border rounded bg-white" />
                  <Link to={`${ADMIN_BASE}/prodotti/${i.productId}`} className="flex-grow hover:text-primary-700">
                    {i.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {i.qty} × {euro(i.price)}
                  </span>
                  <span className="font-semibold w-24 text-right">{euro(i.qty * i.price)}</span>
                </li>
              ))}
            </ul>
            <div className="px-5 py-4 border-t text-sm space-y-1 bg-gray-50">
              <div className="flex justify-between">
                <span>Subtotale</span>
                <span>{euro(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{order.shippingMethod.name}</span>
                <span>{euro(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Totale</span>
                <span>{euro(order.total)}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold">Gestione</h2>
            <Field label="Stato">
              <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)} disabled={order.status === 'annullato'}>
                {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[])
                  .filter((s) => s !== 'annullato' && (s !== 'in_attesa_pagamento' || order.status === 'in_attesa_pagamento'))
                  .map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STATUS_LABELS[s]}
                    </option>
                  ))}
                {order.status === 'annullato' && <option value="annullato">Annullato</option>}
              </select>
            </Field>
            {isShip && (
              <>
                <Field label="Corriere">
                  <input className={inputCls} value={courier} onChange={(e) => setCourier(e.target.value)} placeholder="Es. BRT, GLS, Poste" />
                </Field>
                <Field label="Numero di tracking">
                  <input className={inputCls} value={tracking} onChange={(e) => setTracking(e.target.value)} />
                </Field>
              </>
            )}
            <Field label="Note interne">
              <textarea rows={3} className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            <Btn onClick={save} disabled={saving} className="w-full">
              {saved ? 'Salvato ✓' : saving ? 'Salvataggio…' : 'Salva'}
            </Btn>
            {order.status !== 'annullato' && (
              <Btn variant="secondary" onClick={cancel} disabled={saving} className="w-full text-red-700">
                Annulla ordine
              </Btn>
            )}
          </Card>

          {order.paymentIntent && (
            <Card className="p-5 space-y-3">
              <h2 className="font-semibold">Rimborso</h2>
              {(order.refundedTotal ?? 0) > 0 && (
                <p className="text-sm text-gray-700">
                  Già rimborsato: <strong>{euro(order.refundedTotal)}</strong> su {euro(order.total)}
                </p>
              )}
              {order.refunds?.map((r) => (
                <p key={r.id} className="text-xs text-gray-500">
                  {dateTime(r.at)} — {euro(r.amount)}
                  {r.reason ? ` — ${r.reason}` : ''}
                </p>
              ))}
              {canRefund ? (
                <>
                  <Field label="Importo da rimborsare €" hint="Per un recesso completo rimborsa anche la spedizione">
                    <input inputMode="decimal" className={inputCls} value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} />
                  </Field>
                  <Field label="Motivo">
                    <input className={inputCls} value={refundReason} onChange={(e) => setRefundReason(e.target.value)} placeholder="Es. recesso, prodotto difettoso" />
                  </Field>
                  {order.stockApplied && (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={refundRestock} onChange={(e) => setRefundRestock(e.target.checked)} />
                      Rimetti la merce nel magazzino online
                    </label>
                  )}
                  <Btn variant="danger" onClick={refund} disabled={saving} className="w-full">
                    Rimborsa con Stripe
                  </Btn>
                </>
              ) : (
                <p className="text-sm text-gray-500">Ordine interamente rimborsato.</p>
              )}
              {refundMsg && <p className="text-sm text-primary-700">{refundMsg}</p>}
            </Card>
          )}

          {order.invoice && (
            <Card className="p-5 text-sm space-y-1">
              <h2 className="font-semibold mb-2 text-base">Fattura richiesta</h2>
              {order.invoice.tipo === 'azienda' ? (
                <>
                  <p><strong>{order.invoice.ragioneSociale}</strong></p>
                  <p>P.IVA {order.invoice.partitaIva}</p>
                  {order.invoice.codiceFiscale && <p>C.F. {order.invoice.codiceFiscale}</p>}
                  {order.invoice.codiceDestinatario && <p>Codice SDI: {order.invoice.codiceDestinatario}</p>}
                  {order.invoice.pec && <p>PEC: {order.invoice.pec}</p>}
                </>
              ) : (
                <>
                  <p><strong>{c.nome} {c.cognome}</strong> (privato)</p>
                  <p>C.F. {order.invoice.codiceFiscale}</p>
                </>
              )}
              <p>{order.invoice.indirizzo}</p>
              <p className="text-xs text-gray-500 pt-2">Emetti la fattura elettronica con il tuo software (es. Fatture in Cloud o il portale dell'Agenzia delle Entrate).</p>
            </Card>
          )}

          <Card className="p-5 text-sm space-y-1 text-gray-600">
            <p>Creato: {dateTime(order.createdAt)}</p>
            <p>Pagato: {dateTime(order.paidAt)}</p>
            {order.cancelReason && <p>Motivo annullo: {order.cancelReason}</p>}
            {order.paymentIntent && (
              <a
                href={`https://dashboard.stripe.com/payments/${order.paymentIntent}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-700 hover:underline pt-2"
              >
                Apri pagamento su Stripe <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

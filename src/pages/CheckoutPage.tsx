import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Lock, CreditCard } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useCart } from '../context/CartContext';
import { fetchShipping } from '../lib/catalog';
import { euro } from '../lib/format';
import type { Customer, InvoiceData, ShippingMethod } from '../lib/types';

const EMPTY_INVOICE: InvoiceData = { tipo: 'privato', codiceFiscale: '', ragioneSociale: '', partitaIva: '', codiceDestinatario: '', pec: '', indirizzo: '' };

const EMPTY: Customer = { nome: '', cognome: '', email: '', telefono: '', indirizzo: '', cap: '', citta: '', provincia: '', note: '' };

export const shippingCostFor = (m: ShippingMethod, subtotal: number) =>
  m.freeAbove != null && m.freeAbove > 0 && subtotal >= m.freeAbove ? 0 : m.price;

const CheckoutPage = () => {
  const { lines, subtotal } = useCart();
  const [methods, setMethods] = useState<ShippingMethod[] | null>(null);
  const [methodId, setMethodId] = useState('');
  const [c, setC] = useState<Customer>(EMPTY);
  const [accepted, setAccepted] = useState(false);
  const [wantInvoice, setWantInvoice] = useState(false);
  const [inv, setInv] = useState<InvoiceData>(EMPTY_INVOICE);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPickupOnly = lines.some((l) => l.pickupOnly);

  useEffect(() => {
    fetchShipping()
      .then((s) => setMethods(s.methods.filter((m) => m.active)))
      .catch(() => setMethods([]));
  }, []);

  const usable = useMemo(
    () => (methods ?? []).filter((m) => !(hasPickupOnly && m.type === 'spedizione')),
    [methods, hasPickupOnly]
  );

  useEffect(() => {
    if (!usable.find((m) => m.id === methodId)) setMethodId(usable[0]?.id ?? '');
  }, [usable, methodId]);

  const method = usable.find((m) => m.id === methodId);
  const shipping = method ? shippingCostFor(method, subtotal) : 0;
  const isShipping = method?.type === 'spedizione';

  if (lines.length === 0) return <Navigate to="/carrello" replace />;

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setC((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!method) return setError('Scegli un metodo di consegna.');
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
          shippingMethodId: method.id,
          customer: c,
          invoice: wantInvoice
            ? { ...inv, indirizzo: inv.indirizzo.trim() || (isShipping ? `${c.indirizzo}, ${c.cap} ${c.citta} (${c.provincia})` : '') }
            : null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || 'Impossibile avviare il pagamento. Riprova.');
      window.location.href = data.url; // pagina di pagamento sicura Stripe
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore imprevisto.');
      setSending(false);
    }
  };

  const input = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const label = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <>
      <Helmet>
        <title>Completa l'ordine | L'angolo del verde</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeader title="Completa l'ordine" />

      <form onSubmit={submit} className="container mx-auto px-4 py-10 md:py-16 max-w-6xl grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Consegna</h2>
            {methods === null ? (
              <p className="text-gray-500">Caricamento…</p>
            ) : usable.length === 0 ? (
              <p className="text-red-600">
                Nessun metodo di consegna disponibile al momento. Contattaci al 320 665 8669.
              </p>
            ) : (
              <div className="space-y-3">
                {hasPickupOnly && (
                  <p className="text-sm bg-amber-50 border border-amber-200 text-amber-900 rounded p-3">
                    Nel carrello c'è almeno un prodotto disponibile solo con ritiro in negozio.
                  </p>
                )}
                {usable.map((m) => {
                  const cost = shippingCostFor(m, subtotal);
                  return (
                    <label
                      key={m.id}
                      className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer ${
                        m.id === methodId ? 'border-primary-600 ring-1 ring-primary-600 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      <input type="radio" name="shipping" checked={m.id === methodId} onChange={() => setMethodId(m.id)} className="mt-1" />
                      <span className="flex-grow">
                        <span className="font-medium block">{m.name}</span>
                        {m.description && <span className="text-sm text-gray-600 block">{m.description}</span>}
                        {m.freeAbove ? (
                          <span className="text-xs text-primary-700 block">Gratis per ordini da {euro(m.freeAbove)}</span>
                        ) : null}
                      </span>
                      <span className="font-semibold whitespace-nowrap">{cost === 0 ? 'Gratis' : euro(cost)}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. I tuoi dati</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label}>Nome *</label>
                <input required autoComplete="given-name" className={input} value={c.nome} onChange={set('nome')} />
              </div>
              <div>
                <label className={label}>Cognome *</label>
                <input required autoComplete="family-name" className={input} value={c.cognome} onChange={set('cognome')} />
              </div>
              <div>
                <label className={label}>Email *</label>
                <input required type="email" autoComplete="email" className={input} value={c.email} onChange={set('email')} />
              </div>
              <div>
                <label className={label}>Telefono *</label>
                <input required type="tel" autoComplete="tel" className={input} value={c.telefono} onChange={set('telefono')} />
              </div>
            </div>
          </section>

          {isShipping && (
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Indirizzo di spedizione</h2>
              <div className="grid sm:grid-cols-6 gap-4">
                <div className="sm:col-span-6">
                  <label className={label}>Indirizzo e numero civico *</label>
                  <input required autoComplete="street-address" className={input} value={c.indirizzo} onChange={set('indirizzo')} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>CAP *</label>
                  <input required inputMode="numeric" pattern="[0-9]{5}" title="5 cifre" autoComplete="postal-code" className={input} value={c.cap} onChange={set('cap')} />
                </div>
                <div className="sm:col-span-3">
                  <label className={label}>Città *</label>
                  <input required autoComplete="address-level2" className={input} value={c.citta} onChange={set('citta')} />
                </div>
                <div className="sm:col-span-1">
                  <label className={label}>Prov. *</label>
                  <input required maxLength={2} pattern="[A-Za-z]{2}" title="Sigla di 2 lettere" className={`${input} uppercase`} value={c.provincia} onChange={set('provincia')} />
                </div>
              </div>
            </section>
          )}

          <section>
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <input type="checkbox" checked={wantInvoice} onChange={(e) => setWantInvoice(e.target.checked)} />
              Voglio la fattura
            </label>
            {wantInvoice && (
              <div className="mt-4 space-y-4 border rounded-lg p-4 bg-gray-50">
                <div className="flex gap-6 text-sm">
                  {(['privato', 'azienda'] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={inv.tipo === t} onChange={() => setInv({ ...inv, tipo: t })} />
                      {t === 'privato' ? 'Privato' : 'Azienda / libero professionista'}
                    </label>
                  ))}
                </div>
                {inv.tipo === 'privato' ? (
                  <div>
                    <label className={label}>Codice fiscale *</label>
                    <input required maxLength={16} pattern="[A-Za-z0-9]{16}" title="16 caratteri" className={`${input} uppercase`} value={inv.codiceFiscale} onChange={(e) => setInv({ ...inv, codiceFiscale: e.target.value })} />
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={label}>Ragione sociale *</label>
                      <input required className={input} value={inv.ragioneSociale} onChange={(e) => setInv({ ...inv, ragioneSociale: e.target.value })} />
                    </div>
                    <div>
                      <label className={label}>Partita IVA *</label>
                      <input required inputMode="numeric" pattern="(IT)?[0-9]{11}" title="11 cifre" className={input} value={inv.partitaIva} onChange={(e) => setInv({ ...inv, partitaIva: e.target.value })} />
                    </div>
                    <div>
                      <label className={label}>Codice fiscale (se diverso)</label>
                      <input maxLength={16} className={`${input} uppercase`} value={inv.codiceFiscale} onChange={(e) => setInv({ ...inv, codiceFiscale: e.target.value })} />
                    </div>
                    <div>
                      <label className={label}>Codice destinatario SDI</label>
                      <input maxLength={7} className={`${input} uppercase`} value={inv.codiceDestinatario} onChange={(e) => setInv({ ...inv, codiceDestinatario: e.target.value })} placeholder="7 caratteri" />
                    </div>
                    <div>
                      <label className={label}>oppure PEC</label>
                      <input type="email" className={input} value={inv.pec} onChange={(e) => setInv({ ...inv, pec: e.target.value })} />
                    </div>
                  </div>
                )}
                <div>
                  <label className={label}>Indirizzo di fatturazione{isShipping ? ' (vuoto = uguale alla spedizione)' : ' *'}</label>
                  <input required={!isShipping} className={input} value={inv.indirizzo} onChange={(e) => setInv({ ...inv, indirizzo: e.target.value })} placeholder="Via, numero, CAP, città, provincia" />
                </div>
                <p className="text-xs text-gray-500">La fattura elettronica ti arriverà tramite il Sistema di Interscambio dell'Agenzia delle Entrate.</p>
              </div>
            )}
          </section>

          <section>
            <label className={label}>Note per l'ordine (facoltative)</label>
            <textarea rows={3} className={input} value={c.note} onChange={set('note')} placeholder="Es. orari di consegna, citofono…" />
          </section>
        </div>

        <aside className="border rounded-lg p-6 h-fit bg-gray-50 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold mb-4">Il tuo ordine</h2>
          <ul className="space-y-2 text-sm mb-4">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3">
                <span className="text-gray-700">
                  {l.qty} × {l.name}
                </span>
                <span className="whitespace-nowrap">{euro(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotale</span>
              <span>{euro(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Consegna</span>
              <span>{method ? (shipping === 0 ? 'Gratis' : euro(shipping)) : '—'}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Totale</span>
              <span>{euro(subtotal + shipping)}</span>
            </div>
            <p className="text-xs text-gray-500">IVA inclusa</p>
          </div>

          <label className="flex items-start gap-2 text-sm mt-6">
            <input type="checkbox" required checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1" />
            <span>
              Ho letto e accetto le{' '}
              <Link to="/condizioni-di-vendita" target="_blank" className="underline">
                condizioni di vendita
              </Link>{' '}
              e l'{' '}
              <Link to="/privacy-policy" target="_blank" className="underline">
                informativa privacy
              </Link>
              .
            </span>
          </label>

          <p className="text-xs text-gray-500 mt-3">
            Hai 14 giorni dalla consegna per recedere dall'acquisto. Vedi{' '}
            <Link to="/recesso" target="_blank" className="underline">
              diritto di recesso
            </Link>
            .
          </p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={sending || !method}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-60"
          >
            <CreditCard className="h-5 w-5" />
            {sending ? 'Apro il pagamento…' : `Ordina con obbligo di pagamento · ${euro(subtotal + shipping)}`}
          </button>
          <p className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
            <Lock className="h-3.5 w-3.5" /> Pagamento sicuro gestito da Stripe
          </p>
        </aside>
      </form>
    </>
  );
};

export default CheckoutPage;

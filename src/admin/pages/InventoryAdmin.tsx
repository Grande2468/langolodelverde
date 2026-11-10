import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Search, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, ClipboardCheck } from 'lucide-react';
import { listMovements, listProducts, moveStock, type StockMoveInput } from '../api';
import { Btn, Card, ErrorBox, Field, PageTitle, Spinner, errMsg, inputCls } from '../components/ui';
import { dateTime } from '../../lib/format';
import { LOCATION_LABELS, MOVEMENT_LABELS, type Movement, type Product, type StockLocation } from '../../lib/types';

const TYPES: { id: StockMoveInput['type']; label: string; icon: typeof ArrowDownToLine; help: string }[] = [
  { id: 'carico', label: 'Carico', icon: ArrowDownToLine, help: 'Merce arrivata (es. dal fornitore)' },
  { id: 'scarico', label: 'Scarico', icon: ArrowUpFromLine, help: 'Merce uscita (es. venduta in negozio, rotta)' },
  { id: 'trasferimento', label: 'Trasferisci', icon: ArrowLeftRight, help: 'Sposta pezzi tra negozio e online' },
  { id: 'rettifica', label: 'Inventario', icon: ClipboardCheck, help: 'Imposta il numero esatto di pezzi contati' },
];

const csv = (rows: (string | number)[][]) =>
  rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');

const download = (name: string, content: string) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8' }));
  a.download = name;
  a.click();
};

const InventoryAdmin = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<string>(params.get('prodotto') ?? '');
  const [type, setType] = useState<StockMoveInput['type']>('carico');
  const [location, setLocation] = useState<StockLocation>('negozio');
  const [qty, setQty] = useState('1');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const load = async () => {
    try {
      const [p, m] = await Promise.all([listProducts(), listMovements(selected || undefined)]);
      setProducts(p);
      setMovements(m);
    } catch (e) {
      setError(errMsg(e));
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (products ?? []).filter((p) => !s || `${p.name} ${p.sku ?? ''} ${p.brand ?? ''}`.toLowerCase().includes(s));
  }, [products, q]);

  const product = products?.find((p) => p.id === selected);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setBusy(true);
    setError(null);
    setDone(null);
    try {
      await moveStock({ productId: product.id, type, location, qty: parseInt(qty, 10), note: note.trim() });
      setDone('Movimento registrato.');
      setQty('1');
      setNote('');
      await load();
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  const exportStock = () =>
    download(
      `giacenze-${new Date().toISOString().slice(0, 10)}.csv`,
      csv([
        ['Prodotto', 'Codice', 'Online', 'Negozio', 'Totale'],
        ...(products ?? []).map((p) => [p.name, p.sku ?? '', p.stock?.online ?? 0, p.stock?.negozio ?? 0, (p.stock?.online ?? 0) + (p.stock?.negozio ?? 0)]),
      ])
    );

  const exportMoves = () =>
    download(
      `movimenti-${new Date().toISOString().slice(0, 10)}.csv`,
      csv([
        ['Data', 'Prodotto', 'Magazzino', 'Tipo', 'Quantità', 'Giacenza dopo', 'Nota', 'Utente'],
        ...movements.map((m) => [dateTime(m.createdAt), m.productName, LOCATION_LABELS[m.location], MOVEMENT_LABELS[m.type], m.qty, m.stockAfter, m.note ?? '', m.by ?? '']),
      ])
    );

  if (!products) return error ? <ErrorBox error={error} /> : <Spinner />;

  const qtyLabel = type === 'rettifica' ? 'Pezzi contati' : 'Quantità';
  const locLabel = type === 'trasferimento' ? 'Da' : 'Magazzino';

  return (
    <>
      <PageTitle title="Magazzino">
        <Btn variant="secondary" onClick={exportStock}>
          <Download className="h-4 w-4" /> Giacenze CSV
        </Btn>
      </PageTitle>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 overflow-hidden">
          <div className="p-3 border-b">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input className={`${inputCls} pl-9`} placeholder="Cerca prodotto" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left text-gray-500">
                  <th className="px-3 py-2 font-medium">Prodotto</th>
                  <th className="px-3 py-2 font-medium text-right">Online</th>
                  <th className="px-3 py-2 font-medium text-right">Negozio</th>
                  <th className="px-3 py-2 font-medium text-right">Totale</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p) => {
                  const on = p.stock?.online ?? 0;
                  const sh = p.stock?.negozio ?? 0;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`cursor-pointer ${selected === p.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-3 py-2">
                        <span className="font-medium">{p.name}</span>
                        {p.sku && <span className="text-xs text-gray-400"> · {p.sku}</span>}
                      </td>
                      <td className={`px-3 py-2 text-right font-semibold ${on <= 0 ? 'text-red-600' : on <= 2 ? 'text-amber-600' : ''}`}>{on}</td>
                      <td className="px-3 py-2 text-right">{sh}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{on + sh}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-gray-500">
                      Nessun prodotto.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5 h-fit">
          {!product ? (
            <p className="text-sm text-gray-500">Seleziona un prodotto dalla lista per registrare un movimento.</p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Online <strong>{product.stock?.online ?? 0}</strong> · Negozio <strong>{product.stock?.negozio ?? 0}</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
                      type === t.id ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <t.icon className="h-4 w-4" /> {t.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">{TYPES.find((t) => t.id === type)?.help}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label={locLabel}>
                  <select className={inputCls} value={location} onChange={(e) => setLocation(e.target.value as StockLocation)}>
                    <option value="negozio">Negozio</option>
                    <option value="online">Online</option>
                  </select>
                </Field>
                <Field label={qtyLabel}>
                  <input type="number" min={type === 'rettifica' ? 0 : 1} required className={inputCls} value={qty} onChange={(e) => setQty(e.target.value)} />
                </Field>
              </div>
              {type === 'trasferimento' && (
                <p className="text-xs text-gray-600">→ verso {location === 'online' ? 'Negozio' : 'Online'}</p>
              )}
              <Field label="Nota">
                <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Es. fattura fornitore n. 123" />
              </Field>
              <ErrorBox error={error} />
              {done && <p className="text-sm text-primary-700">{done}</p>}
              <Btn type="submit" disabled={busy} className="w-full">
                {busy ? 'Registro…' : 'Registra movimento'}
              </Btn>
            </form>
          )}
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-5 pb-3">
          <h2 className="font-semibold">
            Movimenti {product ? `— ${product.name}` : 'recenti'}
            {product && (
              <button onClick={() => setSelected('')} className="ml-2 text-xs text-primary-700 underline font-normal">
                mostra tutti
              </button>
            )}
          </h2>
          <Btn variant="ghost" onClick={exportMoves}>
            <Download className="h-4 w-4" /> CSV
          </Btn>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-2 font-medium">Data</th>
                {!product && <th className="px-4 py-2 font-medium">Prodotto</th>}
                <th className="px-4 py-2 font-medium">Tipo</th>
                <th className="px-4 py-2 font-medium">Magazzino</th>
                <th className="px-4 py-2 font-medium text-right">Qtà</th>
                <th className="px-4 py-2 font-medium text-right">Dopo</th>
                <th className="px-4 py-2 font-medium">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {movements.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-500">{dateTime(m.createdAt)}</td>
                  {!product && <td className="px-4 py-2">{m.productName}</td>}
                  <td className="px-4 py-2">{MOVEMENT_LABELS[m.type]}</td>
                  <td className="px-4 py-2">{LOCATION_LABELS[m.location]}</td>
                  <td className={`px-4 py-2 text-right font-semibold ${m.qty < 0 ? 'text-red-600' : 'text-primary-700'}`}>
                    {m.qty > 0 ? `+${m.qty}` : m.qty}
                  </td>
                  <td className="px-4 py-2 text-right">{m.stockAfter}</td>
                  <td className="px-4 py-2 text-gray-600">{m.note}</td>
                </tr>
              ))}
              {movements.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Nessun movimento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default InventoryAdmin;

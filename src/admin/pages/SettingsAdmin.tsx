import { useEffect, useState } from 'react';
import { Plus, Trash2, RefreshCw, Truck, Store } from 'lucide-react';
import { getCatalog, getShipping, rebuildCatalog, saveCategories, saveShipping } from '../api';
import { Btn, Card, ErrorBox, Field, PageTitle, Spinner, errMsg, inputCls } from '../components/ui';
import ImageUploader from '../components/ImageUploader';
import { centsToInput, parseEuro, randomSuffix, slugify } from '../../lib/format';
import type { CatalogDoc, Category, ShippingMethod, ShippingType } from '../../lib/types';

interface MethodRow extends Omit<ShippingMethod, 'price' | 'freeAbove'> {
  price: string;
  freeAbove: string;
}

const toRow = (m: ShippingMethod): MethodRow => ({ ...m, price: centsToInput(m.price), freeAbove: centsToInput(m.freeAbove) });

const DEFAULT_METHODS: ShippingMethod[] = [
  { id: 'corriere', name: 'Spedizione con corriere', description: 'Consegna in 2–4 giorni lavorativi', type: 'spedizione', price: 990, freeAbove: 15000, active: true },
  { id: 'ritiro', name: 'Ritiro in negozio', description: 'Gratis — ti avvisiamo quando è pronto', type: 'ritiro', price: 0, freeAbove: null, active: true },
];

const SettingsAdmin = () => {
  const [rows, setRows] = useState<MethodRow[] | null>(null);
  const [catalog, setCatalog] = useState<CatalogDoc | null>(null);
  const [cats, setCats] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([getShipping(), getCatalog()])
      .then(([s, c]) => {
        setRows((s.methods.length ? s.methods : DEFAULT_METHODS).map(toRow));
        setCatalog(c);
        setCats(c.categories);
      })
      .catch((e) => setError(errMsg(e)));
  }, []);

  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 2500);
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const saveMethods = () =>
    run(async () => {
      const methods: ShippingMethod[] = [];
      for (const r of rows ?? []) {
        if (!r.name.trim()) throw new Error('Ogni metodo deve avere un nome');
        const price = r.type === 'ritiro' && !r.price.trim() ? 0 : parseEuro(r.price);
        if (price == null) throw new Error(`Prezzo non valido per "${r.name}"`);
        const freeAbove = r.freeAbove.trim() ? parseEuro(r.freeAbove) : null;
        if (r.freeAbove.trim() && freeAbove == null) throw new Error(`"Gratis sopra" non valido per "${r.name}"`);
        methods.push({ id: r.id, name: r.name.trim(), description: (r.description ?? '').trim(), type: r.type, price, freeAbove, active: r.active });
      }
      if (!methods.some((m) => m.active)) throw new Error('Serve almeno un metodo attivo');
      await saveShipping({ methods });
      flash('Spedizioni salvate.');
    });

  const saveCats = () =>
    run(async () => {
      if (cats.some((c) => !c.name.trim())) throw new Error('Ogni categoria deve avere un nome');
      await saveCategories(cats.map((c) => ({ id: c.id, name: c.name.trim(), description: (c.description ?? '').trim(), imageId: c.imageId ?? '' })));
      flash('Categorie salvate.');
    });

  const repair = () =>
    run(async () => {
      const n = await rebuildCatalog();
      flash(`Catalogo ricostruito: ${n} prodotti visibili.`);
    });

  const setRow = (i: number, patch: Partial<MethodRow>) => setRows((r) => r!.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const setCat = (i: number, patch: Partial<Category>) => setCats((c) => c.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const productsIn = (id: string) => catalog?.items.filter((p) => p.categoryId === id).length ?? 0;

  if (!rows) return error ? <ErrorBox error={error} /> : <Spinner />;

  return (
    <div className="max-w-4xl space-y-8">
      <PageTitle title="Impostazioni" />
      <ErrorBox error={error} />
      {msg && <div className="rounded-lg bg-primary-50 border border-primary-200 text-primary-800 text-sm p-3">{msg}</div>}

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Metodi di consegna</h2>
        <p className="text-sm text-gray-500 mb-4">Il cliente sceglie tra quelli attivi al momento dell'ordine. I prezzi sono IVA inclusa.</p>
        <div className="space-y-4">
          {rows.map((r, i) => (
            <div key={r.id} className={`border rounded-lg p-4 space-y-3 ${r.active ? '' : 'opacity-60'}`}>
              <div className="flex flex-wrap items-center gap-3">
                {r.type === 'ritiro' ? <Store className="h-5 w-5 text-gray-500" /> : <Truck className="h-5 w-5 text-gray-500" />}
                <input className={`${inputCls} flex-grow min-w-[12rem]`} value={r.name} onChange={(e) => setRow(i, { name: e.target.value })} placeholder="Nome (es. Corriere espresso)" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={r.active} onChange={(e) => setRow(i, { active: e.target.checked })} /> Attivo
                </label>
                <button onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-600" aria-label="Elimina metodo">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Tipo">
                  <select className={inputCls} value={r.type} onChange={(e) => setRow(i, { type: e.target.value as ShippingType })}>
                    <option value="spedizione">Spedizione a domicilio</option>
                    <option value="ritiro">Ritiro in negozio</option>
                  </select>
                </Field>
                <Field label="Costo €">
                  <input inputMode="decimal" className={inputCls} value={r.price} onChange={(e) => setRow(i, { price: e.target.value })} placeholder="0,00" />
                </Field>
                <Field label="Gratis da € (facoltativo)">
                  <input inputMode="decimal" className={inputCls} value={r.freeAbove} onChange={(e) => setRow(i, { freeAbove: e.target.value })} placeholder="es. 150" />
                </Field>
              </div>
              <Field label="Descrizione per il cliente">
                <input className={inputCls} value={r.description ?? ''} onChange={(e) => setRow(i, { description: e.target.value })} placeholder="es. Consegna in 2–4 giorni lavorativi" />
              </Field>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 mt-4">
          <Btn
            variant="secondary"
            onClick={() => setRows([...rows, { id: `metodo-${randomSuffix()}`, name: '', description: '', type: 'spedizione', price: '', freeAbove: '', active: true }])}
          >
            <Plus className="h-4 w-4" /> Aggiungi metodo
          </Btn>
          <Btn onClick={saveMethods} disabled={busy}>
            Salva spedizioni
          </Btn>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Categorie</h2>
        <p className="text-sm text-gray-500 mb-4">Compaiono in home page e come filtri nel negozio.</p>
        <div className="space-y-4">
          {cats.map((c, i) => (
            <div key={c.id} className="border rounded-lg p-4 grid sm:grid-cols-[140px_1fr] gap-4">
              <ImageUploader images={c.imageId ? [c.imageId] : []} onChange={(imgs) => setCat(i, { imageId: imgs[imgs.length - 1] ?? '' })} max={1} />
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input className={inputCls} value={c.name} onChange={(e) => setCat(i, { name: e.target.value })} placeholder="Nome categoria" />
                  <button
                    onClick={() => {
                      const n = productsIn(c.id);
                      if (n > 0) return setError(`"${c.name}" contiene ${n} prodotti visibili: spostali prima di eliminarla.`);
                      setCats(cats.filter((_, j) => j !== i));
                    }}
                    className="text-gray-400 hover:text-red-600 px-2"
                    aria-label="Elimina categoria"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <input className={inputCls} value={c.description ?? ''} onChange={(e) => setCat(i, { description: e.target.value })} placeholder="Descrizione breve" />
                <p className="text-xs text-gray-400">{productsIn(c.id)} prodotti visibili</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 mt-4">
          <Btn
            variant="secondary"
            onClick={() => {
              const name = prompt('Nome della nuova categoria');
              if (name?.trim()) setCats([...cats, { id: `${slugify(name)}-${randomSuffix()}`, name: name.trim(), description: '', imageId: '' }]);
            }}
          >
            <Plus className="h-4 w-4" /> Aggiungi categoria
          </Btn>
          <Btn onClick={saveCats} disabled={busy}>
            Salva categorie
          </Btn>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold mb-1">Manutenzione</h2>
        <p className="text-sm text-gray-500 mb-4">
          Se un prodotto non compare correttamente sul sito, ricostruisci il catalogo pubblico dai dati dei prodotti.
        </p>
        <Btn variant="secondary" onClick={repair} disabled={busy}>
          <RefreshCw className="h-4 w-4" /> Ricostruisci catalogo
        </Btn>
      </Card>
    </div>
  );
};

export default SettingsAdmin;

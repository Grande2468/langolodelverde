import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { deleteProduct, getCatalog, getProduct, saveProduct, type ProductInput } from '../api';
import { destroyImage } from '../imageUpload';
import { ADMIN_BASE } from '../base';
import ImageUploader from '../components/ImageUploader';
import { Btn, Card, ErrorBox, Field, PageTitle, Spinner, errMsg, inputCls } from '../components/ui';
import { centsToInput, parseEuro } from '../../lib/format';
import type { Category, Product } from '../../lib/types';

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [existing, setExisting] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [shortDescription, setShort] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [pickupOnly, setPickupOnly] = useState(false);
  const [stockOnline, setStockOnline] = useState('1');
  const [stockShop, setStockShop] = useState('0');

  useEffect(() => {
    getCatalog()
      .then((c) => {
        setCategories(c.categories);
        if (isNew) setCategoryId((v) => v || c.categories[0]?.id || '');
      })
      .catch((e) => setError(errMsg(e)));
    if (!id) return;
    getProduct(id)
      .then((p) => {
        if (!p) return setError('Prodotto non trovato');
        setExisting(p);
        setName(p.name);
        setCategoryId(p.categoryId);
        setBrand(p.brand ?? '');
        setSku(p.sku ?? '');
        setPrice(centsToInput(p.price));
        setComparePrice(centsToInput(p.comparePrice));
        setShort(p.shortDescription ?? '');
        setDescription(p.description ?? '');
        setImages(p.images ?? []);
        setVisible(p.visible);
        setFeatured(p.featured);
        setPickupOnly(p.pickupOnly);
      })
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const priceCents = parseEuro(price);
    if (!priceCents) return setError('Inserisci un prezzo valido (es. 290 oppure 1.450,00).');
    const compareCents = comparePrice.trim() ? parseEuro(comparePrice) : null;
    if (comparePrice.trim() && compareCents == null) return setError('Prezzo barrato non valido.');
    if (!categoryId) return setError('Scegli una categoria.');

    const input: ProductInput = {
      name: name.trim(),
      categoryId,
      brand: brand.trim(),
      sku: sku.trim(),
      price: priceCents,
      comparePrice: compareCents && compareCents > priceCents ? compareCents : null,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      images,
      visible,
      featured,
      pickupOnly,
    };
    setSaving(true);
    try {
      const initial = isNew
        ? { online: Math.max(0, parseInt(stockOnline, 10) || 0), negozio: Math.max(0, parseInt(stockShop, 10) || 0) }
        : undefined;
      await saveProduct(input, id, initial);
      // foto tolte da un prodotto esistente: le elimino da Cloudinary
      if (existing) existing.images.filter((img) => !images.includes(img)).forEach(destroyImage);
      navigate(`${ADMIN_BASE}/prodotti`);
    } catch (err) {
      setError(errMsg(err));
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!existing || !confirm(`Eliminare definitivamente "${existing.name}"? Le sue foto verranno cancellate.`)) return;
    setSaving(true);
    try {
      await deleteProduct(existing.id);
      existing.images.forEach(destroyImage);
      navigate(`${ADMIN_BASE}/prodotti`);
    } catch (err) {
      setError(errMsg(err));
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  const check = (label: string, value: boolean, set: (v: boolean) => void, hint: string) => (
    <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
      <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} className="mt-1 h-4 w-4" />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-gray-500">{hint}</span>
      </span>
    </label>
  );

  return (
    <form onSubmit={submit} className="max-w-4xl">
      <Link to={`${ADMIN_BASE}/prodotti`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
        <ArrowLeft className="h-4 w-4" /> Prodotti
      </Link>
      <PageTitle title={isNew ? 'Nuovo prodotto' : 'Modifica prodotto'}>
        {!isNew && existing && (
          <a href={`/prodotti/${existing.id}`} target="_blank" rel="noopener">
            <Btn type="button" variant="secondary">
              Vedi sul sito
            </Btn>
          </a>
        )}
      </PageTitle>

      <div className="space-y-6">
        <ErrorBox error={error} />

        <Card className="p-5">
          <h2 className="font-semibold mb-4">Foto</h2>
          <ImageUploader images={images} onChange={setImages} />
        </Card>

        <Card className="p-5 space-y-4">
          <h2 className="font-semibold">Dati del prodotto</h2>
          <Field label="Nome *">
            <input required className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Es. Motozappa 4 HP" />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Categoria *">
              <select required className={inputCls} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Marca">
              <input className={inputCls} value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Field>
            <Field label="Codice articolo">
              <input className={inputCls} value={sku} onChange={(e) => setSku(e.target.value)} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Prezzo € (IVA inclusa) *">
              <input required inputMode="decimal" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="290,00" />
            </Field>
            <Field label="Prezzo barrato €" hint="Facoltativo: il prezzo pieno, se il prodotto è in offerta">
              <input inputMode="decimal" className={inputCls} value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} />
            </Field>
          </div>
          <Field label="Descrizione breve" hint="Una o due righe, compare nella lista prodotti">
            <textarea rows={2} maxLength={300} className={inputCls} value={shortDescription} onChange={(e) => setShort(e.target.value)} />
          </Field>
          <Field label="Descrizione completa" hint="Caratteristiche tecniche, dimensioni, ecc. Vai a capo per nuove righe.">
            <textarea rows={8} className={inputCls} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </Card>

        <Card className="p-5 space-y-3">
          <h2 className="font-semibold mb-1">Vendita</h2>
          {check('Visibile sul sito', visible, setVisible, 'Se disattivato il prodotto resta in magazzino ma non compare nel negozio')}
          {check('In evidenza in home page', featured, setFeatured, 'Compare nella sezione "Prodotti in evidenza"')}
          {check('Solo ritiro in negozio', pickupOnly, setPickupOnly, 'Per prodotti ingombranti: il cliente non potrà sceglierne la spedizione')}
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-3">Giacenza</h2>
          {isNew ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Pezzi disponibili ONLINE" hint="Vendibili sul sito">
                <input type="number" min={0} className={inputCls} value={stockOnline} onChange={(e) => setStockOnline(e.target.value)} />
              </Field>
              <Field label="Pezzi in NEGOZIO" hint="Magazzino separato del negozio fisico">
                <input type="number" min={0} className={inputCls} value={stockShop} onChange={(e) => setStockShop(e.target.value)} />
              </Field>
            </div>
          ) : (
            <p className="text-sm text-gray-700">
              Online: <strong>{existing?.stock?.online ?? 0}</strong> · Negozio: <strong>{existing?.stock?.negozio ?? 0}</strong>{' '}
              — per carichi, scarichi e trasferimenti usa il{' '}
              <Link to={`${ADMIN_BASE}/magazzino?prodotto=${existing?.id}`} className="text-primary-700 underline">
                Magazzino
              </Link>
              .
            </p>
          )}
        </Card>

        <div className="flex flex-wrap justify-between gap-3 sticky bottom-0 bg-gray-50/95 py-4">
          {!isNew ? (
            <Btn type="button" variant="danger" onClick={remove} disabled={saving}>
              <Trash2 className="h-4 w-4" /> Elimina
            </Btn>
          ) : (
            <span />
          )}
          <Btn type="submit" disabled={saving} className="px-8">
            {saving ? 'Salvataggio…' : 'Salva prodotto'}
          </Btn>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

import { FormEvent, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LayoutDashboard, Package, ShoppingBag, Warehouse, Settings, LogOut, ExternalLink } from 'lucide-react';
import { useAuthUser, isAdminUser, login, logout } from './auth';
import { ADMIN_BASE } from './base';
import { Btn, ErrorBox, Field, Spinner, inputCls } from './components/ui';
import Dashboard from './pages/Dashboard';
import ProductsAdmin from './pages/ProductsAdmin';
import ProductForm from './pages/ProductForm';
import OrdersAdmin from './pages/OrdersAdmin';
import OrderDetail from './pages/OrderDetail';
import InventoryAdmin from './pages/InventoryAdmin';
import SettingsAdmin from './pages/SettingsAdmin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
    } catch {
      setError('Email o password non corretti.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-4">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-display font-bold text-primary-800">L'angolo del verde</h1>
          <p className="text-sm text-gray-500">Area di gestione</p>
        </div>
        <Field label="Email">
          <input type="email" autoComplete="username" required className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <input type="password" autoComplete="current-password" required className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <ErrorBox error={error} />
        <Btn type="submit" disabled={busy} className="w-full py-2.5">
          {busy ? 'Accesso…' : 'Accedi'}
        </Btn>
      </form>
    </div>
  );
};

const NAV = [
  { to: '', label: 'Riepilogo', icon: LayoutDashboard, end: true },
  { to: 'ordini', label: 'Ordini', icon: ShoppingBag },
  { to: 'prodotti', label: 'Prodotti', icon: Package },
  { to: 'magazzino', label: 'Magazzino', icon: Warehouse },
  { to: 'impostazioni', label: 'Impostazioni', icon: Settings },
];

const AdminApp = () => {
  const { user, ready } = useAuthUser();

  const head = (
    <Helmet>
      <title>Gestione | L'angolo del verde</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (!ready) return <Spinner />;
  if (!user) return (<>{head}<Login /></>);
  if (!isAdminUser(user)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        {head}
        <p>Questo account non è autorizzato.</p>
        <Btn onClick={logout}>Esci</Btn>
      </div>
    );
  }

  const link = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
      isActive ? 'bg-primary-700 text-white' : 'text-primary-100 hover:bg-primary-800'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {head}
      <aside className="bg-primary-900 md:w-60 md:min-h-screen md:sticky md:top-0 md:h-screen flex md:flex-col">
        <div className="hidden md:block px-5 py-6">
          <p className="font-display text-lg font-bold text-white">L'angolo del verde</p>
          <p className="text-xs text-primary-300 truncate">{user.email}</p>
        </div>
        <nav className="flex md:flex-col gap-1 px-2 py-2 md:px-3 overflow-x-auto flex-grow">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={label} to={`${ADMIN_BASE}/${to}`.replace(/\/$/, '')} end={end} className={link}>
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex md:flex-col gap-1 px-2 py-2 md:p-3 border-l md:border-l-0 md:border-t border-primary-800">
          <a href="/" target="_blank" rel="noopener" className={link({ isActive: false })}>
            <ExternalLink className="h-5 w-5" /> <span className="hidden md:inline">Vedi sito</span>
          </a>
          <button onClick={logout} className={link({ isActive: false })}>
            <LogOut className="h-5 w-5" /> <span className="hidden md:inline">Esci</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-8 min-w-0">
        <Routes>
          <Route path={ADMIN_BASE} element={<Dashboard />} />
          <Route path={`${ADMIN_BASE}/ordini`} element={<OrdersAdmin />} />
          <Route path={`${ADMIN_BASE}/ordini/:id`} element={<OrderDetail />} />
          <Route path={`${ADMIN_BASE}/prodotti`} element={<ProductsAdmin />} />
          <Route path={`${ADMIN_BASE}/prodotti/nuovo`} element={<ProductForm />} />
          <Route path={`${ADMIN_BASE}/prodotti/:id`} element={<ProductForm />} />
          <Route path={`${ADMIN_BASE}/magazzino`} element={<InventoryAdmin />} />
          <Route path={`${ADMIN_BASE}/impostazioni`} element={<SettingsAdmin />} />
          <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminApp;

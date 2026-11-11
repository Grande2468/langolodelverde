import { ButtonHTMLAttributes, ReactNode } from 'react';
import type { OrderStatus } from '../../lib/types';
import { ORDER_STATUS_LABELS } from '../../lib/types';

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' };
export const Btn = ({ variant = 'primary', className = '', ...props }: BtnProps) => {
  const styles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-600 hover:bg-gray-100',
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles} ${className}`}
    />
  );
};

export const inputCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white';

export const Field = ({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
    {children}
    {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
  </label>
);

const STATUS_COLORS: Record<OrderStatus, string> = {
  in_attesa_pagamento: 'bg-gray-100 text-gray-600',
  da_pagare: 'bg-orange-100 text-orange-800',
  pagato: 'bg-amber-100 text-amber-800',
  in_preparazione: 'bg-blue-100 text-blue-800',
  spedito: 'bg-indigo-100 text-indigo-800',
  pronto_ritiro: 'bg-purple-100 text-purple-800',
  completato: 'bg-primary-100 text-primary-800',
  annullato: 'bg-red-100 text-red-700',
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => (
  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_COLORS[status]}`}>
    {ORDER_STATUS_LABELS[status]}
  </span>
);

export const Spinner = () => (
  <div className="flex justify-center py-16">
    <div className="h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
  </div>
);

export const ErrorBox = ({ error }: { error: string | null }) =>
  error ? <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</div> : null;

export const PageTitle = ({ title, children }: { title: string; children?: ReactNode }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

export const errMsg = (e: unknown) => {
  const m = e instanceof Error ? e.message : String(e);
  if (/permission|insufficient/i.test(m)) return 'Permesso negato: controlla di aver pubblicato le regole di Firestore e di essere loggato come admin.';
  return m;
};

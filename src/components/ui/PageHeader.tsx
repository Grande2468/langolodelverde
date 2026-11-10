import { ReactNode } from 'react';

/** Fascia scura in alto, così la navbar trasparente resta leggibile. */
const PageHeader = ({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) => (
  <div className="pt-24 bg-primary-900 text-white">
    <div className="container mx-auto px-4 py-10 md:py-14 text-center">
      <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">{title}</h1>
      {subtitle && <p className="text-lg text-primary-100 max-w-2xl mx-auto">{subtitle}</p>}
      {children}
    </div>
  </div>
);

export default PageHeader;

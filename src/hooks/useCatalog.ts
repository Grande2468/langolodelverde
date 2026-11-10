import { useEffect, useState } from 'react';
import { EMPTY_CATALOG, fetchCatalog } from '../lib/catalog';
import type { CatalogDoc } from '../lib/types';

export const useCatalog = (fresh = false) => {
  const [catalog, setCatalog] = useState<CatalogDoc>(EMPTY_CATALOG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchCatalog(fresh)
      .then((c) => alive && setCatalog(c))
      .catch((e) => {
        console.error('Catalogo non disponibile', e);
        if (alive) setError('Non riusciamo a caricare i prodotti in questo momento. Riprova tra poco.');
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [fresh]);

  return { catalog, loading, error };
};

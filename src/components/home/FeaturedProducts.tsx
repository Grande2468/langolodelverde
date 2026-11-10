import Section, { SectionHeading } from '../ui/Section';
import Button from '../ui/Button';
import ProductCard from '../products/ProductCard';
import { useCatalog } from '../../hooks/useCatalog';

/** Prodotti segnati "in evidenza" dall'admin. Se non ce ne sono, mostra gli ultimi arrivi. */
const FeaturedProducts = () => {
  const { catalog, loading } = useCatalog();
  const available = catalog.items.filter((p) => p.stockOnline > 0);
  const featured = available.filter((p) => p.featured);
  const list = (featured.length ? featured : available).slice(0, 8);

  if (loading || list.length === 0) return null;

  return (
    <Section background="light">
      <SectionHeading
        title={featured.length ? 'Prodotti in Evidenza' : 'Ultimi Arrivi'}
        subtitle="Acquista online con pagamento sicuro: spedizione a domicilio o ritiro in negozio."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Button to="/prodotti">Vedi tutti i prodotti</Button>
      </div>
    </Section>
  );
};

export default FeaturedProducts;

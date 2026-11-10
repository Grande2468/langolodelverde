import { motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import { Link } from 'react-router-dom';
import { Tractor, Shovel, Wrench, Hammer, Leaf } from 'lucide-react';
import { useCatalog } from '../../hooks/useCatalog';
import { cld } from '../../lib/cloudinary';

const ICONS: Record<string, JSX.Element> = {
  'motocoltivatori-tosaerba': <Tractor className="h-6 w-6" />,
  'attrezzatura-giardino': <Shovel className="h-6 w-6" />,
  ricambi: <Wrench className="h-6 w-6" />,
  utensileria: <Hammer className="h-6 w-6" />,
};

const Categories = () => {
  const { catalog } = useCatalog();

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <Section background="white">
      <SectionHeading
        title="Le Nostre Categorie di Prodotti"
        subtitle="Sfoglia la nostra gamma completa di attrezzature per giardinaggio e paesaggistica di alta qualità"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {catalog.categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link to={`/prodotti#${category.id}`} className="block h-full group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all h-full hover:shadow-lg relative flex flex-col">
                <div className="h-48 overflow-hidden bg-primary-50">
                  {category.imageId && (
                    <img
                      src={cld(category.imageId, { w: 400, h: 300, crop: 'fill' })}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-3 p-3 bg-primary-50 text-primary-700 rounded-full w-fit">
                    {ICONS[category.id] ?? <Leaf className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{category.name}</h3>
                  {category.description && <p className="text-gray-600 text-sm mb-4">{category.description}</p>}
                  <span className="mt-auto text-primary-600 font-medium text-sm group-hover:underline">Vedi Prodotti</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Categories;

import { motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import { Link } from 'react-router-dom';
import { Scissors, Tractor, Shovel, Wrench, SprayCan as Spray, Wind } from 'lucide-react';

const categories = [
  {
    id: 'brush-cutters',
    name: 'Decespugliatori',
    icon: <Scissors className="h-6 w-6" />,
    description: 'Decespugliatori professionali per tutti i tipi di vegetazione',
    image: 'https://images.pexels.com/photos/91793/pexels-photo-91793.jpeg',
  },
  {
    id: 'rotary-tillers',
    name: 'Motozappe',
    icon: <Tractor className="h-6 w-6" />,
    description: 'Motozappe ad alte prestazioni per una perfetta preparazione del terreno',
    image: 'https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg',
  },
  {
    id: 'gardening-tools',
    name: 'Attrezzi da Giardinaggio',
    icon: <Shovel className="h-6 w-6" />,
    description: 'Utensili manuali essenziali per lavori di giardinaggio di precisione',
    image: 'https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg',
  },
  {
    id: 'maintenance',
    name: 'Manutenzione',
    icon: <Wrench className="h-6 w-6" />,
    description: 'Parti e accessori per mantenere le tue attrezzature funzionanti',
    image: 'https://images.pexels.com/photos/5691868/pexels-photo-5691868.jpeg',
  },
  {
    id: 'sprayers',
    name: 'Spruzzatori',
    icon: <Spray className="h-6 w-6" />,
    description: 'Spruzzatori professionali per un trattamento efficiente delle piante',
    image: 'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg',
  },
  {
    id: 'blowers',
    name: 'Soffiatori',
    icon: <Wind className="h-6 w-6" />,
    description: 'Soffiatori potenti per una rapida pulizia del giardino',
    image: 'https://images.pexels.com/photos/589/garden-gardening-grass-mow.jpg',
  },
];

const Categories = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section background="white">
      <SectionHeading 
        title="Le Nostre Categorie di Prodotti" 
        subtitle="Sfoglia la nostra gamma completa di attrezzature per giardinaggio e paesaggistica di alta qualità"
      />
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            variants={item}
          >
            <Link 
              to={`/products#${category.id}`} 
              className="block h-full group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all h-full hover:shadow-lg relative flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-3 p-3 bg-primary-50 text-primary-700 rounded-full w-fit">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <span className="mt-auto text-primary-600 font-medium text-sm group-hover:underline">
                    Vedi Prodotti
                  </span>
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
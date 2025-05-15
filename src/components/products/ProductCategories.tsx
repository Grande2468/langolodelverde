import { useState } from 'react';
import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const categories = [
  {
    id: 'brush-cutters',
    name: 'Decespugliatori',
    description: 'Attrezzature professionali per eliminare vegetazione resistente e mantenere grandi aree.',
    featuredImage: 'https://images.pexels.com/photos/91793/pexels-photo-91793.jpeg',
    products: [
      {
        id: 'bc-1',
        name: 'Decespugliatore Pro X3 Heavy-Duty',
        specs: 'Motore 52cc, doppie testine di taglio, imbracatura professionale',
        price: '€599',
        image: 'https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg'
      },
      {
        id: 'bc-2',
        name: 'Decespugliatore LightMaster 350',
        specs: 'Motore 35cc, design leggero, impugnatura comfort',
        price: '€379',
        image: 'https://images.pexels.com/photos/8471836/pexels-photo-8471836.jpeg'
      },
      {
        id: 'bc-3',
        name: 'Decespugliatore Compact XR',
        specs: 'Motore 28cc, asta pieghevole, ideale per aree più piccole',
        price: '€299',
        image: 'https://images.pexels.com/photos/91793/pexels-photo-91793.jpeg'
      }
    ]
  },
  {
    id: 'rotary-tillers',
    name: 'Motozappe',
    description: 'Macchine potenti per la preparazione del terreno, coltivazione e creazione di aiuole.',
    featuredImage: 'https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg',
    products: [
      {
        id: 'rt-1',
        name: 'Motozappa GardenMaster Pro',
        specs: 'Motore 6.5HP, larghezza di lavoro 24\", controllo profondità regolabile',
        price: '€849',
        image: 'https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg'
      },
      {
        id: 'rt-2',
        name: 'Coltivatore MiniTill 300',
        specs: 'Motore elettrico 3HP, larghezza di lavoro 16\", maniglie pieghevoli',
        price: '€429',
        image: 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg'
      },
      {
        id: 'rt-3',
        name: 'Motozappa TerraMaster a Fresa Posteriore',
        specs: 'Motore 8HP, frese controrotanti, ruote pneumatiche',
        price: '€1,199',
        image: 'https://images.pexels.com/photos/7728078/pexels-photo-7728078.jpeg'
      }
    ]
  },
  {
    id: 'lawn-mowers',
    name: 'Tosaerba',
    description: 'Tosaerba di qualità per una perfetta manutenzione del prato e risultati professionali.',
    featuredImage: 'https://images.pexels.com/photos/589/garden-gardening-grass-mow.jpg',
    products: [
      {
        id: 'lm-1',
        name: 'Tosaerba Semovente LawnKing 500',
        specs: 'Motore 5HP, larghezza di taglio 21\", capacità mulching',
        price: '€549',
        image: 'https://images.pexels.com/photos/589/garden-gardening-grass-mow.jpg'
      },
      {
        id: 'lm-2',
        name: 'Tosaerba a Batteria EcoSlice',
        specs: 'Batteria al litio 40V, larghezza di taglio 19\", funzionamento silenzioso',
        price: '€399',
        image: 'https://images.pexels.com/photos/2309235/pexels-photo-2309235.jpeg'
      },
      {
        id: 'lm-3',
        name: 'Trattorino Tosaerba ProRange',
        specs: 'Motore 18HP, piatto di taglio 42\", trasmissione idrostatica',
        price: '€2,499',
        image: 'https://images.pexels.com/photos/1592095/pexels-photo-1592095.jpeg'
      }
    ]
  },
  {
    id: 'power-tools',
    name: 'Elettroutensili',
    description: 'Elettroutensili versatili per tutte le esigenze di manutenzione del giardino.',
    featuredImage: 'https://images.pexels.com/photos/225230/pexels-photo-225230.jpeg',
    products: [
      {
        id: 'pt-1',
        name: 'Soffiatore LeafStorm Pro',
        specs: 'Motore 4HP, velocità aria 170 mph, design ergonomico',
        price: '€199',
        image: 'https://images.pexels.com/photos/225230/pexels-photo-225230.jpeg'
      },
      {
        id: 'pt-2',
        name: 'Tagliasiepi Elettrico VertEdge',
        specs: 'Motore 1200W, doppie lame 24\", impugnatura girevole',
        price: '€159',
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'
      },
      {
        id: 'pt-3',
        name: 'Motosega ChainMaster 450',
        specs: 'Motore 45cc, barra 18\", sistema antivibrazioni',
        price: '€329',
        image: 'https://images.pexels.com/photos/209276/pexels-photo-209276.jpeg'
      }
    ]
  }
];

const ProductCategories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  
  const handleTabChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Scroll to the selected category
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
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
    <Section>
      <SectionHeading 
        title="La Nostra Gamma di Prodotti" 
        subtitle="Sfoglia la nostra selezione completa di attrezzature per giardinaggio e paesaggistica di alta qualità"
      />
      
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            id={category.id}
            onClick={() => handleTabChange(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Category Content */}
      {categories.map((category) => (
        <div
          key={category.id}
          className={`mb-16 ${activeCategory === category.id ? 'block' : 'hidden'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <p className="text-gray-700 font-medium mb-4">
                I nostri {category.name.toLowerCase()} sono progettati per:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
                  <span>Paesaggisti professionisti e servizi di giardinaggio</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
                  <span>Manutenzione agricola e vigneti</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
                  <span>Proprietari di case con grandi proprietà</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
                  <span>Appassionati di giardinaggio alla ricerca di attrezzi di qualità</span>
                </li>
              </ul>
              <Button to="/contact">Richiedi Informazioni</Button>
            </div>
            
            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
              <img 
                src={category.featuredImage} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h4 className="text-xl font-semibold mb-6">{category.name} in Evidenza</h4>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {category.products.map((product) => (
              <motion.div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:shadow-lg"
                variants={item}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h5 className="font-semibold text-lg mb-2">{product.name}</h5>
                  <p className="text-gray-600 text-sm mb-3">{product.specs}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary-800">{product.price}</span>
                    <Button variant="text" to="/contact" className="text-primary-600">
                      Dettagli
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </Section>
  );
};

export default ProductCategories;
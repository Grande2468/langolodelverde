import { useState, useEffect } from 'react';
import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';
import { productCategories, allProducts, Product } from '../../data/productsData';
import ProductCard from './ProductCard';

const ProductCategoriesDisplay = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    productCategories.length > 0 ? productCategories[0].id : null
  );
  
  useEffect(() => {
    if (!activeCategoryId && productCategories.length > 0) {
      setActiveCategoryId(productCategories[0].id);
    }
  }, [productCategories, activeCategoryId]);
  
  const handleTabChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    
    // Scroll to the selected category
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const getProductsForCategory = (categoryId: string | null): Product[] => {
    if (!categoryId) return [];
    return allProducts.filter(product => product.categoryId === categoryId);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (productCategories.length === 0) {
    return (
      <Section>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Nessuna categoria di prodotti disponibile al momento.</p>
        </div>
      </Section>
    );
  }
  
  if (!activeCategoryId && productCategories.length > 0) {
      setActiveCategoryId(productCategories[0].id); 
      return <Section><div className="container mx-auto px-4 py-8 text-center">Caricamento categorie...</div></Section>; 
  }

  return (
    <Section>
      {/* Category Tabs */}
      <div className="sticky top-16 md:top-20 bg-white z-10 py-4 mb-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide justify-center">
            {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleTabChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
                  activeCategoryId === category.id
                    ? 'bg-primary-600 text-white shadow-md ring-2 ring-primary-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
            </div>
          </div>
          
      {/* Category Content & Products */}
      <div>
        {productCategories.map((category) => {
          const productsInCategory = getProductsForCategory(category.id);
          return (
            <div key={category.id} id={`category-section-${category.id}`} className="mb-16 scroll-mt-24 md:scroll-mt-32">
              <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">{category.name}</h2>
                  {category.description && <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>}
                </div>
                
                {productsInCategory.length > 0 ? (
          <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {productsInCategory.map((product) => (
                      <motion.div key={product.id} variants={item}>
                        <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
                ) : (
                  <p className="text-center text-gray-500">Nessun prodotto in questa categoria al momento.</p>
                )}
              </div>
            </div>
          );
        })}
        </div>
    </Section>
  );
};

export default ProductCategoriesDisplay;
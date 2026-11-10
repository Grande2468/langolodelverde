import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>L'angolo del verde | Attrezzi da Giardino e Paesaggistica</title>
        <meta
          name="description"
          content="Attrezzature da giardino e paesaggistica di qualità: motocoltivatori, tosaerba, ricambi e utensileria. Acquista online o vieni a trovarci in negozio."
        />
      </Helmet>

      <Hero />
      <Categories />
      <FeaturedProducts />
      <CtaSection />
    </>
  );
};

export default HomePage;

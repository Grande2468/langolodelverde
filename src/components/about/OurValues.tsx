import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';
import { Award, PenTool as Tool, Users, Truck, ThumbsUp, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Qualità',
    description: 'Selezioniamo solo le migliori attrezzature che soddisfano i nostri rigorosi standard di prestazioni e durabilità.'
  },
  {
    icon: <Tool className="h-6 w-6" />,
    title: 'Competenza',
    description: 'Il nostro team è composto da appassionati di giardinaggio con una profonda conoscenza di ogni prodotto che vendiamo.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Focus sul Cliente',
    description: 'Ascoltiamo le esigenze dei nostri clienti e forniamo raccomandazioni personalizzate per le loro situazioni specifiche.'
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Affidabilità',
    description: 'Dalla qualità del prodotto al servizio post-vendita, garantiamo affidabilità in ogni fase del percorso del cliente.'
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: 'Integrità',
    description: 'Siamo onesti sui nostri prodotti, fornendo informazioni trasparenti per aiutare i clienti a prendere decisioni informate.'
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Comunità',
    description: 'Sosteniamo attivamente le iniziative locali di giardinaggio e gli sforzi di conservazione ambientale.'
  }
];

const OurValues = () => {
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
        title="I Nostri Valori" 
        subtitle="I principi che guidano tutto ciò che facciamo in GreenPower"
      />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {values.map((value, index) => (
          <motion.div 
            key={index} 
            className="bg-primary-50 rounded-xl p-6 border border-primary-100"
            variants={item}
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-700">
                {value.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary-900">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default OurValues;
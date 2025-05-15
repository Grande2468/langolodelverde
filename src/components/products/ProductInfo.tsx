import { motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import Button from '../ui/Button';
import { Check, PenTool as Tool, Truck } from 'lucide-react';

const ProductInfo = () => {
  const services = [
    {
      icon: <Check className="h-6 w-6" />,
      title: 'Selezione di Qualità',
      description: 'Collaboriamo con produttori rinomati per offrirti solo le attrezzature di altissima qualità che soddisfano i nostri rigorosi standard di prestazioni e durabilità.'
    },
    {
      icon: <Tool className="h-6 w-6" />,
      title: 'Manutenzione Esperta',
      description: 'I nostri tecnici qualificati forniscono servizi di manutenzione e riparazione professionali per mantenere le tue attrezzature al massimo delle prestazioni per gli anni a venire.'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Consegna e Configurazione',
      description: 'Offriamo servizi di consegna per attrezzature più grandi e possiamo fornire configurazione iniziale e formazione per assicurarti di essere pronto a sfruttare al meglio i tuoi nuovi strumenti.'
    }
  ];

  return (
    <Section background="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-display font-bold mb-6">
            Attrezzature Premium per Ogni Esigenza di Giardinaggio
          </h2>
          <p className="text-gray-600 mb-6">
            In GreenPower, comprendiamo che diversi progetti di giardinaggio e paesaggistica richiedono strumenti specifici. Ecco perché offriamo una gamma completa di attrezzature adatte sia a professionisti che ad appassionati.
          </p>
          <p className="text-gray-600 mb-6">
            La nostra selezione include marchi premium noti per la loro affidabilità, prestazioni e caratteristiche innovative. Ogni prodotto nel nostro showroom è stato attentamente selezionato per garantire che soddisfi i nostri elevati standard.
          </p>
          <p className="text-gray-700 font-medium mb-6">
            Non vendiamo solo attrezzature - forniamo soluzioni per le tue esigenze specifiche:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
              <span>Raccomandazioni personalizzate in base alle tue esigenze specifiche</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
              <span>Dimostrazioni per aiutarti a selezionare l\'attrezzatura giusta</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3 flex-shrink-0">✓</span>
              <span>Supporto post-vendita e servizi di manutenzione professionali</span>
            </li>
          </ul>
          <Button to="/contact">Visita il Nostro Showroom</Button>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-lg overflow-hidden h-64 sm:h-auto">
            <img 
              src="https://images.pexels.com/photos/3004973/pexels-photo-3004973.jpeg" 
              alt="Showroom attrezzature da giardino" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg" 
                alt="Attrezzatura da giardino in uso" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/5695880/pexels-photo-5695880.jpeg" 
                alt="Manutenzione attrezzature" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <SectionHeading 
        title="I Nostri Servizi" 
        subtitle="Oltre a vendere attrezzature, forniamo servizi completi per supportare le tue esigenze di giardinaggio"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-4 p-3 bg-primary-100 text-primary-700 rounded-full w-fit">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ProductInfo;
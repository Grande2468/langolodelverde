import Section, { SectionHeading } from '../ui/Section';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Alessandro Ricci',
    role: 'Fondatore e CEO',
    bio: 'Con oltre 40 anni di esperienza nelle attrezzature da giardino, Alessandro continua a guidare la nostra azienda con la stessa passione che ha dato inizio a tutto nel 1985.',
    image: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg',
  },
  {
    name: 'Giulia Ricci',
    role: 'Direttrice Operativa',
    bio: 'Cresciuta nell\'azienda di famiglia, Giulia supervisiona tutte le operazioni, assicurando che manteniamo la qualità e il servizio che i nostri clienti si aspettano.',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
  },
  {
    name: 'Marco Belli',
    role: 'Specialista Tecnico',
    bio: 'La profonda conoscenza della meccanica delle attrezzature da giardino di Marco ci aiuta a selezionare i migliori prodotti e fornire servizi di manutenzione esperti.',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
  },
  {
    name: 'Sofia Moretti',
    role: 'Relazioni con i Clienti',
    bio: 'Con il suo background nel giardinaggio e le sue capacità relazionali, Sofia assicura che ogni cliente trovi esattamente ciò di cui ha bisogno per i suoi progetti specifici.',
    image: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg',
  },
];

const TeamSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section background="primary">
      <SectionHeading 
        title="Il Nostro Team" 
        subtitle="Le persone appassionate dietro il successo di GreenPower"
      />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary-600 text-sm mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default TeamSection;
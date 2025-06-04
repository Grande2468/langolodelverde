import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Marco Rossi",
    role: "Imprenditore Paesaggista",
    content: "Utilizziamo le attrezzature de L'angolo del verde da oltre 5 anni nella nostra attività di paesaggistica. I loro decespugliatori e motocoltivatori sono incredibilmente durevoli e affidabili, anche con un uso professionale quotidiano. Anche il servizio post-vendita è eccellente.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 2,
    name: "Sofia Bianchi",
    role: "Titolare di un Garden Center",
    content: "Come garden center, non solo vendiamo prodotti de L'angolo del verde ma li usiamo noi stessi. La qualità è costantemente alta e i nostri clienti tornano spesso per dirci quanto sono soddisfatti dei loro acquisti. Ottimo marchio con cui collaborare.",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    id: 3,
    name: "Antonio Conti",
    role: "Responsabile Vigneto",
    content: "I motocoltivatori che abbiamo acquistato da L'angolo del verde hanno migliorato notevolmente la nostra efficienza nella manutenzione del vigneto. Sono abbastanza potenti per il nostro terreno difficile ma abbastanza precisi per lavorare tra i filari. Altamente raccomandato.",
    rating: 4,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  return (
    <Section background="primary">
      <SectionHeading 
        title="Cosa Dicono i Nostri Clienti" 
        subtitle="Ascolta i professionisti che si affidano quotidianamente alle nostre attrezzature"
      />
      
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {TESTIMONIALS.map((testimonial, index) => (
            index === activeIndex && (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={`${i < testimonial.rating ? 'fill-accent-500 text-accent-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-gray-700 mb-4 italic">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white text-primary-700 hover:bg-primary-700 hover:text-white transition-colors shadow-md"
            aria-label="Testimonianza precedente"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white text-primary-700 hover:bg-primary-700 hover:text-white transition-colors shadow-md"
            aria-label="Prossima testimonianza"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicator Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? 'bg-primary-700 scale-125' : 'bg-primary-200'
              }`}
              aria-label={`Vai alla testimonianza ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
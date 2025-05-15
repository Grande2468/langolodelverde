import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'primary' | 'dark';
  withContainer?: boolean;
}

const Section = ({
  children,
  className = '',
  id,
  background = 'white',
  withContainer = true,
}: SectionProps) => {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    primary: 'bg-primary-50',
    dark: 'bg-primary-900 text-white',
  };
  
  const baseStyles = `py-16 md:py-24 ${bgClasses[background]} ${className}`;
  
  return (
    <section id={id} className={baseStyles}>
      {withContainer ? (
        <div className="container mx-auto px-4 md:px-6">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export const SectionHeading = ({ 
  title, 
  subtitle,
  centered = true,
  withAnimation = true,
}: { 
  title: string; 
  subtitle?: string;
  centered?: boolean;
  withAnimation?: boolean;
}) => {
  const alignment = centered ? 'text-center' : 'text-left';
  const content = (
    <div className={`max-w-3xl ${centered ? 'mx-auto' : 'mx-0'} mb-12 md:mb-16`}>
      <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${alignment}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-600 ${alignment}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
  
  if (!withAnimation) return content;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      {content}
    </motion.div>
  );
};

export default Section;
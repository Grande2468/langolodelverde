import { motion } from 'framer-motion';

interface FeaturedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: 'left' | 'right';
}

const FeaturedImage = ({
  src,
  alt,
  className = '',
  priority = 'left',
}: FeaturedImageProps) => {
  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, x: priority === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
  );
};

export default FeaturedImage;
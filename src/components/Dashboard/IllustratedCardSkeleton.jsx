import { motion } from 'framer-motion';
import './IllustratedCardSkeleton.css';

const IllustratedCardSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      className="illustrated-card-skeleton"
      initial={{ opacity: 0.5 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        transition: { 
          repeat: Infinity, 
          duration: 1.5,
          delay: delay 
        }
      }}
    >
      <div className="skeleton-illustration"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-value"></div>
      </div>
    </motion.div>
  );
};

export default IllustratedCardSkeleton;
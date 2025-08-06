import { motion } from 'framer-motion';

import './CardSkeleton.css';

const CardSkeleton = () => {
  return (
    <motion.div 
      className="card-skeleton"
      initial={{ opacity: 0.5 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        transition: { repeat: Infinity, duration: 1.5 }
      }}
    >
      <div className="skeleton-icon"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-value"></div>
      </div>
      <div className="skeleton-arrow"></div>
    </motion.div>
  );
};

export default CardSkeleton;
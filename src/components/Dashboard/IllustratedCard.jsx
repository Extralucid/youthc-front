import { motion, AnimatePresence } from 'framer-motion';
import './IllustratedCard.css';

const IllustratedCard = ({ 
  title, 
  value, 
  illustration, 
  color = '#4f46e5',
  onClick,
  isLoading 
}) => {
  return (
    <motion.div
      className="illustrated-card"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ '--card-color': color }}
    >
      {isLoading ? (
        <div className="card-illustration skeleton">
          <div className="loading-shimmer"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={illustration}
            className="card-illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={illustration} 
              alt={title}
              className="illustration-img"
            />
          </motion.div>
        </AnimatePresence>
      )}
      
      <div className="card-content">
        {isLoading ? (
          <>
            <div className="loading-title"></div>
            <div className="loading-value"></div>
          </>
        ) : (
          <>
            <h3>{title}</h3>
            <motion.p
              key={value}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {value}
            </motion.p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default IllustratedCard;
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './DashboardCard.css';

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = '#4f46e5',
  onClick 
}) => {
  return (
    <motion.div
      className="dashboard-card"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ '--card-color': color }}
    >
      <div className="card-icon">
        <motion.div 
          animate={{ rotate: [0, 10, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Icon size={32} />
        </motion.div>
      </div>
      
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      
      <div className="card-arrow">
        <FiArrowRight />
      </div>
    </motion.div>
  );
};

export default DashboardCard;
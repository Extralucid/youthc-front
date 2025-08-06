import { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import CardSkeleton from './CardSkeleton';
import { 
  FiUsers, 
  FiDollarSign, 
  FiActivity, 
  FiPackage 
} from 'react-icons/fi';
import './CardRow.css';
import { Navigate, useNavigate } from 'react-router-dom';

const CardRow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setCardData([
        {
          title: 'Mes Utilisateurs',
          value: '1,248',
          icon: FiUsers,
          color: '#4f46e5',
          onClick: () => navigate('/settings/users')
        },
        {
          title: 'Total Reglements ',
          value: '$34,876',
          icon: FiDollarSign,
          color: '#10b981',
          onClick: () => navigate('/reglements')
        },
        {
          title: 'Contrats échus',
          value: '24',
          icon: FiActivity,
          color: '#f59e0b',
          onClick: () => navigate('/production/polices')
        },
        {
          title: 'Vehicules non assurés',
          value: '1,892',
          icon: FiPackage,
          color: '#ef4444',
          onClick: () => navigate('/production/vehicules')
        }
      ]);
      setIsLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card-row">
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            onClick={card.onClick}
          />
        ))
      )}
    </div>
  );
};

export default CardRow;
import IllustratedCard from './IllustratedCard';
import './CarStatsRow.css';

// Using direct Undraw.co URLs (replace with your downloaded SVGs if needed)

  import cars from '../../assets/undraw_resume_jrgi.svg';
  import electric from '../../assets/undraw_payments_nbqu.svg';
  import repair from '../../assets/undraw_map-dark_g9xq.svg';
  import parking from '../../assets/undraw_organizing-data_uns9.svg';
import { useNavigate } from 'react-router-dom';


const ServicesRow = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Mes Courriers',
      value: '248',
      illustration: cars,
      color: '#3b82f6',
      onClick: () => navigate('/courriers')
    },
    {
      title: 'Mes reglements',
      value: '42',
      illustration: electric,
      color: '#10b981',
      onClick: () => navigate('/reglements')
    },
    {
      title: 'Nos Agences',
      value: '18',
      illustration: repair,
      color: '#f59e0b',
      onClick: () => navigate('/settings/agences')
    },
    {
      title: 'Mes Statistiques',
      value: '156',
      illustration: parking,
      color: '#6366f1',
      onClick: () => navigate('/settings/statistique')
    }
  ];

  return (
    <div className="car-stats-row" style={{marginBottom: '20px'}}>
      {cards.map((card, index) => (
        <IllustratedCard
          key={index}
          title={card.title}
          value={card.value}
          illustration={card.illustration}
          color={card.color}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

export default ServicesRow;
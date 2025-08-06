import IllustratedCard from './IllustratedCard';
import './CarStatsRow.css';

// Using direct Undraw.co URLs (replace with your downloaded SVGs if needed)

  import cars from '../../assets/undraw_car-repair_wski.svg';
  import electric from '../../assets/undraw_delivery-truck_mjui.svg';
  import repair from '../../assets/undraw_vintage_q09n.svg';
  import parking from '../../assets/undraw_towing_e407.svg';
import { useNavigate } from 'react-router-dom';


const CarStatsRow = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Mes Polices Mono',
      value: '248',
      illustration: cars,
      color: '#3b82f6',
      onClick: () => navigate('/production/polices')
    },
    {
      title: 'Mes Polices Flottes',
      value: '42',
      illustration: electric,
      color: '#10b981',
      onClick: () => navigate('/production/polices')
    },
    {
      title: 'Mes Vehicules',
      value: '18',
      illustration: repair,
      color: '#f59e0b',
      onClick: () => navigate('/production/vehicules')
    },
    {
      title: 'Mes Sinistres',
      value: '156',
      illustration: parking,
      color: '#6366f1',
      onClick: () => navigate('/sinistres/liste')
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

export default CarStatsRow;
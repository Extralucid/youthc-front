import React from 'react';
import CardRow from '../components/Dashboard/CardRow';
import CarStatsRow from '../components/Dashboard/CarStatsRow';
import ServicesRow from '../components/Dashboard/ServicesRow';

const Home = () => {
  return (
    <div className="dashboard" style={{marginTop: '100px'}}>
      <CardRow />
      {/* Other dashboard components */}
      <CarStatsRow />
      {/* Other dashboard components */}
      <ServicesRow />
    </div>
  );
};

export default Home;
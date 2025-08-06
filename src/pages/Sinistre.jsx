import React from 'react';
import { Outlet } from 'react-router-dom';

const Sinistre = () => {
  return (
    <div>
      <h2>Sinistre</h2>
      <Outlet />
    </div>
  );
};

export default Sinistre;
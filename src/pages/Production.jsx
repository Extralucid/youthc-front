import React from 'react';
import { Outlet } from 'react-router-dom';

const Production = () => {
  return (
    <div>
      <h2>Production</h2>
      <Outlet />
    </div>
  );
};

export default Production;
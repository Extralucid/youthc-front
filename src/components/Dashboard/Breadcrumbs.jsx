import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <span key={name}>
            <span className="separator"> / </span>
            <Link to={routeTo}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
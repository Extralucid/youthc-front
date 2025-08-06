import React from 'react';
import './styles.css';

const NavMenu = ({ items, isOpen, mobile }) => {
  return (
    <div className={`nav-menu ${isOpen ? 'open' : ''} ${mobile ? 'mobile' : ''}`}>
      {items.map((item, index) => (
        <a key={index} href={item.path} className="nav-menu-item">
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default NavMenu;
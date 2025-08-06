import React from 'react';
import './styles.css';

const SubMenu = ({ items, isOpen }) => {
  return (
    <ul className={`submenu ${isOpen ? 'open' : ''}`}>
      {items.map((item, index) => (
        <li key={index}>
          <a href={item.path}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
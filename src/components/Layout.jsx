import React from 'react';
import Navbar from './Dashboard/Navbar';
import './Dashboard/styles.css';

const Layout = ({ children, darkMode, setDarkMode }) => {
  return (
    <div className={`layout ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="content">
        {children}
      </main>
      <footer className={`footer ${darkMode ? 'dark' : ''}`}>
        <div className="footer-content">
          <p>© {new Date().getFullYear()} SANLAMALLIANZ. Tout droit réservé.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Termes de Service</a>
            <a href="/contact">Contactez-Nous</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
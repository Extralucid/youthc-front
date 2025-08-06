import React, { useState, useEffect } from 'react';
import '../components/styles.css';
import background from '../assets/background.jpg';
import logo from '../assets/logo.png';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`login-container ${darkMode ? 'dark' : ''}`}>
      {/* Left Section */}
      <div className="left-section">
        {/* <div className="overlay-text">
          <h1>Welcome Back!</h1>
          <p>Sign in to access your dashboard.</p>
        </div> */}
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <LoginForm darkMode={darkMode} />
      </div>
    </div>
  );
};

export default LoginPage;
// src/pages/components/Footer.jsx
import React from 'react';
// import '@/styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Provider Access Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

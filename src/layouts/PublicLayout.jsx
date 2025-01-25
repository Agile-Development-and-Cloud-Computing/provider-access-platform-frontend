// File: src/layouts/PublicLayout.jsx
import React from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import '@/styles/layout.css';

const PublicLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <PublicNavbar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PublicLayout;






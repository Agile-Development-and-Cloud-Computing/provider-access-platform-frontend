// File: src/layouts/UserLayout.jsx
import React from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/layout.css';

const UserLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <UserDashboardNavbar />
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

export default UserLayout;




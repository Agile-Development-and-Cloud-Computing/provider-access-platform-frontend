// File: src/layouts/UserLayout.jsx
import React from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/layout.css';

const UserLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="user-header">
        <UserDashboardNavbar />
      </header>
      <main className="user-main">
        {children}
      </main>
      <footer>
        <Footer type="user" />
      </footer>
    </div>
  );
};

export default UserLayout;

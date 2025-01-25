// File: src/layouts/AdminLayout.jsx
import React from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/layout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <AdminDashboardNavbar />
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

export default AdminLayout;


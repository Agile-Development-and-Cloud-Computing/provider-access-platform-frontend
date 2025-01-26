// File: src/layouts/AdminLayout.jsx
import React from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/layout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="admin-header">
        <AdminDashboardNavbar />
      </header>
      <main className="admin-main">
        {children}
      </main>
      <footer>
        <Footer type="admin" />
      </footer>
    </div>
  );
};

export default AdminLayout;

// src/pages/dashboard/ProviderAdminDashboard.jsx
import React from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar'; 
import Footer from '@/components/Footer'; 
import '@/styles/ProviderAdminDashboard.css'; 

const ProviderAdminDashboard = () => {
  const navigateToMasterAgreements = () => {
    // Navigate to the Master Agreements Page
    window.location.href = '/admin/master-agreements'; // Ensure the route matches your MasterAgreementPage route
  };

  const navigateToManageProviders = () => {
    window.location.href = '/admin/manage-providers'; // Ensure the route matches your ManageProvidersPage route
  };

  const navigateToUserManagement = () => {
    window.location.href = '/admin/user-management'; // Ensure the route matches your UserManagementPage route
  };

  return (
    <>
      <AdminDashboardNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Provider Admin Dashboard</h1>

        {/* KPI Section */}
        <div className="kpi-container">
          <div className="kpi-card">
            <h2>Total Employees</h2>
            <p>50</p>
          </div>
          <div className="kpi-card">
            <h2>Active Contracts</h2>
            <p>10</p>
          </div>
          <div className="kpi-card">
            <h2>Open Service Requests</h2>
            <p>7</p>
          </div>
        </div>

        {/* Actionable Links */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Master Agreements</h2>
            <p>Fetch and view master agreements saved in the database.</p>
            <button onClick={navigateToMasterAgreements}>View Agreements</button>
          </div>
          <div className="dashboard-card">
            <h2>Manage Providers</h2>
            <p>Edit provider credentials such as name, address, and validity period.</p>
            <button onClick={navigateToManageProviders}>
              Manage Providers
            </button>
          </div>
          <div className="dashboard-card">
            <h2>User Management</h2>
            <p>Create, edit, and delete up to 2 user accounts for your provider.</p>
            <button onClick={navigateToUserManagement}>
              Manage Users
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderAdminDashboard;
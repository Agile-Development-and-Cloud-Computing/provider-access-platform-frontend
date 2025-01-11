import React from 'react';
import ProviderAdminNavbar from '../../components/ProviderAdminNavbar';
import Footer from '../../components/Footer';
import '../../styles/ProviderAdminDashboard.css'; // Import the custom CSS file for styling

const ProviderAdminDashboard = () => {
  return (
    <>
      <ProviderAdminNavbar />
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
            <h2>Manage Providers</h2>
            <p>Edit provider credentials such as name, address, and validity period.</p>
            <button onClick={() => window.location.href = '/manage-providers'}>
              Manage Providers
            </button>
          </div>
          <div className="dashboard-card">
            <h2>User Management</h2>
            <p>Create, edit, and delete up to 2 user accounts for your provider.</p>
            <button onClick={() => window.location.href = '/user-management'}>
              Manage Users
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Performance Metrics</h2>
            <p>Analyze activity metrics such as employees, offers, and requests.</p>
            <button onClick={() => window.location.href = '/performance-metrics'}>
              View Metrics
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderAdminDashboard;

import React from 'react';
import ProviderAdminNavbar from '../../components/ProviderAdminNavbar';
import Footer from '../../components/Footer';
import '../../styles/ProviderAdminDashboard.css'; // Import the custom CSS file for styling

const ProviderAdminDashboard = () => {
  return (
    <>
      <ProviderAdminNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-grid">
          {/* Manage Providers */}
          <div className="dashboard-card">
            <h2>Manage Providers</h2>
            <p>View, add, and manage provider accounts and credentials.</p>
            <button onClick={() => window.location.href = '/manage-providers'}>
              Manage Providers
            </button>
          </div>

          {/* User Management */}
          <div className="dashboard-card">
            <h2>User Management</h2>
            <p>Configure and manage user accounts for the provider.</p>
            <button onClick={() => window.location.href = '/manage-users'}>
              Manage Users
            </button>
          </div>

          {/* View Reports */}
          <div className="dashboard-card">
            <h2>View Reports</h2>
            <p>Access detailed reports on provider performance and SLA metrics.</p>
            <button onClick={() => window.location.href = '/view-reports'}>
              View Reports
            </button>
          </div>

          {/* Dashboard Statistics */}
          <div className="dashboard-card">
            <h2>Dashboard Statistics</h2>
            <p>View key metrics and statistics related to your provider's performance.</p>
            <button onClick={() => window.location.href = '/dashboard-statistics'}>
              View Statistics
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderAdminDashboard;

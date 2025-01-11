import React from 'react';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import '../../styles/UserDashboard.css'; // Import the custom CSS file for styling

const UserDashboard = () => {
  return (
    <>
      <UserNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="dashboard-grid">
          {/* Open Offers */}
          <div className="dashboard-card">
            <h2>Open Offers</h2>
            <p>Browse and bid on open offers for master agreements.</p>
            <button onClick={() => window.location.href = '/view-offers'}>
              View Offers
            </button>
          </div>

          {/* Employee Management */}
          <div className="dashboard-card">
            <h2>Employee Management</h2>
            <p>Manage your employees' profiles and assign them to projects.</p>
            <button onClick={() => window.location.href = '/employee-management'}>
              Manage Employees
            </button>
          </div>

          {/* Service Requests */}
          <div className="dashboard-card">
            <h2>Service Requests</h2>
            <p>Track your service requests and submit bids.</p>
            <button onClick={() => window.location.href = '/service-requests'}>
              View Service Requests
            </button>
          </div>

          {/* Upload Profiles */}
          <div className="dashboard-card">
            <h2>Upload Profiles</h2>
            <p>Upload employee profiles for specific service requests.</p>
            <button onClick={() => window.location.href = '/upload-profiles'}>
              Upload Profiles
            </button>
          </div>

          {/* Manage Orders */}
          <div className="dashboard-card">
            <h2>Manage Orders</h2>
            <p>Handle ongoing and completed orders, including extensions and substitutions.</p>
            <button onClick={() => window.location.href = '/manage-orders'}>
              Manage Orders
            </button>
          </div>

          {/* Dashboard Statistics */}
          <div className="dashboard-card">
            <h2>Dashboard Statistics</h2>
            <p>View statistics on bids, service requests, and employee assignments.</p>
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

export default UserDashboard;

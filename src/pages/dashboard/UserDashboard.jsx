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

        {/* KPI Section */}
        <div className="kpi-container">
          <div className="kpi-card">
            <h2>Active Service Requests</h2>
            <p>5</p>
          </div>
          <div className="kpi-card">
            <h2>Submitted Bids</h2>
            <p>8</p>
          </div>
          <div className="kpi-card">
            <h2>Employees Assigned</h2>
            <p>3</p>
          </div>
        </div>

        {/* Actionable Links */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>View Offers</h2>
            <p>Browse and bid on active offers for master agreements.</p>
            <button onClick={() => window.location.href = '/view-offers'}>
              View Offers
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Service Requests</h2>
            <p>Track active and completed service requests. Assign employees to requests.</p>
            <button onClick={() => window.location.href = '/service-requests'}>
              View Service Requests
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Employee Management</h2>
            <p>Manage employee profiles and assign them to offers or service requests.</p>
            <button onClick={() => window.location.href = '/employee-management'}>
              Manage Employees
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;

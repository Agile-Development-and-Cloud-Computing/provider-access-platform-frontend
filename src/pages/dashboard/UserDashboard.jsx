import React from "react";
import UserDashboardNavbar from "../../components/UserDashboardNavbar";
import Footer from "../../components/Footer";
import "../../styles/UserDashboard.css"; // Import the custom CSS file for styling

const UserDashboard = () => {
  const navigateToViewOffers = () => {
    window.location.href = "/view-offers"; // Ensure the route matches your ViewOffersPage route
  };

  const navigateToServiceRequests = () => {
    window.location.href = "/service-requests"; // Ensure the route matches your ServiceRequestsPage route
  };

  const navigateToEmployeeManagement = () => {
    window.location.href = "/employee-management"; // Ensure the route matches your EmployeeManagementPage route
  };

  return (
    <>
      <UserDashboardNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>

        {/* KPI Section */}
        <div className="kpi-container">
          <div className="kpi-card">
            <h2>Active Service Requests</h2>
            <p>5</p> {/* Replace with dynamic data if available */}
          </div>
          <div className="kpi-card">
            <h2>Submitted Bids</h2>
            <p>8</p> {/* Replace with dynamic data if available */}
          </div>
          <div className="kpi-card">
            <h2>Employees Assigned</h2>
            <p>3</p> {/* Replace with dynamic data if available */}
          </div>
        </div>

        {/* Actionable Links */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>View Offers</h2>
            <p>Browse and bid on active offers for master agreements.</p>
            <button onClick={navigateToViewOffers}>View Offers</button>
          </div>
          <div className="dashboard-card">
            <h2>Service Requests</h2>
            <p>Track active and completed service requests. Assign employees to requests.</p>
            <button onClick={navigateToServiceRequests}>View Service Requests</button>
          </div>
          <div className="dashboard-card">
            <h2>Employee Management</h2>
            <p>Manage employee profiles and assign them to offers or service requests.</p>
            <button onClick={navigateToEmployeeManagement}>Manage Employees</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;



import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UserDashboardNavbar from '../../components/UserDashboardNavbar'; // Adjust the path
import Footer from '../../components/Footer'; // Adjust the path

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear any user session data if needed (e.g., remove tokens, user info)
    localStorage.removeItem('userToken'); // Example: Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <UserDashboardNavbar />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your account and settings here.</p>

        
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

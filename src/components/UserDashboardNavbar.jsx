// File: src/components/UserDashboardNavbar.jsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '/pam_logo.png';

const UserDashboardNavbar = () => {
  const { user, logout } = useAuth(); // Get user info and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user state and localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/user">
          <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
          User Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbarNav"
          aria-controls="userNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userNavbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/user">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user/view-offers">View Offers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user/service-requests">Service Requests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user/employee-management">Manage Employees</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item">
                <span className="nav-link text-light">
                  Welcome, {user.userName || 'User'}
                </span>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserDashboardNavbar;

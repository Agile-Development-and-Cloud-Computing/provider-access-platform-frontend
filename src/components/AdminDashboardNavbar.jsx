// File: src/components/AdminDashboardNavbar.jsx
// File: src/components/AdminDashboardNavbar.jsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '/pam_logo.png';

const ProviderAdminNavbar = () => {
  const { user, logout } = useAuth(); // Get user info and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user state and localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/admin">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '40px', height: 'auto', marginRight: '10px' }}
          />
          Access Provider Platform
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarNav"
          aria-controls="adminNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/admin">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/master-agreements">Master Agreements</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/manage-providers">Manage Providers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/user-management">User Management</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {/* Display Logged-In User */}
            {user && (
              <li className="nav-item">
                <span className="nav-link text-light">
                  Welcome, {user.userName || 'Admin'}
                </span>
              </li>
            )}
            <li className="nav-item">
              {/* Replace <a> with a button for proper logout */}
              <button
                className="btn btn-link nav-link text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ProviderAdminNavbar;

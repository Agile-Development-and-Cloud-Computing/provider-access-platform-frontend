import React, { useEffect, useState } from 'react';
import logo from '/pam_logo.png'; // Adjust the path to your logo

const ProviderAdminNavbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo and Branding */}
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/admin">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '40px', height: 'auto', marginRight: '10px' }}
          />
          Access Provider Platform
        </a>

        {/* Hamburger Button for Mobile View */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/admin">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/manage-providers">Manage Providers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user-management">User Management</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/performance-metrics">Performance Metrics</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {/* Display Logged-In User */}
            {loggedInUser && (
              <li className="nav-item">
                <span className="nav-link text-light">Welcome, {loggedInUser}</span>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link text-danger" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ProviderAdminNavbar;

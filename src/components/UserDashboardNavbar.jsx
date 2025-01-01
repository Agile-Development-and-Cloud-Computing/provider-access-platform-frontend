import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '/pam_logo.png'; // Adjust the path to your logo

const UserDashboardNavbar = ({ onSelectSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove session token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/dashboard">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '40px', height: 'auto', marginRight: '10px' }}
          />
          User Dashboard
        </a>

        {/* Hamburger Button */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="userNavbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => onSelectSection('userManagement')}
              >
                User Management
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => onSelectSection('serviceAgreements')}
              >
                Service Agreements
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => onSelectSection('masterAgreement')}
              >
                Master Agreement
              </button>
            </li>
          </ul>
          <ul className="navbar-nav">
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

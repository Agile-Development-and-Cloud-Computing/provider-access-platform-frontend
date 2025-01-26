import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '/pam_logo.png';
import '@/styles/navbar.css';

const UserDashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/user">
          <img src={logo} alt="Logo" />
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
                <span className="nav-link welcome-text">
                  Hi, {user.userName || 'User'}
                </span>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
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

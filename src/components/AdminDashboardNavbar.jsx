import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '/pam_logo.png';
import '@/styles/navbar.css';

const AdminDashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/admin">
          <img src={logo} alt="Logo" />
          Admin Dashboard
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
            {user && (
              <li className="nav-item">
                <span className="nav-link welcome-text">
                  Hi, {user.userName || 'Admin'}
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

export default AdminDashboardNavbar;

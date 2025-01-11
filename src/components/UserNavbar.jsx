import React, { useEffect, useState } from 'react';
import logo from '/pam_logo.png'; // Adjust the path to your logo

const UserNavbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/dashboard/user">
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
              <a className="nav-link" href="/view-offers">View Offers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/service-requests">Service Requests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/employee-management">Manage Employees</a>
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

export default UserNavbar;

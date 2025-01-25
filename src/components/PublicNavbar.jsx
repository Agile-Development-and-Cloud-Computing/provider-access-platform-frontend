// File: src/components/PublicNavbar.jsx
import React from 'react';
import logo from '/pam_logo.png';

const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
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
          data-bs-target="#publicNavbarNav"
          aria-controls="publicNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="publicNavbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/team">Team</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link btn btn-primary text-white" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

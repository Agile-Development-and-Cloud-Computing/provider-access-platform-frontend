import React from 'react';
import logo from '/pam_logo.png';
import '@/styles/navbar.css';

const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" />
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
              <a className="nav-link" href="/team">Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-warning" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-success" href="/register">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

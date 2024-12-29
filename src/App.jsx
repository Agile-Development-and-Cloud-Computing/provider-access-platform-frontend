import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/info/AboutPage';
import TeamPage from './pages/info/TeamPage';
import ContactPage from './pages/info/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/error/NotFoundPage';
import UserDashboard from './pages/dashboard/UserDashboard'; // Adjust path as necessary

import './styles/App.css'; // Import the CSS file

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Additional Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* 404 Page (Catch-All Route) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

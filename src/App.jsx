import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared Pages
import HomePage from './pages/shared/HomePage';
import AboutPage from './pages/shared/AboutPage';
import TeamPage from './pages/shared/TeamPage';
import ContactPage from './pages/shared/ContactPage';
import NotFoundPage from './pages/shared/NotFoundPage';

// Authentication Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import LogoutPage from './pages/auth/LogoutPage';

// Dashboard Pages
import ProviderAdminDashboard from './pages/dashboard/ProviderAdminDashboard';
import UserDashboard from './pages/dashboard/UserDashboard';

// Admin Pages
import MasterAgreementPage from './pages/admin/MasterAgreementPage';
//import ManageProviders from './pages/admin/ManageProviders';
//import UserManagement from './pages/admin/UserManagement';
//import PerformanceMetrics from './pages/admin/PerformanceMetrics';


// User Pages
//import ViewOffers from './pages/user/ViewOffers';
//import ServiceRequests from './pages/user/ServiceRequests';
//import EmployeeManagement from './pages/user/EmployeeManagement';

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
          <Route path="/logout" element={<LogoutPage />} />

          {/* Dashboards */}
          <Route path="/dashboard/admin" element={<ProviderAdminDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />

          {/* Master-agreement Routes */}
          <Route path="/admin/master-agreements" element={<MasterAgreementPage />} />

          {/* 404 Page (Catch-All Route) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


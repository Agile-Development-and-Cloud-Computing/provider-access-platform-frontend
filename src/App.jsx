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
import MasterAgreementPage from './pages/management/MasterAgreementPage';
//import ManageProviders from './pages/management/ManageProviders';
//import UserManagement from './pages/management/UserManagement';
//import PerformanceMetrics from './pages/management/PerformanceMetrics';


// User Pages
//import ViewOffers from './pages/management/ViewOffers';
//import ServiceRequests from './pages/management/ServiceRequests';
import EmployeeManagementPage from './pages/management/EmployeeManagementPage'; 


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
          <Route path="/admin/master-agreements" element={<MasterAgreementPage />} />

          {/* Admin Routes */}
          <Route path="/employee-management" element={<EmployeeManagementPage />} />
          <Route path="/master-agreements" element={<MasterAgreementPage />} />

          {/* 404 Page (Catch-All Route) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


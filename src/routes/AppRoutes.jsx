// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Shared Pages
import HomePage from '@/pages/shared/HomePage';
import AboutPage from '@/pages/shared/AboutPage';
import TeamPage from '@/pages/shared/TeamPage';
import ContactPage from '@/pages/shared/ContactPage';
import NotFoundPage from '@/pages/shared/NotFoundPage';

// Authentication Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import LogoutPage from '@/pages/auth/LogoutPage';

// Dashboard Pages
import ProviderAdminDashboard from '@/pages/dashboard/ProviderAdminDashboard';
import UserDashboard from '@/pages/dashboard/UserDashboard';

// Admin Pages
import MasterAgreementPage from '@/pages/management/MasterAgreementPage';

// User Pages
import EmployeeManagementPage from '@/pages/management/EmployeeManagementPage';
import ServiceRequestsPage from '../pages/management/ServiceRequestsPage';

function AppRoutes() {
  return (
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

      {/* Admin Routes */}
      <Route path="/admin/master-agreements" element={<MasterAgreementPage />} />

      {/* User Routes */}
      <Route path="/user/employee-management" element={<EmployeeManagementPage />} />
      <Route path="/user/service-requests" element={<ServiceRequestsPage />} />
      

      {/* 404 Page (Catch-All Route) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

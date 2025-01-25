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
import OrdersPage from '@/pages/management/OrdersPage';

// User Pages
import EmployeeManagementPage from '@/pages/management/EmployeeManagementPage';
import ServiceRequestsPage from '@/pages/management/ServiceRequestsPage';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import UserLayout from '@/layouts/UserLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/team" element={<PublicLayout><TeamPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
      
      <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
      <Route path="/logout" element={<PublicLayout><LogoutPage /></PublicLayout>} />

      {/* Admin Routes */}
      <Route path="/dashboard/admin" element={<AdminLayout><ProviderAdminDashboard /></AdminLayout>} />
      <Route path="/admin/master-agreements" element={<AdminLayout><MasterAgreementPage /></AdminLayout>} />
      <Route path="/admin/orders" element={<AdminLayout><OrdersPage /></AdminLayout>} />
      <Route path="/admin/service-requests" element={<AdminLayout><ServiceRequestsPage /></AdminLayout>} />

      {/* User Routes */}
      <Route path="/dashboard/user" element={<UserLayout><UserDashboard /></UserLayout>} />
      <Route path="/user/employee-management" element={<UserLayout><EmployeeManagementPage /></UserLayout>} />
      <Route path="/user/service-requests" element={<UserLayout><ServiceRequestsPage /></UserLayout>} />

      {/* 404 Catch-All */}
      <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
    </Routes>
  );
}

export default AppRoutes;

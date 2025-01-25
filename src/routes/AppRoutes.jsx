import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import AdminDashboard from '@/pages/dashboard/ProviderAdminDashboard';
import UserDashboard from '@/pages/dashboard/UserDashboard';
import HomePage from '@/pages/shared/HomePage';
import ProtectedRoute from '@/routes/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute allowedRoles={['User']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;

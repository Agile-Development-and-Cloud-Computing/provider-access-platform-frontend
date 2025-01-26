// File: src/pages/dashboard/ProviderAdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/Dashboard.css'; // Shared dashboard styles

import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import ManageProvidersCard from '@/components/cards/ManageProvidersCard';
import UserManagementCard from '@/components/cards/UserManagementCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const ProviderAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container admin-dashboard">
      <h1 className="dashboard-title" role="heading" aria-level="1">
        Welcome to Your Admin Dashboard
      </h1>
      <div className="dashboard-grid">
        <MasterAgreementsCard navigateTo={() => navigate('/admin/master-agreements')} />
        <ManageProvidersCard navigateTo={() => navigate('/admin/manage-providers')} />
        <UserManagementCard navigateTo={() => navigate('/admin/user-management')} />
        <ServiceRequestsCard navigateTo={() => navigate('/admin/service-requests')} />
        <RoleOffersCard />
        <OrdersCard />
      </div>
    </div>
  );
};

export default ProviderAdminDashboard;

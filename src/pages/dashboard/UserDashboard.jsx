// File: src/pages/dashboard/UserDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/Dashboard.css'; // Shared dashboard styles

import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import EmployeeManagementCard from '@/components/cards/EmployeeManagementCard';
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container user-dashboard">
      <h1 className="dashboard-title" role="heading" aria-level="1">
        Welcome to Your User Dashboard
      </h1>
      <div className="dashboard-grid">
        <MasterAgreementsCard navigateTo={() => navigate('/user/master-agreements')} />
        <ServiceRequestsCard navigateTo={() => navigate('/user/service-requests')} />
        <EmployeeManagementCard navigateTo={() => navigate('/user/employee-management')} />
        <RoleOffersCard navigateTo={() => navigate('/user/role-offers')} />
        <OrdersCard navigateTo={() => navigate('/user/orders')} />
      </div>
    </div>
  );
};

export default UserDashboard;

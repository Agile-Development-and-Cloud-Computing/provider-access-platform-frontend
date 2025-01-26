// File: src/pages/dashboard/UserDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/Dashboard.css'; // Shared dashboard styles

import ViewOffersCard from '@/components/cards/ViewOffersCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import EmployeeManagementCard from '@/components/cards/EmployeeManagementCard';
import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
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
        <ServiceRequestsCard navigateTo={() => navigate('/user/service-requests')} />
        <EmployeeManagementCard navigateTo={() => navigate('/user/employee-management')} />
        <MasterAgreementsCard navigateTo={() => navigate('/user/master-agreements')} />
        <RoleOffersCard />
        <OrdersCard />
      </div>
    </div>
  );
};

export default UserDashboard;

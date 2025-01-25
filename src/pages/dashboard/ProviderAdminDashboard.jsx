import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/ProviderAdminDashboard.css';

// Import Actionable Link cards
import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import ManageProvidersCard from '@/components/cards/ManageProvidersCard';
import UserManagementCard from '@/components/cards/UserManagementCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const ProviderAdminDashboard = () => {
  const navigate = useNavigate();

  const navigateToMasterAgreements = () => navigate('/admin/master-agreements');
  const navigateToManageProviders = () => navigate('/admin/manage-providers');
  const navigateToUserManagement = () => navigate('/admin/user-management');
  const navigateToServiceRequests = () => navigate('/admin/service-requests'); 

  return (
    <>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Provider Admin Dashboard</h1>
        <div className="dashboard-grid">
          <MasterAgreementsCard navigateTo={navigateToMasterAgreements} />
          <ManageProvidersCard navigateTo={navigateToManageProviders} />
          <UserManagementCard navigateTo={navigateToUserManagement} />
          <ServiceRequestsCard navigateTo={navigateToServiceRequests} />
          <RoleOffersCard />
          <OrdersCard />
        </div>
      </div>
    </>
  );
};

export default ProviderAdminDashboard;

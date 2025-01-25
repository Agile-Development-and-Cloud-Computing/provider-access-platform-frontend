import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/UserDashboard.css';

// Import Actionable Link cards
import ViewOffersCard from '@/components/cards/ViewOffersCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import EmployeeManagementCard from '@/components/cards/EmployeeManagementCard';
import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const UserDashboard = () => {
  const navigate = useNavigate();

  const navigateToServiceRequests = () => navigate('/user/service-requests'); 
  const navigateToEmployeeManagement = () => navigate('/user/employee-management'); 
  const navigateToMasterAgreements = () => navigate('/user/master-agreements'); 

  return (
    <>
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="dashboard-grid">
          <ServiceRequestsCard navigateTo={navigateToServiceRequests} />
          <EmployeeManagementCard navigateTo={navigateToEmployeeManagement} />
          <MasterAgreementsCard navigateTo={navigateToMasterAgreements} />
          <RoleOffersCard />
          <OrdersCard />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

import React from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/ProviderAdminDashboard.css';

// Import KPI cards
//import TotalEmployeesCard from '@/components/cards/KPI/TotalEmployeesCard';
//import ActiveContractsCard from '@/components/cards/KPI/ActiveContractsCard';
//import OpenServiceRequestsCard from '@/components/cards/KPI/OpenServiceRequestsCard';

// Import Actionable Link cards
import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import ManageProvidersCard from '@/components/cards/ManageProvidersCard';
import UserManagementCard from '@/components/cards/UserManagementCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';

// Import additional cards
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const ProviderAdminDashboard = () => {
  const navigateToMasterAgreements = () => {
    window.location.href = '/admin/master-agreements';
  };

  const navigateToManageProviders = () => {
    window.location.href = '/admin/manage-providers';
  };

  const navigateToUserManagement = () => {
    window.location.href = '/admin/user-management';
  };

  const navigateToServiceRequests = () => {
    window.location.href = "/user/service-requests"; // Ensure the route matches your ServiceRequestsPage route
  };

  return (
    <>
      <AdminDashboardNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Provider Admin Dashboard</h1>

        {/* KPI Section 
        <div className="kpi-container">
          <TotalEmployeesCard />
          <ActiveContractsCard />
          <OpenServiceRequestsCard />
        </div>
        */}

        {/* Actionable Links Section */}
        <div className="dashboard-grid">
          <MasterAgreementsCard navigateTo={navigateToMasterAgreements} />
          <ManageProvidersCard navigateTo={navigateToManageProviders} />
          <UserManagementCard navigateTo={navigateToUserManagement} />
          <ServiceRequestsCard navigateTo={navigateToServiceRequests} /> 
          <RoleOffersCard />
          <OrdersCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderAdminDashboard;

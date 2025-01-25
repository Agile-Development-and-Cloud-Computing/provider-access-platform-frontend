// File: src/pages/dashboard/UserDashboard.jsx
import React from "react";
//import UserDashboardNavbar from '@/components/UserDashboardNavbar';
//import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';
import '@/styles/UserDashboard.css';

// Import KPI Cards
//import ActiveServiceRequestsCard from '@/components/cards/KPI/ActiveServiceRequestsCard';
//import SubmittedBidsCard from '@/components/cards/KPI/SubmittedBidsCard';
//import EmployeesAssignedCard from '@/components/cards/KPI/EmployeesAssignedCard';

// Import Actionable Link Cards
import ViewOffersCard from '@/components/cards/ViewOffersCard';
import ServiceRequestsCard from '@/components/cards/ServiceRequestsCard';
import EmployeeManagementCard from '@/components/cards/EmployeeManagementCard';

import MasterAgreementsCard from '@/components/cards/MasterAgreementsCard';
import RoleOffersCard from '@/components/cards/RoleOffersCard';
import OrdersCard from '@/components/cards/OrdersCard';

const UserDashboard = () => {

  const navigateToServiceRequests = () => {
    window.location.href = "/user/service-requests"; // Ensure the route matches your ServiceRequestsPage route
  };

  const navigateToEmployeeManagement = () => {
    window.location.href = "/user/employee-management"; // Ensure the route matches your EmployeeManagementPage route
  };

  const navigateToMasterAgreements = () => {
    window.location.href = '/admin/master-agreements';
  };

  return (
    <>
      {/*<UserDashboardNavbar /> */} 
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>

        {/* KPI Section 
        <div className="kpi-container">
          <ActiveServiceRequestsCard />
          <SubmittedBidsCard />
          <EmployeesAssignedCard />
        </div>
        */}

        {/* Actionable Links Section */}
        <div className="dashboard-grid">
          <ServiceRequestsCard navigateTo={navigateToServiceRequests} />
          <EmployeeManagementCard navigateTo={navigateToEmployeeManagement} />
          <MasterAgreementsCard navigateTo={navigateToMasterAgreements} />
          <RoleOffersCard /> 
          <OrdersCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;

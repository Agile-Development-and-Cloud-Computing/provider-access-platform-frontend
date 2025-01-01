import React, { useState } from 'react';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import DataFetcher from '../../components/DataFetcher'; // Import the DataFetcher component

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('userManagement');

  const renderContent = () => {
    switch (selectedSection) {
      case 'userManagement':
        return (
          <DataFetcher
            endpoint="https://api.example.com/user-management"
            title="User Management"
          />
        );
      case 'serviceAgreements':
        return (
          <DataFetcher
            endpoint="https://api.example.com/service-agreements"
            title="Service Agreements"
          />
        );
      case 'masterAgreement':
        return (
          <DataFetcher
            endpoint="https://api.example.com/master-agreement"
            title="Master Agreement"
          />
        );
      default:
        return <p>Select a section from the navbar to view its contents.</p>;
    }
  };

  return (
    <>
      <UserDashboardNavbar onSelectSection={setSelectedSection} />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

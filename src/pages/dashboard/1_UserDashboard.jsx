import React, { useState, useEffect } from 'react';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import MasterAgreements from '../../components/dashboard/mandar/MasterAgreements';
import UserManagement from '../../components/dashboard/mandar/UserManagement';
import BidForm from '../../components/dashboard/mandar/BidForm';
import masterAgreementService from '../../services/masterAgreementService';
import '../../styles/Dashboard.css';

const UserDashboard = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedSection, setSelectedSection] = useState('userManagement');
  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });

  useEffect(() => {
    if (selectedSection === 'masterAgreement') {
        masterAgreementService.getAllAgreements().then(setAgreements);
    }
  }, [selectedSection]);

  return (
    <>
      <UserDashboardNavbar onSelectSection={setSelectedSection} />
      <div className="dashboard-container">
        <h1>User Dashboard</h1>
        {selectedSection === 'userManagement' && <UserManagement />}
        {selectedSection === 'masterAgreement' && (
          <MasterAgreements agreements={agreements} />
        )}
        {bidForm.visible && (
          <BidForm
            role={bidForm.role}
            domain={bidForm.domain}
            agreement={bidForm.agreement}
            onClose={() => setBidForm({ visible: false })}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;

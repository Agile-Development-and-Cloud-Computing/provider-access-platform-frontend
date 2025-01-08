import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('userManagement');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track which items are expanded

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(endpoint);
      setData(response.data.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSection === 'userManagement') {
      fetchData('https://api.example.com/user-management');
    } else if (selectedSection === 'serviceAgreements') {
      fetchData('https://api.example.com/service-agreements');
    } else if (selectedSection === 'masterAgreement') {
      fetchData('https://access-platform.azurewebsites.net/api/provider/master-agreements');
    }
  }, [selectedSection]);

  const toggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle expanded state
    }));
  };

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!data) return <p>Select a section to view its contents.</p>;

    return (
      <div className="data-container">
        {data.map((item, index) => (
          <div key={index} className="data-summary-box">
            <h4>{item.masterAgreementTypeName}</h4>
            <p><strong>Valid Until:</strong> {item.validUntil}</p>
            <button onClick={() => toggleDetails(index)}>
              {expanded[index] ? 'Hide Details' : 'Show Details'}
            </button>
            {expanded[index] && (
              <div className="data-details">
                <p><strong>Role Name:</strong> {item.roleName}</p>
                <p><strong>Experience Level:</strong> {item.experienceLevel}</p>
                <p><strong>Technologies:</strong> {item.technologiesCatalog}</p>
                <p><strong>Domain:</strong> {item.domainName}</p>
                <p><strong>Offer Cycle:</strong> {item.offerCycle}</p>
                <p><strong>Provider:</strong> {item.provider}</p>
                <p><strong>Quote Price:</strong> ${item.quotePrice}</p>
                <p><strong>Is Accepted:</strong> {item.isAccepted ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <UserDashboardNavbar onSelectSection={setSelectedSection} />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

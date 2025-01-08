import React, { useState } from 'react';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import '../../styles/dashboard.css';



const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define API endpoints
  const endpoints = {
    userManagement: {
      endpoint: 'https://access-platform.azurewebsites.net/api/employees/101',
      title: 'User Management',
    },
    serviceAgreements: {
      endpoint: 'https://api.example.com/service-agreements',
      title: 'Service Agreements',
    },
    masterAgreement: {
      endpoint: 'https://access-platform.azurewebsites.net/api/provider/master-agreements',
      title: 'Master Agreements',
    },
  };

  // Fetch data when a section is selected
  const fetchData = async (section) => {
    setSelectedSection(section);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(endpoints[section].endpoint);
      setData(response.data.data); // Assuming API returns data under `data.data`
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserDashboardNavbar onSelectSection={fetchData} />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        {selectedSection && (
          <>
            <h2>{endpoints[selectedSection].title}</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && data.length > 0 && (
              <div className="data-container">
                {data.map((item, index) => (
                  <div key={index} className="data-box">
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

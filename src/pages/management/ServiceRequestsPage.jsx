import React, { useEffect, useState } from 'react';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import requestService from '../../services/requestService';
import '../../styles/ServiceRequestsPage.css';

const ServiceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await requestService.getRequests();
        setRequests(data);
      } catch (error) {
        setError('Failed to fetch service requests.');
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <UserDashboardNavbar />
      <div className="service-requests-container">
        <h1>Service Requests</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="service-requests-list">
          {requests.map((request) => (
            <li key={request.id} className="service-request-item">
              {request.title}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ServiceRequestsPage;

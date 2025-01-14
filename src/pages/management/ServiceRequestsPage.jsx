import React, { useEffect, useState } from 'react';
import requestService from '../../services/requestService';

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
    <div>
      <h1>Service Requests</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {requests.map((request) => (
          <li key={request.id}>{request.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceRequestsPage;

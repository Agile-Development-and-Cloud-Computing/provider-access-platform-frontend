import React from 'react';

const ServiceRequestsCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Service Requests</h2>
      <p>Track active and completed service requests. Assign employees to requests.</p>
      <button onClick={navigateTo}>View Service Requests</button>
    </div>
  );
};

export default ServiceRequestsCard;

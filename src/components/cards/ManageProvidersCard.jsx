// File: src/components/cards/ManageProvidersCard.jsx
import React from 'react';

const ManageProvidersCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Manage Providers</h2>
      <p>Edit provider credentials such as name, address, and validity period.</p>
      <button onClick={navigateTo}>Manage Providers</button>
    </div>
  );
};

export default ManageProvidersCard;

// File: src/components/cards/RoleOffersCard.jsx
import React from 'react';

const RoleOffersCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Role Offers</h2>
      <p>View and manage role offers related to agreements.</p>
      <button onClick={navigateTo}>View Role Offers</button>
    </div>
  );
};

export default RoleOffersCard;

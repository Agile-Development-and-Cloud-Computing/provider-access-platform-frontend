// File: src/components/cards/ViewOffersCard.jsx
import React from 'react';

const ViewOffersCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>View Offers</h2>
      <p>Browse and bid on active offers for master agreements.</p>
      <button onClick={navigateTo}>View Offers</button>
    </div>
  );
};

export default ViewOffersCard;

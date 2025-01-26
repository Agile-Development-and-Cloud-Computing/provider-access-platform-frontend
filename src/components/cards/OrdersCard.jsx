// File: src/components/cards/OrdersCard.jsx
import React from 'react';

const OrdersCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Orders</h2>
      <p>Track and manage orders associated with service requests.</p>
      <button onClick={navigateTo}>Manage Orders</button>
    </div>
  );
};

export default OrdersCard;

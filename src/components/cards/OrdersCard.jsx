// File: src/components/cards/OrdersCard.jsx
import React from 'react';

const OrdersCard = () => {
  const navigateToOrders = () => {
    window.location.href = '/admin/orders'; // Ensure this matches your route
  };

  return (
    <div className="dashboard-card">
      <h2>Orders</h2>
      <p>Track and manage orders associated with service requests.</p>
      <button onClick={navigateToOrders}>Manage Orders</button>
    </div>
  );
};

export default OrdersCard;

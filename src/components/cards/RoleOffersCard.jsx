import React from 'react';

const RoleOffersCard = () => {
  const navigateToRoleOffers = () => {
    window.location.href = '/admin/role-offers'; // Ensure this matches your route
  };

  return (
    <div className="dashboard-card">
      <h2>Role Offers</h2>
      <p>View and manage role offers related to agreements.</p>
      <button onClick={navigateToRoleOffers}>View Role Offers</button>
    </div>
  );
};

export default RoleOffersCard;

// src/components/dashboard/RoleCard.jsx
import React from 'react';

const RoleCard = ({ role, domain, agreement, onBidClick }) => (
  <div className="role-card">
    <h4 className="role-name">{role.roleName} (Role ID: {role.roleId})</h4>
    <p><strong>Experience Level:</strong> {role.experienceLevel}</p>
    <p><strong>Technologies:</strong> {role.technologiesCatalog}</p>
    <p><strong>Quote Price:</strong> ${role.quotePrice}</p>
    <button className="bid-button" onClick={() => onBidClick(role, domain, agreement)}>
      Place Your Bid
    </button>
  </div>
);

export default RoleCard;

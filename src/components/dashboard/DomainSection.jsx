// src/components/dashboard/DomainSection.jsx
import React from 'react';
import RoleCard from './RoleCard';

const DomainSection = ({ domain, agreement, onBidClick }) => (
  <div className="domain-section">
    <h3 className="domain-heading">{domain.domainName} Opportunities</h3>
    <div className="roles-container">
      {domain.roleOffer.map((role, index) => (
        <RoleCard key={index} role={role} domain={domain} agreement={agreement} onBidClick={onBidClick} />
      ))}
    </div>
  </div>
);

export default DomainSection;

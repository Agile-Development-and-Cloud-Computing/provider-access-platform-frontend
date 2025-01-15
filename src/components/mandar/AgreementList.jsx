import React from 'react';

const AgreementList = ({ data, expanded, onToggleDetails, onBidClick }) => {
  if (!data || data.length === 0) return <p>No agreements available.</p>;

  return data.map((agreement, index) => (
    <div key={index} className="data-summary-box">
      <h2>{agreement.masterAgreementTypeName}</h2>
      <p><strong>Valid Until:</strong> {agreement.validUntil}</p>
      <button onClick={() => onToggleDetails(index)}>
        {expanded[index] ? 'Hide Details' : 'Show Details'}
      </button>
      {expanded[index] && (
        <div className="details">
          {agreement.domains.map((domain, domainIndex) => (
            <div key={domainIndex}>
              <h3>{domain.domainName} Opportunities</h3>
              {domain.roleOffer.map((role, roleIndex) => (
                <div key={roleIndex}>
                  <h4>{role.roleName}</h4>
                  <p>Experience Level: {role.experienceLevel}</p>
                  <p>Technologies: {role.technologiesCatalog}</p>
                  <p>Quote Price: ${role.quotePrice}</p>
                  <button onClick={() => onBidClick(role, domain, agreement)}>
                    Place Your Bid
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  ));
};

export default AgreementList;

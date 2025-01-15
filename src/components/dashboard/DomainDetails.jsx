import React from 'react';

const DomainDetails = ({ data, loading, error, expanded, onToggleDetails, onBidClick }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="data-container">
      {data.map((agreement, index) => (
        <div key={index} className="data-summary-box">
          <h2>{agreement.masterAgreementTypeName}</h2>
          <p><strong>Valid Until:</strong> {agreement.validUntil}</p>
          <button onClick={() => onToggleDetails(index)}>
            {expanded[index] ? 'Hide Details' : 'Show Details'}
          </button>

          {expanded[index] && (
            <div>
              {agreement.domains.map((domain) => (
                <div key={domain.domainId}>
                  <h3>{domain.domainName}</h3>
                  {domain.roleOffer.map((role) => (
                    <div key={role.roleId}>
                      <p><strong>Role:</strong> {role.roleName}</p>
                      <button onClick={() => onBidClick({ role, domain, agreement })}>
                        Place Your Bid
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DomainDetails;

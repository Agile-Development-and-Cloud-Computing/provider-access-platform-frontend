import React, { useState } from 'react';

const MasterAgreements = ({ agreements }) => {
  const [expanded, setExpanded] = useState({});

  const toggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      {agreements.map((agreement, index) => (
        <div key={index} className="data-summary-box">
          <h2>{agreement.masterAgreementTypeName}</h2>
          <button onClick={() => toggleDetails(index)}>
            {expanded[index] ? 'Hide Details' : 'Show Details'}
          </button>
          {expanded[index] && (
            <div>
              <p>Valid Until: {agreement.validUntil}</p>
              {/* Display more agreement details */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MasterAgreements;

import React from 'react';

const MasterAgreementsCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Master Agreements</h2>
      <p>Fetch and view master agreements saved in the database.</p>
      <button onClick={navigateTo}>View Agreements</button>
    </div>
  );
};

export default MasterAgreementsCard;

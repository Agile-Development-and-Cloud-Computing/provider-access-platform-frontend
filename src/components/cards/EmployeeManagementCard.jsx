import React from 'react';

const EmployeeManagementCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>Employee Management</h2>
      <p>Manage employee profiles and assign them to offers or service requests.</p>
      <button onClick={navigateTo}>Manage Employees</button>
    </div>
  );
};

export default EmployeeManagementCard;

import React from 'react';

const UserManagementCard = ({ navigateTo }) => {
  return (
    <div className="dashboard-card">
      <h2>User Management</h2>
      <p>Create, edit, and delete up to 2 user accounts for your provider.</p>
      <button onClick={navigateTo}>Manage Users</button>
    </div>
  );
};

export default UserManagementCard;

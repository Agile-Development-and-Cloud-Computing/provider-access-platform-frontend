import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';

const UserManagement = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await userService.getAllEmployees();
        setEmployeeCount(employees.length);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employee data.');
      }
    };

    fetchEmployees();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Employees Assigned</h2>
      <p>{employeeCount}</p>
    </div>
  );
};

export default UserManagement;

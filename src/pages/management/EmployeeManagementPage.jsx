import React, { useState, useEffect } from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import '@/styles/EmployeeManagementPage.css';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch providerId from localStorage or session (adjust based on your auth implementation)
  const providerId = localStorage.getItem("providerId");

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!providerId) {
        console.error('Provider ID is missing. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(
          `https://access-platform.azurewebsites.net/api/employees/${providerId}`
        );

        console.log("API Response:", response.data); // Log entire response
        
        if (response.data.success && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);  // Extract employees from `data` field
        } else {
          console.error('Unexpected response format:', response.data);
          setEmployees([]); // Set empty array if response is invalid
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [providerId]);

  return (
    <div>
      <UserDashboardNavbar />
      <div className="employee-management-container">
        <h1 className="page-title">Employee Management</h1>
        <div className="employee-card-grid">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div key={employee.employeeId} className="employee-card">
                <h2>{employee.employeeName}</h2>
                <p><strong>Role:</strong> {employee.role}</p>
                <p><strong>Experience Level:</strong> {employee.level}</p>
                <p><strong>Technology Level:</strong> {employee.technology_level}</p>
              </div>
            ))
          ) : (
            <p>Loading employees or no employees found...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeManagementPage;

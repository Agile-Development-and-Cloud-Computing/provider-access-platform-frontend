// src/pages/management/EmployeeManagementPage.jsx
import React, { useState, useEffect } from 'react';
//import DataTable from 'react-data-table-component';
import UserDashboardNavbar from '@/components/UserDashboardNavbar'; 
import Footer from '@/components/Footer'; 
import employeeService from '@/services/employeeService'; 

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const columns = [
    { name: 'ID', selector: (row) => row.employeeId },
    { name: 'Name', selector: (row) => row.employeeName },
    { name: 'Role', selector: (row) => row.role },
    { name: 'Experience', selector: (row) => row.experienceLevel },
    { name: 'Skills', selector: (row) => row.skills.join(', ') },
  ];

  return (
    <div>
      <UserDashboardNavbar />
      <div className="employee-management-container">
        <h1>Employee Management</h1>
        <DataTable columns={columns} data={employees} pagination />
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeManagementPage;
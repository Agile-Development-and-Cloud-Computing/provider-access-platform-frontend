import React, { useState, useEffect } from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import '@/styles/EmployeeManagementPage.css';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    employeeName: '',
    role: '',
    level: '',
    technologyLevel: ''
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const providerId = localStorage.getItem("providerId");
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authentication token found");
  }

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

        if (response.data.success && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [providerId]);

  const handleAddEmployee = async () => {
    console.log("Adding new employee with details:", newEmployee);
    const employeeToAdd = { ...newEmployee, providerId };

    try {
      const response = await axios.post(
        `https://access-platform.azurewebsites.net/api/employees/add`,
        employeeToAdd
      );

      if (response.data.success) {
        setEmployees([...employees, response.data.data]);
        setNewEmployee({ employeeName: '', role: '', level: '', technologyLevel: '' });
        setIsAdding(false);
      } else {
        console.error('Error adding employee:', response.data.message || 'No message provided');
      }
    } catch (error) {
      console.error('Error adding employee:', error.message || error);
    }
  };

  const handleUpdateEmployee = async () => {
    console.log("Token Inside Update-->" + token);
  
    if (!editEmployee || !editEmployee.employeeId) {
      console.error("No employee selected for update");
      return;
    }
  
    console.log("Before Hitting API", editEmployee);
    
    try {
      console.log("Token Inside Try-->" + token);
  
      const response = await axios.put(
        `https://access-platform-test.azurewebsites.net/api/employees/update/${editEmployee.employeeId}/${providerId}`,
        editEmployee,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
  
      if (response.data.success) {
        setEmployees(
          employees.map((emp) =>
            emp.employeeId === editEmployee.employeeId ? editEmployee : emp
          )
        );
        setEditEmployee(null);
        setIsEditing(false);
      } else {
        console.error('Error updating employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(
        `https://access-platform.azurewebsites.net/api/employees/delete/${employeeId}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );

      if (response.data.success) {
        setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
      } else {
        console.error('Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editEmployee) {
      setEditEmployee({ ...editEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  return (
    <div>
      <UserDashboardNavbar />
      <div className="employee-management-container">
        <h1 className="page-title">Employee Management</h1>

        {/* Add Employee Form Toggle */}
        <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Add Employee'}
        </button>

        {isAdding && (
  <div className="modal-overlay">
    <div className="employee-modal">
      <h2>Add New Employee</h2>
      <input
        type="text"
        name="employeeName"
        placeholder="Employee Name"
        value={newEmployee.employeeName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={newEmployee.role}
        onChange={handleChange}
      />
      <input
        type="text"
        name="level"
        placeholder="Experience Level"
        value={newEmployee.level}
        onChange={handleChange}
      />
      <input
        type="text"
        name="technologyLevel"
        placeholder="Technology Level"
        value={newEmployee.technologyLevel}
        onChange={handleChange}
      />
      <button  onClick={handleAddEmployee}>Add Employee</button>
      <button className="close-btn" onClick={() => setIsAdding(false)}>Cancel</button>
    </div>
  </div>
)}


{editEmployee && (
  <div className="modal-overlay">
    <div className="employee-modal">
      <h2>Edit Employee</h2>
      <input
        type="text"
        name="employeeName"
        placeholder="Employee Name"
        value={editEmployee.employeeName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={editEmployee.role}
        onChange={handleChange}
      />
      <input
        type="text"
        name="level"
        placeholder="Experience Level"
        value={editEmployee.level}
        onChange={handleChange}
      />
      <input
        type="text"
        name="technologyLevel"
        placeholder="Technology Level"
        value={editEmployee.technologyLevel}
        onChange={handleChange}
      />
      <button onClick={handleUpdateEmployee}>Update Employee</button>
      <button className="close-btn" onClick={() => setEditEmployee(null)}>Cancel</button>
    </div>
  </div>
)}


        <div className="employee-card-grid">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div key={employee.employeeId} className="employee-card">
                <h2>{employee.employeeName}</h2>
                <p><strong>Role:</strong> {employee.role}</p>
                <p><strong>Experience Level:</strong> {employee.level}</p>
                <p><strong>Technology Level:</strong> {employee.technologyLevel}</p>
                <button className="edit-btn"
                  onClick={() => { 
                    console.log("Editing employee:", employee);
                    setEditEmployee({ ...employee });
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.employeeId)}>Delete</button>
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

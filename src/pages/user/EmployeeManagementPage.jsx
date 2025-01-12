import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Navbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/EmployeeManagementPage.css'; // Import custom styles

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details modal
  const [showModal, setShowModal] = useState(false); // Modal state

  // Fetch employees from the backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Open modal to show employee details
  const handleShowDetails = (employeeId) => {
    const employee = employees.find((e) => e.employeeId === employeeId);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // Define table columns
  const columns = [
    { name: 'ID', selector: (row) => row.employeeId, sortable: true },
    { name: 'Name', selector: (row) => row.employeeName, sortable: true },
    { name: 'Role', selector: (row) => row.role, sortable: true },
    { name: 'Experience Level', selector: (row) => row.experienceLevel, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <Button variant="info" onClick={() => handleShowDetails(row.employeeId)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="employee-management-container">
        <h1>Employee Management</h1>
        <DataTable columns={columns} data={employees} pagination />

        {/* Employee Details Modal */}
        {selectedEmployee && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>ID:</strong> {selectedEmployee.employeeId}</p>
              <p><strong>Name:</strong> {selectedEmployee.employeeName}</p>
              <p><strong>Role:</strong> {selectedEmployee.role}</p>
              <p><strong>Experience Level:</strong> {selectedEmployee.experienceLevel}</p>
              <p><strong>Skills:</strong> {selectedEmployee.skills.join(', ')}</p>
              <p><strong>Provider ID:</strong> {selectedEmployee.providerId}</p>
              <p><strong>Service Request ID:</strong> {selectedEmployee.serviceRequestId}</p>
              <p>
                <strong>Resume:</strong>{' '}
                <a href={selectedEmployee.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EmployeeManagementPage;

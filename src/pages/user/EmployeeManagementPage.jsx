import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Navbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/EmployeeManagementPage.css';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For "Details"
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Details modal state
  const [showFormModal, setShowFormModal] = useState(false); // Add/Edit modal state
  const [formData, setFormData] = useState({
    employeeName: '',
    role: '',
    experienceLevel: '',
    skills: '',
    providerId: '',
    serviceRequestId: '',
    resumeUrl: '',
  }); // Form data
  const [isEditing, setIsEditing] = useState(false); // Track editing state

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

  const handleShowDetails = (employeeId) => {
    const employee = employees.find((e) => e.employeeId === employeeId);
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleShowForm = (employee = null) => {
    if (employee) {
      setIsEditing(true);
      setFormData({
        ...employee,
        skills: employee.skills.join(', '), // Convert array to string
      });
    } else {
      setIsEditing(false);
      setFormData({
        employeeName: '',
        role: '',
        experienceLevel: '',
        skills: '',
        providerId: '',
        serviceRequestId: '',
        resumeUrl: '',
      });
    }
    setShowFormModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowFormModal(false);
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/employees/${formData.employeeId}`, {
          ...formData,
          skills: formData.skills, // Already in string format
        });
      } else {
        await axios.post('http://localhost:5001/api/employees', {
          ...formData,
          skills: formData.skills, // Already in string format
        });
      }
      fetchEmployees(); // Refresh data
      handleCloseModal(); // Close modal
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5001/api/employees/${employeeId}`);
        fetchEmployees(); // Refresh data
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const columns = [
    { name: 'ID', selector: (row) => row.employeeId, sortable: true },
    { name: 'Name', selector: (row) => row.employeeName, sortable: true },
    { name: 'Role', selector: (row) => row.role, sortable: true },
    { name: 'Experience Level', selector: (row) => row.experienceLevel, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button variant="info" onClick={() => handleShowDetails(row.employeeId)} className="action-button">
            Details
          </Button>
          <Button
            variant="warning"
            onClick={() => handleShowForm(row)}
            className="action-button"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(row.employeeId)}
            className="action-button"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="employee-management-container">
        <h1>Employee Management</h1>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Employee
        </Button>
        <div className="table-container">
          <DataTable
            columns={columns}
            data={employees}
            pagination
            highlightOnHover
          />
        </div>

        {selectedEmployee && (
          <Modal show={showDetailsModal} onHide={handleCloseModal}>
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

        <Modal show={showFormModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="employeeName" value={formData.employeeName} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" name="role" value={formData.role} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience Level</Form.Label>
                <Form.Control type="text" name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                <Form.Control type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Comma-separated (e.g., React, JavaScript)" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Provider ID</Form.Label>
                <Form.Control type="text" name="providerId" value={formData.providerId} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Service Request ID</Form.Label>
                <Form.Control type="text" name="serviceRequestId" value={formData.serviceRequestId} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resume URL</Form.Label>
                <Form.Control type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isEditing ? 'Update Employee' : 'Add Employee'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeManagementPage;

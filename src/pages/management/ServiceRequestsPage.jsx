import React, { useEffect, useState } from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar'; 
import Footer from '@/components/Footer'; 
import { useNavigate } from 'react-router-dom';   
import axios from 'axios';  
import '@/styles/ServiceRequestsPage.css'; 

const ServiceRequestsPage = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRequests, setExpandedRequests] = useState({});
  const [employees, setEmployees] = useState([]); // Store fetched employees
  const [attachedEmployees, setAttachedEmployees] = useState({}); // Store attached employees for each request
  const [showDropdown, setShowDropdown] = useState({}); // Manage visibility of employee dropdown for each request
  const [loadingEmployees, setLoadingEmployees] = useState(false); // To prevent multiple fetches of employees
  const navigate = useNavigate();

  const providerId = localStorage.getItem('providerId');
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  useEffect(() => {
    const fetchRequests = async () => {
      if (!providerId) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8080/api/service-request/published/${providerId}`);
        setServiceRequests(response.data || []);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Failed to load service requests.');
        setServiceRequests([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [providerId]);

  const toggleDetails = (serviceRequestId) => {
    setExpandedRequests((prevExpandedRequests) => ({
      ...prevExpandedRequests,
      [serviceRequestId]: !prevExpandedRequests[serviceRequestId],
    }));
  };

  const handleAttachEmployee = (serviceRequestId, employeeId) => {
    setAttachedEmployees((prev) => {
      const currentEmployees = prev[serviceRequestId] || [];
      if (!currentEmployees.includes(employeeId)) {
        // Add the new employee to the list
        const updatedEmployees = [...currentEmployees, employeeId];
        return {
          ...prev,
          [serviceRequestId]: updatedEmployees,
        };
      }
      return prev;
    });
    // Do not hide the dropdown after selecting an employee
  };

  const fetchEmployees = async () => {
    if (loadingEmployees) return;
    setLoadingEmployees(true);

    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${providerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };
  const removeEmployee = (serviceRequestId, employeeId) => {
    setAttachedEmployees((prev) => {
      const updatedEmployees = prev[serviceRequestId].filter(id => id !== employeeId);
      return {
        ...prev,
        [serviceRequestId]: updatedEmployees,
      };
    });
  };

  const submitServiceRequest = async (serviceRequestId) => {
    try {
      if (!attachedEmployees[serviceRequestId] || attachedEmployees[serviceRequestId].length === 0) {
        alert("Please attach at least one employee to the member before submitting the request.");
        return;
      }

      const response = await axios.post('http://localhost:8080/api/service-request/published', {
        serviceRequestId: serviceRequestId,
      });

      if (response.status === 200) {
        alert(`Service request with ID ${serviceRequestId} has been successfully published!`);
        setServiceRequests(serviceRequests.filter(request => request.ServiceRequestId !== serviceRequestId));
      }
    } catch (err) {
      console.error('Error publishing service request:', err);
      alert('Failed to publish service request.');
    }
  };

  if (loading) {
    return <div>Loading service requests...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <UserDashboardNavbar />
      <div className="service-requests-container">
        <h1>Service Requests</h1>
        {serviceRequests.length === 0 ? (
          <p>No service requests available.</p>
        ) : (
          <div className="service-requests-grid">
            {serviceRequests.map((request) => (
              <div className="service-card" key={request.ServiceRequestId}>
                <h3>{request.project}</h3>
                <p><strong>Task:</strong> {request.taskDescription}</p>
                <p><strong>Location:</strong> {request.location}</p>
                <p><strong>Type:</strong> {request.type}</p>
                <p><strong>Number of Specialists:</strong> {request.numberOfSpecialists}</p>
                <p><strong>Agreement Name:</strong> {request.agreementName}</p>
                <p><strong>Consumer:</strong> {request.consumer}</p>

                <button onClick={() => toggleDetails(request.ServiceRequestId)} className="view-details-btn">
                  {expandedRequests[request.ServiceRequestId] ? 'Hide Details' : 'View Details'}
                </button>

                {expandedRequests[request.ServiceRequestId] && (
                  <div className="members-details">
                    {request.selectedMembers?.map((member, index) => (
                      <div className="member-card" key={`${request.ServiceRequestId}-${index}`}>
                        <h4>{member.role}</h4>
                        <p><strong>Domain:</strong> {member.domainName}</p>
                        <p><strong>Level:</strong> {member.level}</p>
                        <p><strong>Tech Level:</strong> {member.technologyLevel}</p>

                        <button
                          className="attach-employee-btn"
                          onClick={() => {
                            fetchEmployees(); // Fetch employees when button is clicked
                            setShowDropdown((prev) => ({
                              ...prev,
                              [request.ServiceRequestId]: true, // Keep dropdown visible
                            }));
                          }}
                        >
                          Attach Employee
                        </button>

                        {showDropdown[request.ServiceRequestId] && (
                          <div className="employee-list">
                            <select
                              onChange={(e) => handleAttachEmployee(request.ServiceRequestId, e.target.value)}
                              value=""
                            >
                              <option value="">Select Employee</option>
                              {employees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                  {employee.employeeName}
                                </option>
                              ))}
                            </select>

                            <div className="attached-employees">
                              <strong>Attached Employees:</strong>
                              <ul>
                                {attachedEmployees[request.ServiceRequestId]?.map((empId) => {
                                  const employee = employees.find(emp => emp.employeeId === empId);
                                  return employee ? (
                                    <li key={empId}>
                                      {employee.employeeName}
                                      <button
                                        className="remove-employee-btn"
                                        onClick={() => removeEmployee(request.ServiceRequestId, empId)}
                                      >
                                        ✖
                                      </button>
                                    </li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => submitServiceRequest(request.ServiceRequestId)}
                  className="submit-btn"
                  disabled={!(attachedEmployees[request.ServiceRequestId] && attachedEmployees[request.ServiceRequestId].length)}
                >
                  Submit Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
           
};

export default ServiceRequestsPage;

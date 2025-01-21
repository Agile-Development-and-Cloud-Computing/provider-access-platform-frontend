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
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  ; // To prevent multiple fetches of employees
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



  const handleAttachEmployee = (serviceRequestId, role, employeeId) => {
    setAttachedEmployees((prev) => {
      const currentRequest = prev[serviceRequestId] || {};
      const currentRoleEmployees = currentRequest[role] || [];
  
      // Prevent duplicate entries
      if (!currentRoleEmployees.includes(employeeId)) {
        const updatedRoleEmployees = [...currentRoleEmployees, employeeId];
  
        return {
          ...prev,
          [serviceRequestId]: {
            ...currentRequest,
            [role]: updatedRoleEmployees,
          },
        };
      }
      return prev;
    });
  
    console.log(`Employee ${employeeId} attached to role ${role} in request ${serviceRequestId}`);
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
      console.log("Employees" + response.data.data )
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };
  const removeEmployee = (serviceRequestId, role, employeeId) => {
    setAttachedEmployees((prev) => {
      const updatedRoleEmployees = prev[serviceRequestId]?.[role]?.filter(id => id !== employeeId) || [];
      
      return {
        ...prev,
        [serviceRequestId]: {
          ...prev[serviceRequestId],
          [role]: updatedRoleEmployees,
        },
      };
    });
  
    console.log(`Employee ${employeeId} removed from role ${role} in request ${serviceRequestId}`);
  };

  // Fetch employees when clicking Attach Employee
  const handleFetchEmployees = (serviceRequestId, role) => {
    fetchEmployees();
    setShowDropdown((prev) => ({
      ...prev,
      [`${serviceRequestId}-${role}`]: true,  // Use unique key per serviceRequest & role
    }));
  };
  // Submit service request with employee-role assignments
const submitServiceRequest = async (serviceRequestId) => {
  try {
    if (!attachedEmployees[serviceRequestId]) {
      alert("Please attach at least one employee before submitting.");
      return;
    }

    const requestData = {
      serviceRequestId,
      assignedEmployees: attachedEmployees[serviceRequestId], // Sending attached employees by role
    };

    console.log("Submitting request:", requestData);

    const response = await axios.post('http://localhost:8080/api/service-request/published', requestData);

    if (response.status === 200) {
      alert(`Service request with ID ${serviceRequestId} successfully submitted.`);
      setServiceRequests(serviceRequests.filter(request => request.ServiceRequestId !== serviceRequestId));
    }
  } catch (err) {
    console.error('Error submitting request:', err);
    alert('Failed to submit service request.');
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
  
                <button onClick={() => toggleDetails(request.ServiceRequestId)} className="view-details-btn">
                  {expandedRequests[request.ServiceRequestId] ? 'Hide Details' : 'View Details'}
                </button>
  
                {expandedRequests[request.ServiceRequestId] && (
                  <div className="members-details">
                    {request.selectedMembers?.map((member, index) => (
                      <div className="member-card" key={`${request.ServiceRequestId}-${index}`}>
                        <h4>{member.role}</h4>
                        <p><strong>Domain:</strong> {member.domainName}</p>
  
                        <button
                          className="attach-employee-btn"
                          onClick={() => handleFetchEmployees(request.ServiceRequestId, member.role)}
                        >
                          Attach Employee
                        </button>
  
                        {showDropdown[`${request.ServiceRequestId}-${member.role}`] && (
                          <div className="employee-list">
                            <select
  onChange={(e) => handleAttachEmployee(request.ServiceRequestId, member.role, e.target.value)}
  value=""
>
  <option value="">Select Employee</option>
  {employees.map((employee) => (
    <option key={employee.employeeId} value={employee.employeeId}>
      {employee.employeeName} - {employee.role}
    </option>
  ))}
</select>
  
                            <div className="attached-employees">
                              <strong>Attached Employees:</strong>
                              <ul>
                                  {attachedEmployees[request.ServiceRequestId]?.[member.role]?.map((empId) => {
                           const employee = employees.find(emp => emp.employeeId === parseInt(empId));
                        return employee ? (
        <li key={empId}>
          {employee.employeeName} ({employee.role})
          <button
            className="remove-employee-btn"
            onClick={() => removeEmployee(request.ServiceRequestId, member.role, empId)}
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
                  disabled={!(attachedEmployees[request.ServiceRequestId] && Object.keys(attachedEmployees[request.ServiceRequestId]).length > 0)}
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

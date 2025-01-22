import React, { useEffect, useState } from "react";
import UserDashboardNavbar from "@/components/UserDashboardNavbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/ServiceRequestsPage.css";

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

  const providerId = localStorage.getItem("providerId");
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  useEffect(() => {
    const fetchRequests = async () => {
      if (!providerId) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/api/service-request/published/${providerId}`,
        );
        setServiceRequests(response.data || []);
        console.log("Request Data before submission:", response.data);
  
      } catch (err) {
        console.error("Error fetching service requests:", err);
        setError("Failed to load service requests.");
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

    console.log(
      `Employee ${employeeId} attached to role ${role} in request ${serviceRequestId}`,
    );
  };

  const fetchEmployees = async () => {
    if (loadingEmployees) return;
    setLoadingEmployees(true);

    try {
      const response = await axios.get(
        `https://access-platform.azurewebsites.net/api/employees/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        },
      );
      console.log("Employees" + response.data.data);
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };
  const removeEmployee = (serviceRequestId, role, employeeId) => {
    setAttachedEmployees((prev) => {
      const updatedRoleEmployees =
        prev[serviceRequestId]?.[role]?.filter((id) => id !== employeeId) || [];

      return {
        ...prev,
        [serviceRequestId]: {
          ...prev[serviceRequestId],
          [role]: updatedRoleEmployees,
        },
      };
    });

    console.log(
      `Employee ${employeeId} removed from role ${role} in request ${serviceRequestId}`,
    );
  };

  // Fetch employees when clicking Attach Employee
  const handleFetchEmployees = (serviceRequestId, role) => {
    fetchEmployees();
    setShowDropdown((prev) => ({
      ...prev,
      [`${serviceRequestId}-${role}`]: true, // Use unique key per serviceRequest & role
    }));
  };
  const submitServiceRequest = async (request) => {
    try {
      // Log out the requestData to debug date fields
      console.log("Request Data before submission:", request);
  
      // Check if begin and end fields are missing or null
      if (!request.begin || !request.end) {
        console.error("Missing begin or end in the request data");
        alert("Please ensure that both begin and end dates are selected.");
        return;
      }
  
      // Ensure date formatting is correct (ISO format: YYYY-MM-DD)
      const formattedStartDate = new Date(request.begin).toISOString().split('T')[0];
      const formattedEndDate = new Date(request.end).toISOString().split('T')[0];

      // Update the requestData with formatted dates
      const requestData = {
        requestID: request.ServiceRequestId,
        masterAgreementID: request.agreementId, // Use correct field name if needed
        masterAgreementName: request.agreementName,
        taskDescription: request.taskDescription,
        requestType: request.type,
        project: request.project,
        startDate: formattedStartDate, // Updated field name
        endDate: formattedEndDate, // Updated field name
        cycleStatus: request.cycleStatus,
        numberOfSpecialists: request.numberOfSpecialists,
        numberOfOffers: request.numberOfOffers,
        createdBy: request.createdBy,
        isApproved: request.isApproved || false,
        serviceOffers: Object.entries(attachedEmployees[request.ServiceRequestId] || {}).map(
          ([role, employeeIds]) => {
            return employeeIds.map((empId) => {
              const employee = employees.find((emp) => String(emp.employeeId) === String(empId));

              // Check if selectedMembers exist and get the relevant member details
              const selectedMember = request.selectedMembers?.find(member => member.role === role) || {};

              return {
                providerID: providerId,
                providerName: "Mandar Kale", // Replace with actual provider name
                employeeID: empId,
                role: employee.role,
                level: employee.level,
                technologyLevel: employee.technology_level,
                locationType: request.locationType,
                domainId: selectedMember.domainId,
                domainName: selectedMember.domainName,
                userId: selectedMember._id
              };
            });
          }
        ).flat(),
      };
  
      console.log("Submitting request:", requestData); // Debug the requestData before submitting
      console.log("Request Payload:", JSON.stringify(requestData, null, 2));

  
      const response = await axios.post(
        "http://localhost:8080/api/service-request/submit",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        },
      );
  
      if (response.status === 200) {
        alert(`Service request with ID ${requestData.serviceRequestId} successfully submitted.`);
        setServiceRequests(
          serviceRequests.filter((serviceRequest) => serviceRequest.ServiceRequestId !== requestData.serviceRequestId)
        );
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Failed to submit service request.");
    }
  };
  
  

  if (loading) {
    return <div>Loading service requests...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
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
                <p>
                  <strong>Task:</strong> {request.taskDescription}
                </p>
                <p>
                  <strong>Location:</strong> {request.location}
                </p>
                <p>
                  <strong>Type:</strong> {request.type}
                </p>
                <p>
                  <strong>Number of Specialists:</strong>{" "}
                  {request.numberOfSpecialists}
                </p>
                <p>
                  <strong>Agreement Name:</strong> {request.agreementName}
                </p>
                <p>
                  <strong>Consumer:</strong> {request.consumer}
                </p>
                <p>
                  <strong>Begin Date:</strong> {request.begin}
                </p>
                <p>
                  <strong>End Date:</strong> {request.end}
                </p>
                <p>
                  <strong>Number of Offers:</strong> {request.numberOfOffers}
                </p>
                <p>
                  <strong>Created By:</strong> {request.createdBy ? request.createdBy : "Not Provided"}
                </p>
                <button
                  onClick={() => toggleDetails(request.ServiceRequestId)}
                  className="view-details-btn"
                >
                  {expandedRequests[request.ServiceRequestId]
                    ? "Hide Details"
                    : "View Details"}
                </button>

                {expandedRequests[request.ServiceRequestId] && (
                  <div className="members-details">
                    {request.selectedMembers?.map((member, index) => (
                      <div
                        className="member-card"
                        key={`${request.ServiceRequestId}-${index}`}
                      >
                        <h4>{member.role}</h4>
                        <p>
                          <strong>Domain:</strong> {member.domainName}
                        </p>
                        <p>
                          <strong>Level:</strong> {member.level}
                        </p>
                        <p>
                          <strong>Tech Level:</strong> {member.technologyLevel}
                        </p>
                        <p>
                          <strong>Employee needed:</strong> {member.numberOfEmployee}
                        </p>
                        <button
                          className="attach-employee-btn"
                          onClick={() =>
                            handleFetchEmployees(
                              request.ServiceRequestId,
                              member.role,
                            )
                          }
                        >
                          Attach Employee
                        </button>

                        {showDropdown[
                          `${request.ServiceRequestId}-${member.role}`
                        ] && (
                          <div className="employee-list">
                            <select
                              onChange={(e) =>
                                handleAttachEmployee(
                                  request.ServiceRequestId,
                                  member.role,
                                  e.target.value,
                                )
                              }
                              value=""
                            >
                              <option value="">Select Employee</option>
                              {employees.map((employee) => (
                                <option
                                  key={employee.employeeId}
                                  value={employee.employeeId}
                                >
                                  {employee.employeeName} - {employee.level} - {employee.technology_level}
                                </option>
                              ))}
                            </select>

                            <div className="attached-employees">
                              <strong>
                                Attached Employees:{" "}
                                <span className="employee-count-badge">
                                  {attachedEmployees[
                                    request.ServiceRequestId
                                  ]?.[member.role]?.length || 0}{" "}
                                  attached
                                </span>
                              </strong>
                              <ul>
                                {attachedEmployees[request.ServiceRequestId]?.[
                                  member.role
                                ]?.map((empId) => {
                                  const employee = employees.find(
                                    (emp) => emp.employeeId === parseInt(empId),
                                  );
                                  return employee ? (
                                    <li key={empId}>
                                      <strong>Name:</strong>{" "}
                                      {employee.employeeName} <br />
                                      <strong>Role:</strong> {employee.role}{" "}
                                      <br />
                                      <strong>Level:</strong> {employee.level}{" "}
                                      <br />
                                      <strong>Tech Skills:</strong>{" "}
                                      {employee.technology_level} <br />
                                      <button
                                        className="remove-employee-btn"
                                        onClick={() =>
                                          removeEmployee(
                                            request.ServiceRequestId,
                                            member.role,
                                            empId,
                                          )
                                        }
                                      >
                                        ✖ Remove
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
                  onClick={() => submitServiceRequest(request)}
                  className="submit-btn"
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

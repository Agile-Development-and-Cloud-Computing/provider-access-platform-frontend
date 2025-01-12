import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import EmployeeManagementPage from '../user/EmployeeManagementPage'; // Import Employee Management
import '../../styles/UserDashboard.css';

const UserDashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [error, setError] = useState(null);
  const [showEmployeeManagement, setShowEmployeeManagement] = useState(false); // Toggle state

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/employees');
        setEmployeeCount(response.data.length);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employee data.');
      }
    };

    fetchEmployees();
  }, []);

  if (showEmployeeManagement) {
    return <EmployeeManagementPage />; // Render EmployeeManagementPage if toggled
  }

  return (
    <>
      <UserNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">User Dashboard</h1>

        <div className="kpi-container">
          <div className="kpi-card">
            <h2>Active Service Requests</h2>
            <p>5</p>
          </div>
          <div className="kpi-card">
            <h2>Submitted Bids</h2>
            <p>8</p>
          </div>
          <div className="kpi-card">
            <h2>Employees Assigned</h2>
            <p>{employeeCount}</p>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>View Offers</h2>
            <p>Browse and bid on active offers for master agreements.</p>
            <button onClick={() => window.location.href = '/view-offers'}>
              View Offers
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Service Requests</h2>
            <p>Track active and completed service requests. Assign employees to requests.</p>
            <button onClick={() => window.location.href = '/service-requests'}>
              View Service Requests
            </button>
          </div>
          <div className="dashboard-card">
            <h2>Employee Management</h2>
            <p>Manage employee profiles and assign them to offers or service requests.</p>
            <button onClick={() => setShowEmployeeManagement(true)}> {/* Toggle Employee Management */}
              Manage Employees
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;

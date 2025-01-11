import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user-related data from localStorage
    localStorage.removeItem('loggedInUser');

    // Redirect to the login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="logout-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Logging out...</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default LogoutPage;

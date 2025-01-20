// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import authService from '@/services/authService'; 

const LoginPage = () => {
  // State to manage form inputs (username and password)
  const [formData, setFormData] = useState({ username: '', password: '' });

  // State to manage error messages and loading status
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hook for navigation after successful login
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update specific field dynamically
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Indicate loading state
    setError(null); // Clear any previous errors

    try {
      // Send login request via authService
      const response = await authService.login(formData);
      console.log('Login successful:', response.data);

      // Store token or identifier securely (use cookies in production for sensitive data)
      localStorage.setItem('authToken', response.data.token);

      // Redirect based on user role
      const { userType } = response.data.data;
      if (userType === 'Admin') {
        navigate('/dashboard/admin'); // Admin user redirects to admin dashboard
      } else if (userType === 'User') {
        navigate('/dashboard/user'); // Regular user redirects to user dashboard
      } else {
        setError('Invalid user role.'); // Handle unexpected roles
      }
    } catch (err) {
      // Handle error response from the API
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <p>Access your provider account:</p>
        <form onSubmit={handleSubmit}>
          {/* Input for username or email */}
          <label>
            Username or Email:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter email or username"
              required
            />
          </label>
          {/* Input for password */}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </label>
          {/* Error message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* Submit button with loading state */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
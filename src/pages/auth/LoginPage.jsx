import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import authService from '../../services/authService'; // Import centralized API service

const LoginPage = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' }); // Unified field for email/username
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use authService for login
      const response = await authService.login(formData);
      console.log('Login successful:', response.data);

      // Save the logged-in user's identifier to localStorage
      localStorage.setItem('loggedInUser', formData.identifier);

      // Redirect based on user role
      const { userType } = response.data.data;
      if (userType === 'Admin') {
        navigate('/dashboard/admin');
      } else if (userType === 'User') {
        navigate('/dashboard/user');
      } else {
        setError('Invalid user role.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <p>Access your provider account:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email:
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="Enter email or username"
              required
            />
          </label>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
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

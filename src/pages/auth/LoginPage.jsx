// File: src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@/styles/LoginPage.css';


const LoginPage = () => {
  const { login } = useAuth(); // Access login function from AuthContext
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to log in with credentials:', formData); // Debug login attempt
      await login(formData); // Call login function from AuthContext

      // Determine user role from localStorage
      const userRole = localStorage.getItem('userType');
      console.log('Retrieved user role:', userRole); // Debug retrieved role

      // Navigate based on role
      if (userRole === 'Admin') {
        console.log('Redirecting to admin dashboard...');
        navigate('/dashboard/admin'); // Navigate to Admin dashboard
      } else if (userRole === 'User') {
        console.log('Redirecting to user dashboard...');
        navigate('/dashboard/user'); // Navigate to User dashboard
      } else {
        setError('Invalid role assigned to user.');
        console.error('Unexpected user role:', userRole); // Debug unexpected role
      }
    } catch (err) {
      console.error('Login error:', err); // Debug login error
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Please enter your credentials to log in:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

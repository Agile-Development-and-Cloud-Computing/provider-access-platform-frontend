// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import authService from '@/services/authService'; 

const RegisterPage = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    providerName: '',
    adminUsername: '',
    password: '',
    confirmPassword: '',
  });

  // State to manage errors
  const [error, setError] = useState(null);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setError(null); // Clear previous errors

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Send register request via authService
      const response = await authService.register(formData);
      console.log('Registration successful:', response.data);

      // Redirect user after successful registration
      // Navigate to login or dashboard based on flow
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1>Register</h1>
        <p>Create a provider account to start using the platform:</p>
        <form onSubmit={handleSubmit}>
          {/* Input for provider name */}
          <label>
            Provider Name:
            <input
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleInputChange}
              required
            />
          </label>
          {/* Input for admin username */}
          <label>
            Admin Username:
            <input
              type="text"
              name="adminUsername"
              value={formData.adminUsername}
              onChange={handleInputChange}
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
              required
            />
          </label>
          {/* Input for confirm password */}
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </label>
          {/* Error message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* Submit button */}
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;

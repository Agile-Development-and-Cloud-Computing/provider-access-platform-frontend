// File: src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import '@/styles/PublicPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    providerName: '',
    adminUsername: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Simulate registration logic
      console.log('Registered successfully:', formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container register-container">
      <h1>Register</h1>
      <p>Create a provider account to start using the platform:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="providerName">Provider Name</label>
        <input
          type="text"
          id="providerName"
          name="providerName"
          value={formData.providerName}
          onChange={handleInputChange}
          placeholder="Enter your provider name"
          required
        />
        <label htmlFor="adminUsername">Admin Username</label>
        <input
          type="text"
          id="adminUsername"
          name="adminUsername"
          value={formData.adminUsername}
          onChange={handleInputChange}
          placeholder="Enter the admin username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Re-enter your password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios'; // Use axios for making HTTP requests

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const response = await axios.post('http://access-platform.azurewebsites.net/api/login', formData);
      //const response = await axios.post('https://cors-anywhere.herokuapp.com/http://access-platform.azurewebsites.net/api/login', formData);

      if (response.data.success) {
        console.log('Login successful:', response.data);
        alert(response.data.message);
        
        navigate('/dashboard');
        // Navigate to dashboard based on userType
        //if (response.data.data.userType === 'Admin') {
        //  navigate('/dashboard/admin'); // Admin dashboard
        //} else {
        //    navigate('/dashboard/user'); // User dashboard
        //} 
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <p>Access your provider account by logging in below:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
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

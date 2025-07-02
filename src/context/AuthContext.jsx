// File: src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to track initialization
  const [error, setError] = useState(null); // Error state for global errors

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      console.log('Loading user from localStorage...');
      const token = localStorage.getItem('authToken');
      const providerId = localStorage.getItem('providerId');
      const userName = localStorage.getItem('userName');
      const userType = localStorage.getItem('userType');

      if (token && providerId && userName && userType) {
        console.log('User data found in localStorage:', { token, providerId, userName, userType });
        setUser({ token, providerId, userName, role: userType });
      } else {
        console.log('No user data found in localStorage.');
      }
      setLoading(false); // Set loading to false after checking localStorage
    };

    loadUserFromLocalStorage();
  }, []);

  const login = async (credentials) => {
    setError(null); // Clear any previous errors
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await authService.login(credentials);
      console.log('Login response:', response);

      const { token, userType, providerName, providerId } = response.data;

      // Validate the role
      if (!['Admin', 'User'].includes(userType)) {
        throw new Error('Invalid role assigned to user.');
      }

      // Save user data in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('providerId', providerId);
      localStorage.setItem('userName', providerName);
      localStorage.setItem('userType', userType);

      // Update the user state
      setUser({ token, providerId, userName: providerName, role: userType });
      console.log('User logged in successfully:', { token, providerId, userName: providerName, role: userType });
    } catch (err) {
      console.error('Login error:', err.message || err);
      setError(err.message || 'Failed to login. Please try again.');
      throw err; // Re-throw the error to handle it in the calling component
    }
  };

  const logout = () => {
    console.log('Logging out user...');
    localStorage.clear();
    setUser(null);
    console.log('User logged out and localStorage cleared.');
  };

  const isAuthenticated = () => {
    return !!user; // Return true if the user is authenticated
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

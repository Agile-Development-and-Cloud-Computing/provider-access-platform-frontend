import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      console.log('Loading user from localStorage...');

      const token = localStorage.getItem('authToken');
      const providerId = localStorage.getItem('providerId');
      const userName = localStorage.getItem('userName'); // e.g., 'John Doe'
      const userType = localStorage.getItem('userType'); // e.g., 'Admin' or 'User'

      if (token && providerId && userName && userType) {
        console.log('User data found in localStorage:', { token, providerId, userName, userType });
        setUser({ token, providerId, userName, role: userType });
      } else {
        console.log('No user data found in localStorage.');
      }
    };

    loadUserFromLocalStorage();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    console.log('Login response:', response);
  
    const { token, userType, providerName, providerId } = response.data;
  
    // Validate the role
    if (!['Admin', 'User'].includes(userType)) {
      console.error('Invalid user role received:', userType);
      throw new Error('Invalid role assigned to user.');
    }
  
    // Save user data in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('providerId', providerId);
    localStorage.setItem('userName', providerName); // Use providerName instead of userName
    localStorage.setItem('userType', userType);
  
    // Update the user state
    setUser({ token, providerId, userName: providerName, role: userType });
    console.log('User logged in successfully:', { token, providerId, userName: providerName, role: userType });
  };
  

  const logout = () => {
    console.log('Logging out user...');
    localStorage.clear();
    setUser(null);
    console.log('User logged out and localStorage cleared.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

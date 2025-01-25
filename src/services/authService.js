// File: src/services/authService.js
import apiClient from '@/services/apiClient';

const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

const getUserDetails = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};

export default {
  login,
  getUserDetails,
};

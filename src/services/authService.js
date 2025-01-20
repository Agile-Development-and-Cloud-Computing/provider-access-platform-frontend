// src/services/authService.js
import apiClient from '@/services/apiClient'; 

const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

export default {
  login,
};

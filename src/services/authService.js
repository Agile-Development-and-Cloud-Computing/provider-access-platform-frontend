// src/services/authService.js
//import { group3apiClient as apiClient } from '@/services/apiClient'; 
import apiClient from '@/services/apiClient'; 

const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

export default {
  login,
};

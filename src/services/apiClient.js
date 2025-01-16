// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  //baseURL: 'http://localhost:5000/api', // Base API URL
  baseURL: 'http://access-platform.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

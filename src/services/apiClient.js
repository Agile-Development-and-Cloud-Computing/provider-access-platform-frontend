import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // Base API URL
  timeout: 5000, // Timeout for API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

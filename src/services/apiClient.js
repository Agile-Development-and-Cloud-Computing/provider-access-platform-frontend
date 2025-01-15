import axios from 'axios';

const apiClient = axios.create({
  //baseURL: 'http://localhost:5001/api', // Base API URL
  baseURL: 'http://access-platform.azurewebsites.net/api/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

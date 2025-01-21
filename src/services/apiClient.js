// File: src/services/apiClient.js
import axios from 'axios';
import API_CONFIG from '@/config/apiConfig';

// Create Axios instances for different API groups
const group1apiClient = axios.create({
  baseURL: API_CONFIG.GROUP_1,
  headers: {
    'Content-Type': 'application/json',
  },
});

const group2apiClient = axios.create({
  baseURL: API_CONFIG.GROUP_2,
  headers: {
    'Content-Type': 'application/json',
  },
});

const group3apiClient = axios.create({
  baseURL: API_CONFIG.GROUP_3,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export all clients as named exports
export { group1apiClient, group2apiClient, group3apiClient };


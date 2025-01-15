import apiClient from './apiClient'; // Import the shared API client

const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

export default {
  login,
};

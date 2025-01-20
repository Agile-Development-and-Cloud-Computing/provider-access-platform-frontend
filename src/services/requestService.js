// src/services/requestService.js

import apiClient from '@/services/apiClient';

const getRequests = async () => {
  try {
    const response = await apiClient.get('/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error;
  }
};

export default { getRequests };

// src/services/requestService.js
import { group2apiClient as apiClient } from '@/services/apiClient'; // Updated to use group2apiClient

const getRequests = async () => {
  try {
    const response = await apiClient.get('/service-requests/published'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error;
  }
};

export default { getRequests };

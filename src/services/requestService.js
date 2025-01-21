// src/services/requestService.js
import { group2apiClient as apiClient } from '@/services/apiClient'; 

// Function to fetch service requests based on providerId
const getRequests = async () => {
  const token = localStorage.getItem('authToken');
  const providerId = localStorage.getItem('providerId');

  if (!token || !providerId) {
    throw new Error('Unauthorized: Token or providerId not found');
  }

  try {
    const response = await apiClient.get('/published', {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
      params: {
        providerId, 
      },
    });

    if (!response.data || !response.data.success) {
      throw new Error('Invalid API response');
    }

    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch service requests");
  }
};

// Function to accept/reject service requests
const respondToRequest = async (requestId, isAccepted) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('Unauthorized: Token not found');
  }

  const response = await apiClient.post(`/request/${requestId}/response`, {
    isAccepted,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getRequests,
  respondToRequest,
};

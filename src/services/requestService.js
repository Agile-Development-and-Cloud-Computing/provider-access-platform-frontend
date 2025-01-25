// src/services/serviceRequest.js
//import { group3apiClient as apiClient } from '@/services/apiClient'; 
import apiClient from '@/services/apiClient';

// Fetch service requests
export const fetchServiceRequests = async (providerId) => {
  try {
    const response = await apiClient.get(`/service-request/published/${providerId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching service requests:", error);
    throw error;
  }
};

// Fetch employees
export const fetchEmployees = async (providerId, token) => {
  try {
    const response = await apiClient.get(`/employees/${providerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Submit a service request
export const submitServiceRequest = async (requestData, token) => {
  try {
    const response = await apiClient.post('/service-request/submit', requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error submitting service request:", error);
    throw error;
  }
};

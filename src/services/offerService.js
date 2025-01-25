// src/services/offerService.js
//import { group2apiClient as apiClient } from '@/services/apiClient'; 
import apiClient from '@/services/apiClient'; 

const getOffers = async () => {
  try {
    const response = await apiClient.get('/offers');
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export default { getOffers };


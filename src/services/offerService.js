// src/services/offerService.js

import apiClient from './apiClient';

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

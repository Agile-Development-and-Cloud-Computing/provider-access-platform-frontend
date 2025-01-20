// src/services/masterAgreementService.js
import apiClient from '@/services/apiClient';

const getMasterAgreements = async () => {
  const response = await apiClient.get('/provider/master-agreements');
  return response.data;
};

const placeBid = async (bidData) => {
  const response = await apiClient.post('/provider/bid', bidData);
  return response.data;
};

export default {
  getMasterAgreements,
  placeBid,
};


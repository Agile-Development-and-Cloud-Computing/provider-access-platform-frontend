// src/services/dashboardService.js
import apiClient from '@/services/apiClient'; 

// Fetch Master Agreements
export const fetchMasterAgreements = async () => {
  const response = await apiClient.get("/dashboard/master-agreements");
  return response.data;
};

// Place a Bid
export const placeBid = async (bidData) => {
  const response = await apiClient.post("/dashboard/bid", bidData);
  return response.data;
};

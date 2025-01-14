import apiClient from './apiClient'; // Shared Axios instance

const getMasterAgreements = () => {
  return apiClient.get('/master-agreements');
};

const getMasterAgreementById = (id) => {
  return apiClient.get(`/master-agreements/${id}`);
};

export default {
  getMasterAgreements,
  getMasterAgreementById,
};

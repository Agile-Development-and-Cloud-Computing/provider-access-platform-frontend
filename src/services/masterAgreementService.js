import apiClient from './apiClient'; // Shared Axios instance

const getMasterAgreements = () => {
  return apiClient.get('/provider/master-agreements');
};

const getMasterAgreementById = (id) => {
  return apiClient.get(`/provider/master-agreements/${id}`);
};

export default {
  getMasterAgreements,
  getMasterAgreementById,
};

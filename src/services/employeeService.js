import apiClient from './apiClient'; // Shared Axios instance

const getEmployees = () => {
  return apiClient.get('/employees');
};

const getEmployeeById = (id) => {
  return apiClient.get(`/employees/${id}`);
};

const addEmployee = (employee) => {
  return apiClient.post('/employees', employee);
};

const updateEmployee = (id, employee) => {
  return apiClient.put(`/employees/${id}`, employee);
};

const deleteEmployee = (id) => {
  return apiClient.delete(`/employees/${id}`);
};

export default {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

// src/services/employeeService.js
//import { group3apiClient as apiClient } from '@/services/apiClient'; 
import apiClient from '@/services/apiClient';


const employeeService = {
  getEmployees: async () => {
    const response = await apiClient.get('/employees');
    return response.data;
  },
  addEmployee: async (employee) => {
    const response = await apiClient.post('/employees', employee);
    return response.data;
  },
  updateEmployee: async (id, employee) => {
    const response = await apiClient.put(`/employees/${id}`, employee);
    return response.data;
  },
  deleteEmployee: async (id) => {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  },
};

export default employeeService;

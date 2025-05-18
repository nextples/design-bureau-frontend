import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Employees API
export const fetchEmployees = (params) => api.get('/api/v1/employees', { params });
export const getEmployeeDetails = (id) => api.get(`/api/v1/employees/${id}`);
export const createEmployee = (data) => api.post('/api/v1/employees', data);

// Departments API
export const fetchDepartments = (params) => api.get('/api/v1/departments', { params });
export const getDepartmentDetails = (id) => api.get(`/api/v1/departments/${id}`);

// Positions API
export const fetchPositions = (params) => api.get('/api/v1/positions', { params });

export default api;
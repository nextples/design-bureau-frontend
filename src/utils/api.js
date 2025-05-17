import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api/v1'
});

export const fetchEmployees = () => api.get('/employees');
export const fetchDepartments = () => api.get('/departments');
// Добавьте остальные методы
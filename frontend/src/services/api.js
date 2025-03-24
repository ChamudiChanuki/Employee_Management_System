import axios from 'axios';

const API_URL = 'http://localhost:5091/api'; // Update if necessary

export const getEmployees = () => axios.get(`${API_URL}/Employees`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/Employees/${id}`);
export const createEmployee = (data) => axios.post(`${API_URL}/Employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/Employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/Employees/${id}`);

export const getDepartments = () => axios.get(`${API_URL}/Departments`);
export const getDepartmentById = (id) => axios.get(`${API_URL}/Departments/${id}`);
export const createDepartment = (data) => axios.post(`${API_URL}/Departments`, data);
export const updateDepartment = (id, data) => axios.put(`${API_URL}/Departments/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/Departments/${id}`);

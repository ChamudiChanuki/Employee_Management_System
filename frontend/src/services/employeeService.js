import axios from 'axios';

const API_URL = 'http://localhost:5091/api/Employees';

export const getEmployees = () => axios.get(API_URL);
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
export const addEmployee = async (employeeData) => {
    try {
        const response = await axios.post(API_URL, employeeData);
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};
export const updateEmployee = async (id, employee) => {
    try {
        await axios.put(`${API_URL}/${id}`, employee);
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};
export const deleteEmployee = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};
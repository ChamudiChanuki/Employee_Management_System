import axios from 'axios';

const API_URL = 'http://localhost:5091/api/Departments';

export const getDepartments = async () => {
    try {
        return await axios.get(API_URL);
    } catch (error) {
        console.error("Error fetching departments:", error);
        return { data: { $values: [] } }; // Return empty structure to prevent errors
    }
};

export const addDepartment = async (department) => {
    try {
        return await axios.post(API_URL, department);
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
};

export const updateDepartment = async (id, department) => {
    try {
        return await axios.put(`${API_URL}/${id}`, department);
    } catch (error) {
        console.error("Error updating department:", error);
        throw error;
    }
};

export const deleteDepartment = async (id) => {
    try {
        return await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting department:", error);
        throw error;
    }
};

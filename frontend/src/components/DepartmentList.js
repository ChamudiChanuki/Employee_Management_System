import React, { useEffect, useState } from 'react';
import { getDepartments, deleteDepartment } from '../services/departmentService';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await getDepartments();
            console.log("API Response:", response.data); // Debugging API response
            const departmentArray = response.data?.$values || []; // Ensure it's an array
            setDepartments(departmentArray);
        } catch (error) {
            console.error("Error loading departments:", error);
            setDepartments([]); // Fallback to empty array
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDepartment(id);
            loadDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    return (
        <div>
            <h2>Department List</h2>
            <ul className="list-group">
                {departments.length > 0 ? (
                    departments.map(dept => (
                        <li key={dept.departmentId} className="list-group-item d-flex justify-content-between">
                            {dept.name}
                            <button onClick={() => handleDelete(dept.departmentId)} className="btn btn-danger">Delete</button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No departments found</li>
                )}
            </ul>
        </div>
    );
};

export default DepartmentList;

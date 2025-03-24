import React, { useEffect, useState } from 'react';
import { getDepartments, deleteDepartment } from '../services/api';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        const response = await getDepartments();
        setDepartments(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            await deleteDepartment(id);
            loadDepartments();
        }
    };

    return (
        <div className="container mt-4">
            
            <Link to="/departments/add" className="btn btn-primary mb-3">Add Department</Link>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.departmentId}>
                            <td>{dept.name}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dept.departmentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;

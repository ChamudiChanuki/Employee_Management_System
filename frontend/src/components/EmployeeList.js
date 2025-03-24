import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/api';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            await deleteEmployee(id);
            loadEmployees();
        }
    };

    return (
        <div className="container mt-4">
            
            <Link to="/employees/add" className="btn btn-primary mb-3">Add Employee</Link>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.employeeId}>
                            <td>{emp.fullName}</td>
                            <td>{emp.email}</td>
                            <td>{emp.departmentName}</td>
                            <td>
                                <Link to={`/employees/edit/${emp.employeeId}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(emp.employeeId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;

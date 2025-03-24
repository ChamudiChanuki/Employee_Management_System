import React, { useEffect, useState } from 'react';
import { getEmployeeById, createEmployee, updateEmployee, getDepartments } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [employee, setEmployee] = useState({ 
        fullName: '', 
        email: '', 
        dateOfBirth: '',  // Added field
        salary: '',       // Added field
        departmentId: '' 
    });
    

    useEffect(() => {
        loadDepartments();
        if (id) {
            loadEmployee();
        }
    }, [id]);

    const loadDepartments = async () => {
        const response = await getDepartments();
        setDepartments(response.data);
    };

    const loadEmployee = async () => {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ 
            ...employee, 
            [name]: name === "salary" || name === "departmentId" ? Number(value) : value 
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedEmployee = {
            ...employee,
            dateOfBirth: new Date(employee.dateOfBirth).toISOString() // Convert to ISO format
        };
        if (id) {
            await updateEmployee(id, formattedEmployee);
        } else {
            await createEmployee(formattedEmployee);
        }
        navigate('/employees');
    };
    

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={employee.fullName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input type="number" className="form-control" name="salary" value={employee.salary} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select className="form-select" name="departmentId" value={employee.departmentId} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default EmployeeForm;

import React, { useEffect, useState } from 'react';
import { addEmployee } from '../services/employeeService';
import { getDepartments } from '../services/departmentService';

const EmployeeForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [salary, setSalary] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await getDepartments();
            console.log("Departments API Response:", response.data);
            const departmentData = response.data?.$values || [];
            setDepartments(departmentData);
        } catch (error) {
            console.error("Error fetching departments:", error);
            setDepartments([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !dateOfBirth || !salary || !departmentId) {
            alert("Please fill in all fields.");
            return;
        }

        const newEmployee = {
            fullName,
            email,
            dateOfBirth: new Date(dateOfBirth).toISOString(),
            salary: parseFloat(salary),
            departmentId: parseInt(departmentId)
        };

        console.log("New Employee Data:", newEmployee);

        try {
            const response = await addEmployee(newEmployee);
            console.log("API Response:", response);

            setFullName('');
            setEmail('');
            setDateOfBirth('');
            setSalary('');
            setDepartmentId('');

            alert("Employee added successfully!");
        } catch (error) {
            console.error("Error adding employee:", error.response?.data || error.message);
            alert("Failed to add employee. Please check input and try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="form-control" required />
            </div>
            <div>
                <label>Salary:</label>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="form-control" required />
            </div>
            <div>
                <label>Department:</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className="form-control" required>
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Save</button>
        </form>
    );
};

export default EmployeeForm;

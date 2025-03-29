import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../services/employeeService";
import { getDepartments } from "../services/departmentService";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, []);

    const loadEmployees = async () => {
        try {
            const employeeResponse = await getEmployees();
            const departmentResponse = await getDepartments();

            let employeesData = employeeResponse.data?.$values || [];
            let departmentsData = departmentResponse.data?.$values || [];

            // Create a department map (departmentId -> departmentName)
            const departmentMap = {};
            departmentsData.forEach(dep => {
                departmentMap[dep.departmentId] = dep.name;
            });

            const extractedEmployees = employeesData.map(emp => ({
                employeeId: emp.employeeId || "N/A",
                fullName: emp.fullName || "N/A",
                email: emp.email || "N/A",
                dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.split("T")[0] : "N/A",
                salary: emp.salary !== undefined ? emp.salary : "N/A",
                departmentId: emp.departmentId || "N/A",
                departmentName: departmentMap[emp.departmentId] || "Unknown",
            }));

            setEmployees(extractedEmployees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setEmployees([]);
        }
    };

    const loadDepartments = async () => {
        try {
            const response = await getDepartments();
            setDepartments(response.data?.$values || []);
        } catch (error) {
            console.error("Error fetching departments:", error);
            setDepartments([]);
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee.employeeId);
        setUpdatedData({ ...employee });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if (!updatedData.fullName || !updatedData.email) {
            alert("Full Name and Email are required.");
            return;
        }

        try {
            await updateEmployee(updatedData.employeeId, updatedData);
            alert("Employee updated successfully!");
            setEditingEmployee(null);
            loadEmployees();
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                alert("Employee deleted successfully!");
                loadEmployees();
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Employee List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp.employeeId}>
                                <td>{emp.employeeId}</td>
                                <td>
                                    {editingEmployee === emp.employeeId ? (
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={updatedData.fullName || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        emp.fullName
                                    )}
                                </td>
                                <td>
                                    {editingEmployee === emp.employeeId ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={updatedData.email || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        emp.email
                                    )}
                                </td>
                                <td>{emp.dateOfBirth}</td>
                                <td>{emp.salary !== "N/A" ? `$${parseFloat(emp.salary).toLocaleString()}` : "N/A"}</td>
                                <td>
                                    {editingEmployee === emp.employeeId ? (
                                        <select
                                            name="departmentId"
                                            value={updatedData.departmentId || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(department => (
                                                <option key={department.departmentId} value={department.departmentId}>
                                                    {department.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        emp.departmentName
                                    )}
                                </td>
                                <td>
                                    {editingEmployee === emp.employeeId ? (
                                        <>
                                            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                                                Save
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingEmployee(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(emp)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.employeeId)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;

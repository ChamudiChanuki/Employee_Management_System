import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';

const EmployeesPage = () => {
    const navigate = useNavigate();

    const handleAddEmployee = () => {
        navigate('/employees/add');
    };

    return (
        <div className="container">
            <h1 className="mt-4">Employees</h1>
           
            <EmployeeList />
        </div>
    );
};

export default EmployeesPage;

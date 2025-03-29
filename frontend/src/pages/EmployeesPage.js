import React from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

const EmployeesPage = () => {
    return (
        <div className="container">
            <h1>Employees Management</h1>
            <EmployeeForm />
            <EmployeeList />
        </div>
    );
};

export default EmployeesPage;

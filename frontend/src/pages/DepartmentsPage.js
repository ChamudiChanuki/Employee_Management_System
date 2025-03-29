import React from 'react';
import DepartmentList from '../components/DepartmentList';
import DepartmentForm from '../components/DepartmentForm';

const DepartmentsPage = () => {
    return (
        <div className="container">
            <h1>Departments Management</h1>
            <DepartmentForm />
            <DepartmentList />
        </div>
    );
};

export default DepartmentsPage;

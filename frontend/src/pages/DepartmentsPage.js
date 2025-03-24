import React from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentList from '../components/DepartmentList';

const DepartmentsPage = () => {
    const navigate = useNavigate();

    const handleAddDepartment = () => {
        navigate('/departments/add');
    };

    return (
        <div className="container">
            <h1 className="mt-4">Departments</h1>
            
            <DepartmentList />
        </div>
    );
};

export default DepartmentsPage;

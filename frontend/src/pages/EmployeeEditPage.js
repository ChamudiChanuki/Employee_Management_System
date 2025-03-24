import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeEditPage = () => {
    const { id } = useParams(); // Get Employee ID from URL

    return (
        <div className="container">
            <h1 className="mt-4">Edit Employee</h1>
            <EmployeeForm employeeId={id} />
        </div>
    );
};

export default EmployeeEditPage;

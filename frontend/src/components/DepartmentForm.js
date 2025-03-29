import React, { useState } from 'react';
import { addDepartment } from '../services/departmentService';

const DepartmentForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDepartment({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Department Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Save</button>
        </form>
    );
};

export default DepartmentForm;

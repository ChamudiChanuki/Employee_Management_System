import React, { useEffect, useState } from 'react';
import { getDepartmentById, createDepartment, updateDepartment } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ Name: '' });

    useEffect(() => {
        if (id) {
            loadDepartment();
        }
    }, [id]);

    const loadDepartment = async () => {
        const response = await getDepartmentById(id);
        setDepartment(response.data);
    };

    const handleChange = (e) => {
        setDepartment({ ...department, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateDepartment(id, department);
        } else {
            await createDepartment(department);
        }
        navigate('/departments');
    };

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Department' : 'Add Department'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Department Name</label>
                    <input type="text" className="form-control" name="Name" value={department.name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default DepartmentForm;

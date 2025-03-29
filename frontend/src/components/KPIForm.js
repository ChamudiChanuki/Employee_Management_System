import React, { useState } from 'react';
import { addKPI } from '../services/kpiService';

const KPIForm = ({ refreshList }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [kpiName, setKpiName] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newKPI = { 
            employeeId: parseInt(employeeId, 10), 
            kpiName, 
            score: parseFloat(score) 
        };

        try {
            await addKPI(newKPI);
            setEmployeeId('');
            setKpiName('');
            setScore('');
            alert("KPI added successfully!");
            refreshList(); // Reload KPI List
        } catch (error) {
            console.error("Error submitting KPI:", error);
            alert("Failed to add KPI.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded">
            
            <div className="mb-2">
                <label>Employee ID:</label>
                <input 
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-2">
                <label>KPI Name:</label>
                <input 
                    type="text"
                    value={kpiName}
                    onChange={(e) => setKpiName(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-2">
                <label>Score:</label>
                <input 
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Save KPI</button>
        </form>
    );
};

export default KPIForm;

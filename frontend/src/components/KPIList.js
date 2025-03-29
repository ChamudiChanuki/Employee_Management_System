import React, { useEffect, useState } from 'react';
import { getKPIs } from '../services/kpiService';

const KPIList = () => {
    const [kpis, setKpis] = useState([]);

    useEffect(() => {
        loadKPIs();
    }, []);

    const loadKPIs = async () => {
        try {
            const response = await getKPIs();
            console.log("API Response:", response.data); // Debugging
    
            // Extract the actual KPI array from "$values"
            const kpiArray = response.data?.$values?.map(kpi => ({
                kpiId: kpi.kpiId,
                employeeId: kpi.employeeId,
                employeeName: kpi.employee?.fullName, // Handle null employee
                kpiName: kpi.kpiName,
                score: kpi.score
            })) || [];
    
            setKpis(kpiArray);
        } catch (error) {
            console.error("Error loading KPIs:", error);
            setKpis([]); // Prevent crash on failure
        }
    };
    
    

    return (
        <div>
            <h2>Employee KPIs List</h2>
            <ul className="list-group">
    {kpis.length > 0 ? (
        kpis.map(kpi => (
            <li key={kpi.kpiId} className="list-group-item">
                {kpi.employeeName}  {kpi.kpiName}: {kpi.score}
            </li>
        ))
    ) : (
        <li className="list-group-item">No KPIs available</li>
    )}
</ul>

        </div>
    );
};

export default KPIList;
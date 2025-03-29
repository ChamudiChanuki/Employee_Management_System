import React from 'react';
import KPIList from '../components/KPIList';
import KPIForm from '../components/KPIForm';

const KPIsPage = () => {
    return (
        <div className="container">
            <h1>Employee KPIs</h1>
            <KPIForm />
            <KPIList />
        </div>
    );
};

export default KPIsPage;

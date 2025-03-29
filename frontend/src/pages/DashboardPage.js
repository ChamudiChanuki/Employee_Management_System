import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const backgroundStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url("/images.jpg")', // Correct image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    };

    const listItemStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        textDecoration: 'none',
        transition: '0.3s',
    };

    return (
        <div style={backgroundStyle}>
            <h1>Employee Management System</h1>
            <div style={{ width: '300px' }}>
                <Link to="/employees" style={listItemStyle} className="list-group-item list-group-item-action">
                    Manage Employees
                </Link>
                <Link to="/departments" style={listItemStyle} className="list-group-item list-group-item-action">
                    Manage Departments
                </Link>
                <Link to="/goals" style={listItemStyle} className="list-group-item list-group-item-action">
                    Manage Goals
                </Link>
                <Link to="/kpis" style={listItemStyle} className="list-group-item list-group-item-action">
                    Manage KPIs
                </Link>
                <Link to="/reviews" style={listItemStyle} className="list-group-item list-group-item-action">
                    Performance Reviews
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;


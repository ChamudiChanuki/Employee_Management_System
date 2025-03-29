import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import GoalsPage from './pages/GoalsPage';
import KPIsPage from './pages/KPIsPage';
import PerformanceReviewsPage from './pages/PerformanceReviewsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/departments" element={<DepartmentsPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/kpis" element={<KPIsPage />} />
                    <Route path="/reviews" element={<PerformanceReviewsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

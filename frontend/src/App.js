import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeAddPage from './pages/EmployeeAddPage';
import EmployeeEditPage from './pages/EmployeeEditPage';
import DepartmentsPage from './pages/DepartmentsPage';
import DepartmentAddPage from './pages/DepartmentAddPage';
import './App.css'; // Import CSS for styling

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Employee Management System</h1>
                <p>Welcome to the Employee Management System. Choose a section to manage:</p>
                <div className="btn-group">
                    <Link to="/employees" className="btn btn-primary">Manage Employees</Link>
                    <Link to="/departments" className="btn btn-secondary">Manage Departments</Link>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Employee Routes */}
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/employees/add" element={<EmployeeAddPage />} />
                    <Route path="/employees/edit/:id" element={<EmployeeEditPage />} />
                    {/* Department Routes */}
                    <Route path="/departments" element={<DepartmentsPage />} />
                    <Route path="/departments/add" element={<DepartmentAddPage />} />
                    {/* Default Route */}
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import { addPerformanceReview } from '../services/performanceReviewService';
import { getEmployees } from '../services/employeeService';

const PerformanceReviewForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await getEmployees();
            console.log("API Response:", response.data);

            const employeesArray = response.data?.$values || [];
            setEmployees(employeesArray);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeId || !rating || !comments) {
            alert("All fields are required.");
            return;
        }

        try {
            const reviewData = {
                employeeId: parseInt(employeeId),
                reviewDate: new Date().toISOString(),
                rating: parseInt(rating),
                comments
            };

            await addPerformanceReview(reviewData);
            alert("Review submitted successfully!");

            // Clear the form after submission
            setEmployeeId('');
            setRating('');
            setComments('');
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Employee:</label>
                <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="form-control">
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.fullName} {/* Employee full name */}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Rating (1-5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Comments:</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit Review</button>
        </form>
    );
};

export default PerformanceReviewForm;

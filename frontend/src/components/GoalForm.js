import React, { useState } from 'react';
import { addGoal } from '../services/goalService';

const GoalForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const goalData = {
            goalTitle: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            isCompleted: isCompleted,
            employeeId: 1, // Assuming employee ID is 1, adjust as needed
            employeeName: 'string' // Adjust with actual employee name if needed
        };

        try {
            // Make API call to add the goal
            await addGoal(goalData);
            // Reset form fields after successful submission
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setIsCompleted(false);
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Goal Title:</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Completed:</label>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
                Save
            </button>
        </form>
    );
};

export default GoalForm;

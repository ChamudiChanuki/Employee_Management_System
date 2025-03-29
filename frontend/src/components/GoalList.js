import React, { useEffect, useState } from 'react';
import { getGoals, deleteGoal, updateGoal } from '../services/goalService';

const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const [editingGoal, setEditingGoal] = useState(null); // State to hold the goal being edited
    const [goalTitle, setGoalTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const response = await getGoals();
            const goalsData = response.data?.$values || [];
            setGoals(goalsData); // Set the goals array to state
        } catch (error) {
            console.error("Error loading goals:", error);
            setGoals([]); // Handle error gracefully
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteGoal(id);
            loadGoals(); // Reload goals after deletion
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal); // Set the goal being edited
        setGoalTitle(goal.goalTitle); // Populate the goal title
        setDescription(goal.description); // Populate the description
        setStartDate(goal.startDate); // Populate start date
        setEndDate(goal.endDate); // Populate end date
        setIsCompleted(goal.isCompleted); // Populate completion status
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editingGoal) {
            const updatedGoal = {
                goalTitle,
                description,
                startDate,
                endDate,
                isCompleted,
                employeeId: editingGoal.employeeId, // Retain other fields
                employeeName: editingGoal.employeeName
            };
            try {
                await updateGoal(editingGoal.goalId, updatedGoal); // API call to update
                setEditingGoal(null); // Reset the editing state
                loadGoals(); // Reload goals after update
            } catch (error) {
                console.error("Error updating goal:", error);
            }
        }
    };

    return (
        <div>
            <h2>Goal List</h2>
            <ul className="list-group">
                {goals.length > 0 ? (
                    goals.map(goal => (
                        <li key={goal.goalId} className="list-group-item d-flex justify-content-between">
    <div>
        <strong>{goal.goalTitle}</strong><br />
        <small>{goal.description}</small>
    </div>
    
    <div style={{ display: 'flex', gap: '10px' }}> {/* Flex container with a gap between buttons */}
        <button 
            onClick={() => handleEdit(goal)} 
            style={{
                backgroundColor: '#ffc107', // Blue background
                color: '#000', // White text color
                border: '1px solid #ffc107', // Darker blue border
                padding: '5px 10px', // Padding inside the button
                fontSize: '14px', // Font size
                borderRadius: '4px', // Rounded corners
                transition: 'background-color 0.3s, border-color 0.3s', // Smooth transition effect
            }} 
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ffc107'; // Darker blue when hovered
                e.target.style.borderColor = '#ffc107'; // Darker border when hovered
                e.target.style.cursor = 'pointer'; // Change cursor to pointer
            }} 
            onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffc107'; // Reset to original blue background
                e.target.style.borderColor = '#ffc107'; // Reset to original blue border
            }}
        >
            Edit
        </button>
        
        <button 
            onClick={() => handleDelete(goal.goalId)} 
            style={{
                backgroundColor: '#dc3545', // Red background
                color: 'white', // White text color
                border: '1px solid #c82333', // Darker red border
                padding: '5px 10px', // Padding inside the button
                fontSize: '14px', // Font size
                borderRadius: '4px', // Rounded corners
                transition: 'background-color 0.3s, border-color 0.3s', // Smooth transition effect
            }} 
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#c82333'; // Darker red when hovered
                e.target.style.borderColor = '#bd2130'; // Darker red border when hovered
                e.target.style.cursor = 'pointer'; // Change cursor to pointer
            }} 
            onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dc3545'; // Reset to original red background
                e.target.style.borderColor = '#c82333'; // Reset to original red border
            }}
        >
            Delete
        </button>
    </div>
</li>
                    ))
                ) : (
                    <li className="list-group-item">No goals available</li>
                )}
            </ul>

            {/* Edit form for selected goal */}
            {editingGoal && (
                <div className="mt-4">
                    <h3>Edit Goal</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Goal Title:</label>
                            <input
                                type="text"
                                value={goalTitle}
                                onChange={(e) => setGoalTitle(e.target.value)} // Bind goalTitle to state
                                className="form-control"
                                placeholder="Goal Title"
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // Bind description to state
                                className="form-control"
                                placeholder="Goal Description"
                            />
                        </div>
                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} // Bind startDate to state
                                className="form-control"
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} // Bind endDate to state
                                className="form-control"
                            />
                        </div>
                        <div>
                            <label>Completed:</label>
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={(e) => setIsCompleted(e.target.checked)} // Bind completion to state
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-2">Update</button>
                        <button
                            type="button"
                            onClick={() => setEditingGoal(null)} // Reset editing state
                            className="btn btn-secondary mt-2 ml-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GoalList;

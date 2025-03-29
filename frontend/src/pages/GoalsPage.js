import React from 'react';
import GoalList from '../components/GoalList';
import GoalForm from '../components/GoalForm';

const GoalsPage = () => {
    return (
        <div className="container">
            <h1>Employee Goals</h1>
            <GoalForm />
            <GoalList />
        </div>
    );
};

export default GoalsPage;

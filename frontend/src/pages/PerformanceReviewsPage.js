import React from 'react';
import PerformanceReviewList from '../components/PerformanceReviewList';
import PerformanceReviewForm from '../components/performanceReviewForm';

const PerformanceReviewsPage = () => {
    return (
        <div className="container">
            <h1>Performance Reviews</h1>
            <PerformanceReviewForm />
            <PerformanceReviewList />
        </div>
    );
};

export default PerformanceReviewsPage;

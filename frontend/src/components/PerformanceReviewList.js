import React, { useEffect, useState } from 'react';
import { getPerformanceReviews } from '../services/performanceReviewService';

const PerformanceReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const response = await getPerformanceReviews();
            console.log("API Response:", response.data);

            // Extract reviews array from API response
            const reviewsArray = response.data?.$values || [];
            setReviews(reviewsArray);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <div>
            <h2>Performance Reviews</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Rating</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.reviewId}>
                            <td>{review.employee?.fullName || "Unknown"}</td>
                            <td>{review.rating}</td>
                            <td>{review.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PerformanceReviewList;

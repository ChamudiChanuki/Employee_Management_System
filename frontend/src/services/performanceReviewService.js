import axios from 'axios';

const API_URL = 'http://localhost:5091/api/PerformanceReviews';

export const getPerformanceReviews = () => axios.get(API_URL);
export const addPerformanceReview = (review) => axios.post(API_URL, review);

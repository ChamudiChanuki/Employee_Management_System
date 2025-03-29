import axios from 'axios';

const API_URL = 'http://localhost:5091/api/Goals';

export const getGoals = () => axios.get(API_URL);
export const addGoal = (goal) => axios.post(API_URL, goal);
export const updateGoal = (id, goal) => axios.put(`${API_URL}/${id}`, goal);
export const deleteGoal = (id) => axios.delete(`${API_URL}/${id}`);

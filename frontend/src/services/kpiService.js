import axios from 'axios';

const API_URL = 'http://localhost:5091/api/EmployeeKPIs';

export const getKPIs = () => axios.get(API_URL);
export const addKPI = (kpi) => axios.post(API_URL, kpi);
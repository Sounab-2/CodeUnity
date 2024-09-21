import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
});
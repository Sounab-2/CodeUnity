import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://collaborative-editor-s89a.onrender.com'
});
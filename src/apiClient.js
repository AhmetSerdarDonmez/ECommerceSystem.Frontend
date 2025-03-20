// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// JWT token'ýný local storage'dan alýp her isteðe ekleyen interceptor
apiClient.interceptors.request.use(
    (config) => {
        //        const token = localStorage.getItem('authToken');
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
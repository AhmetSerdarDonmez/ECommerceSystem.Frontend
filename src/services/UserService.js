// src/services/UserService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const GetUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/User/get-user-by-id/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

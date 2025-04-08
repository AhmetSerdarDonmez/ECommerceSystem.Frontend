// src/services/UserService.js
// import axios from 'axios';
import apiClient from '../apiClient';


export const GetUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/User/get-user-by-id/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const GetAllUsers = async () => {
    try {
        const response = await apiClient.get('/User/get-all-user'); // API endpoint'ini backend'inize göre ayarlayýn
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

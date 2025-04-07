import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // If you're using a Vite proxy, this is fine.
    headers: {
        'Content-Type': 'application/json'
    }
});

export const RegisterUserService = async (userName, email, passwordHash, phoneNumber) => {
    try {
        const payload = { userName, email, passwordHash, phoneNumber };
        const response = await apiClient.post('/User/add-single-user', payload);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const RegisterUserServiceByGoogle = async (token) => {
    try {
        const payload = { token: token };
        const response = await apiClient.post('/User/google-signin', payload);
        return response.data;
    } catch (error) {
        console.error('Error registering user by Google:', error);
        throw error;
    }
};

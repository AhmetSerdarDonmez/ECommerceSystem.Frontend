import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // If you're using a Vite proxy, this is fine.
    headers: {
        'Content-Type': 'application/json'
    }
});

export const RegisterUserService = async (userName, email, passwordHash,PhoneNumber) => {
    try {
        // Construct the payload directly
        const payload = { userName, email, passwordHash ,PhoneNumber};
        const response = await apiClient.post('/User/add-single-user', payload);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

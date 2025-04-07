import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const GetUserLogin = async (userName, password) => {
    try {
        // POST iste�i kullanarak kullan�c� ad� ve �ifreyi istek g�vdesinde g�nderiyoruz.
        const response = await apiClient.post('/auth/login', { Username: userName, Password: password });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
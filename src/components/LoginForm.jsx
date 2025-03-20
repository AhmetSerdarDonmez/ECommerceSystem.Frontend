import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu import ediyoruz
import './LoginForm.css';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const GetUserLogin = async (userName, password) => {
    try {
        const response = await apiClient.post('/auth/login', { Username: userName, Password: password });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook'unu kullanmak i�in initialize ediyoruz

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await GetUserLogin(userName, password);
            console.log(response);
//            const responseData = JSON.parse(JSON.stringify(response.data));

            const Token = response.token;

            if (Token) {
                //localStorage.setItem('authToken', Token);
                sessionStorage.setItem('authToken', Token);

                console.log('Giri� ba�ar�l�! Token kaydedildi:', Token);
                navigate('/admin/dashboard'); // Giri� ba�ar�l� oldu�unda dashboard'a y�nlendiriyoruz
            } else {
                setError('Giri� ba�ar�l� oldu ancak token al�namad�.');
                console.error('Giri� ba�ar�l� oldu ancak token al�namad�:', response.data);
            }

        } catch (error) {
            setError('Kullan�c� ad� veya �ifre hatal�.');
            console.error('Giri� hatas�:', error);
        }
    };

    return (
        <div className="login-component">
            <h1>Giri� Yap</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Kullan�c� Ad�"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="user-input"
                />
                <input
                    type="password"
                    placeholder="�ifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="user-input"
                />
                <button type="submit" className="login-button">Giri�</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
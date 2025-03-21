import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await GetUserLogin(userName, password);
            const Token = response.token;

            if (Token) {
                sessionStorage.setItem('authToken', Token);
                navigate('/admin/dashboard');
            } else {
                setError('Login was successful but token could not be received.');
                console.error('Login was successful but token could not be received:', response.data);
            }

        } catch (error) {
            setError('Invalid username or password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-component">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="user-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="user-input"
                />
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Don't have an account?</p>
            <Link to="/register" className="register-button-link">
                <button className="register-button">Register</button>
            </Link>
        </div>
    );
}

export default LoginForm;
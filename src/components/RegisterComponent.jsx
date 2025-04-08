/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RegisterUserService, RegisterUserServiceByGoogle } from '../services/RegisterUserService';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterComponent.css';
// import axios from '../../node_modules/axios/index';

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


function RegisterForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();




    useEffect(() => {
        const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // <-- Access it here

        // Patch the Permissions API if available.
        if (navigator.permissions && navigator.permissions.query) {
            const originalQuery = navigator.permissions.query;
            navigator.permissions.query = originalQuery.bind(navigator.permissions);
        }

        // Load Google Identity Services and render the sign-in button.
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: googleClientId, // Replace with your Client ID
                callback: handleCredentialResponse,
            });
            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInDiv'),
                { theme: 'outline', size: 'large' }
            );
        } else {
            console.error(
                'Google Identity Services script not loaded. Make sure to include <script src="https://accounts.google.com/gsi/client" defer></script> in your HTML.'
            );
        }
    }, []);

    // This function is called once Google Sign-In returns a token.
    const handleCredentialResponse = async (response) => {

        try {
            // Call the Google Sign-In registration service.
            const result = await RegisterUserServiceByGoogle(response.credential);

            var Token = result.token;

            setMessage('User registered successfully via Google!');
            // You can navigate to a dashboard or update your UI as needed.
            sessionStorage.setItem('authToken', Token);

            navigate('/admin/dashboard');
        } catch (error) {
            setMessage('Google registration failed.');
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RegisterUserService(userName, email, passwordHash, phoneNumber);
            setMessage('User registered successfully!');
            console.log('User registered:', result);
            navigate('/admin/dashboard'); // Redirect after successful registration
        } catch (error) {
            setMessage('Registration failed.');
            console.error(error);
        }
    };

    return (
        <div className="register-component">
            <h1>Register User</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="user-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="user-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    className="user-input"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="user-input"
                />
                <button type="submit" className="register-button">
                    Register
                </button>
                {message && <p className="message">{message}</p>}
            </form>
            {/* Google Sign-In Button */}
            <div id="googleSignInDiv" style={{ marginTop: '20px' }}></div>
            <p>Already have an account?</p>
            <Link to="/login" className="login-button-link">
                <button className="login-button">Login</button>
            </Link>
        </div>
    );
}

export default RegisterForm;

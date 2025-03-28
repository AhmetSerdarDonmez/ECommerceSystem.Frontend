/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { RegisterUserService } from '../services/RegisterUserService';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterComponent.css';

function RegisterForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Patch the Permissions API if available to ensure proper binding.
        if (navigator.permissions && navigator.permissions.query) {
            const originalQuery = navigator.permissions.query;
            navigator.permissions.query = originalQuery.bind(navigator.permissions);
        }

        // Ensure the Google Identity Services script has been loaded.
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id:
                    '900122265445-e57qpuu3sudvt37jhor0rvrkm3q3uuue.apps.googleusercontent.com', // Replace with your Client ID
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

    const handleCredentialResponse = (response) => {
        console.log('Encoded JWT ID token:', response.credential);
        // Optionally decode the token or send it to your backend for verification.
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

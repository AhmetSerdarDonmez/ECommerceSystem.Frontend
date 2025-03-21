/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RegisterUserService } from '../services/RegisterUserService';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './RegisterComponent.css';

function RegisterForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RegisterUserService(userName, email, passwordHash, phoneNumber);
            setMessage('User registered successfully!');
            console.log('User registered:', result);
            navigate('/admin/dashboard'); // You might want to redirect to a different page after registration
        } catch (error) {
            setMessage('Registration failed.');
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
                <button type="submit" className="register-button">Register</button>
                {message && <p className="message">{message}</p>}
            </form>
            <p>Already have an account?</p>
            <Link to="/login" className="login-button-link"> {/* Assuming /register is your login page */}
                <button className="login-button">Login</button>
            </Link>
        </div>
    );
}

export default RegisterForm;
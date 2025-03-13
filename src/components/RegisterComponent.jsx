/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RegisterUserService } from '../services/RegisterUserService';
import './RegisterComponent.css';


function RegisterForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RegisterUserService(userName, email, passwordHash, phoneNumber);
            setMessage('User registered successfully!');
            console.log('User registered:', result);
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


        </div>
    );
}

export default RegisterForm;




/*
import React, { useState } from 'react';
import { RegisterUserService } from '../services/RegisterUserService';
import './RegisterComponent.css';

function RegisterForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RegisterUserService(userName, email, passwordHash,PhoneNumber);
            setMessage('User registered successfully!');
            console.log('User registered:', result);
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default RegisterForm;

*/
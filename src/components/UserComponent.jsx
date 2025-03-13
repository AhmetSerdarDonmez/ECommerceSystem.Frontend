// src/components/UserComponent.jsx
import React, { useState } from 'react';
import { GetUserById } from '../services/UserService';
import './UserComponent.css'; // Assuming you have a CSS file for styling

const UserComponent = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchUser = async () => {
        setLoading(true);
        setError(null);
        setUser(null);
        try {
            const userData = await GetUserById(userId);
            setUser(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-component">
            <h1>User Information</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    className="user-input"
                />
                <button onClick={handleFetchUser} className="fetch-button">
                    Fetch User
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {user && (
                <div className="user-info">
                    <p>Name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                </div>
            )}
            {!loading && !error && !user && <p>No user found</p>}
        </div>
    );
};

export default UserComponent;

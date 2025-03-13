// src/components/UserComponent.jsx
import React, { useState, useEffect } from 'react';
import { GetUserById } from '../services/UserService';

const UserComponent = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await GetUserById(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>User Information</h1>
            {user ? (
                <div>
                    <p>Name: {user.UserName}</p>
                    <p>Email: {user.Email}</p>
                    <p>Phone Number: {user.PhoneNumber}</p>
                </div>
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
};

export default UserComponent;

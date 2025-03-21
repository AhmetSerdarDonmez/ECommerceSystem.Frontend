// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Check if the token is stored in sessionStorage
    const token = sessionStorage.getItem('authToken');

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

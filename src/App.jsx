/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import RegisterForm from './components/RegisterComponent'; // This is your registration/login form
import PaymentForm from './components/PaymentComponent';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
// Import the new AdminLayout for the admin panel pages
import AdminLayout from './pages/AdminLayout';
import { jwtDecode } from 'jwt-decode'; // Corrected import

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Changed to jwtDecode
                setIsAuthenticated(true);
                setUserRole(decodedToken?.role); // Assuming your token has a 'roleId' claim

                // Redirect authenticated users on initial load
                if (decodedToken?.role === '1') {
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    navigate('/user', { replace: true });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthenticated(false);
                setUserRole(null);
                navigate('/register', { replace: true }); // Redirect to login if token is invalid
            }
        } else {
            navigate('/login', { replace: true }); // Redirect to login if no token
        }
    }, [navigate]);

    // Protected Admin Route Component
    const ProtectedAdminRoute = ({ children }) => {
        const token = sessionStorage.getItem('authToken');
        try {
            const decodedToken = jwtDecode(token); // Changed to jwtDecode
            if (token && decodedToken?.role === '1') {
                return children;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
        return <Navigate to="/register" replace />;
    };

    // Protected User Route Component (Example for protecting regular user routes)
    const ProtectedUserRoute = ({ children }) => {
        const token = sessionStorage.getItem('authToken');
        try {
            const decodedToken = jwtDecode(token); // Changed to jwtDecode
            if (token && decodedToken?.role === '2') {
                return children;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
        // Redirect to a default page for non-admin users if needed, or login
        return <Navigate to={isAuthenticated ? '/user' : '/register'} replace />;
    };

    return (
        <div className="app-container">
            {isAuthenticated && <Sidebar />}
            <main className="content-area">
                <Routes>
                    {/* Public Route for Login/Registration */}
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Protected Admin Routes */}
                    <Route path="/admin/dashboard" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />
                    <Route path="/admin/users" element={<ProtectedAdminRoute><Users /></ProtectedAdminRoute>} />
                    <Route path="/admin/products" element={<ProtectedAdminRoute><Products /></ProtectedAdminRoute>} />
                    <Route path="/admin/orders" element={<ProtectedAdminRoute><Orders /></ProtectedAdminRoute>} />
                    <Route path="/admin/*" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>} />

                    {/* Protected User Routes */}
                    <Route path="/user" element={<ProtectedUserRoute><UserComponent /></ProtectedUserRoute>} />
                    <Route path="/payment" element={<ProtectedUserRoute><PaymentForm /></ProtectedUserRoute>} />

                    {/* Default Redirect to Login */}
                    <Route path="/" element={<Navigate to="/register" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
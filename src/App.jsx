import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import RegisterForm from './components/RegisterComponent';
import PaymentForm from './components/PaymentComponent';

// Import the new AdminLayout for the admin panel pages
import AdminLayout from './pages/AdminLayout';

function App() {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/payment">Make a Payment</Link></li>
                    <li><Link to="/user">User</Link></li>
                    {/* New link to open the Admin Panel in a dedicated page */}
                    <li><Link to="/admin/dashboard">Admin Panel</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/user" element={<UserComponent />} />
                {/* Admin panel routes: All admin pages are nested under /admin */}
                <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
        </div>
    );
}

export default App;

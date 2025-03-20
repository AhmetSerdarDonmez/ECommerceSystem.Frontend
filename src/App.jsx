import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import RegisterForm from './components/RegisterComponent';
import PaymentForm from './components/PaymentComponent';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
// Import the new AdminLayout for the admin panel pages
import AdminLayout from './pages/AdminLayout';

function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="content-area">
                <Routes>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/payment" element={<PaymentForm />} />
                    <Route path="/user" element={<UserComponent />} />
                    <Route path="/admin/*" element={<AdminLayout />} />
                </Routes>
            </main>
        </div>
    );
}


function Apps() {
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
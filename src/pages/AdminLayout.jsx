import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import your admin pages (ensure these files exist in your /src/pages folder)
import Dashboard from './Dashboard';
import Users from './Users';
import Products from './Products';
import Orders from './Orders';
import Categories from './Categories';
import Promotions from './Promotions';
import Addresses from './Addresses';
import AuditLogs from './AuditLogs';

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><Link to="dashboard">Dashboard</Link></li>
                    <li><Link to="users">Users</Link></li>
                    <li><Link to="products">Products</Link></li>
                    <li><Link to="orders">Orders</Link></li>
                    <li><Link to="categories">Categories</Link></li>
                    <li><Link to="promotions">Promotions</Link></li>
                    <li><Link to="addresses">Addresses</Link></li>
                    <li><Link to="audit-logs">Audit Logs</Link></li>
                </ul>
            </div>
            <div className="admin-content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="promotions" element={<Promotions />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="audit-logs" element={<AuditLogs />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;

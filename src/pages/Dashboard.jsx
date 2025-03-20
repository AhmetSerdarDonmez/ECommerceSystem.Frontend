// pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // We'll create this next

function Dashboard() {
    // Assuming you fetch this data from your backend
    const stats = {
        users: 12,
        orders: 8,
        products: 25,
        categories: 5,
        promotions: 3,
        addresses: 20,
        auditLogs: 15
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="quick-actions">
                    <Link to="/admin/users/new" className="btn btn-primary">Add User</Link>
                    <Link to="/admin/products/new" className="btn btn-primary">Add Product</Link>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Users</h3>
                    <div className="stat-value">{stats.users}</div>
                    <Link to="/admin/users" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Orders</h3>
                    <div className="stat-value">{stats.orders}</div>
                    <Link to="/admin/orders" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Products</h3>
                    <div className="stat-value">{stats.products}</div>
                    <Link to="/admin/products" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Categories</h3>
                    <div className="stat-value">{stats.categories}</div>
                    <Link to="/admin/categories" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Promotions</h3>
                    <div className="stat-value">{stats.promotions}</div>
                    <Link to="/admin/promotions" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Addresses</h3>
                    <div className="stat-value">{stats.addresses}</div>
                    <Link to="/admin/addresses" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Audit Logs</h3>
                    <div className="stat-value">{stats.auditLogs}</div>
                    <Link to="/admin/audit-logs" className="card-link">View all</Link>
                </div>

                <div className="stat-card">
                    <h3>Audit Logs</h3>
                    <div className="stat-value">{stats.auditLogs}</div>
                    <Link to="/admin/audit-logs" className="card-link">View all</Link>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
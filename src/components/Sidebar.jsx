// components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// You can use any icon library, but let's assume you're using simple SVG icons
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Admin Panel</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">📊</span>
                    <span className="nav-text">Dashboard</span>
                </NavLink>

                <NavLink to="/admin/users" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">👥</span>
                    <span className="nav-text">Users</span>
                </NavLink>

                <NavLink to="/admin/products" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">📦</span>
                    <span className="nav-text">Products</span>
                </NavLink>

                <NavLink to="/admin/orders" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">🛒</span>
                    <span className="nav-text">Orders</span>
                </NavLink>

                <NavLink to="/admin/categories" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">🏷️</span>
                    <span className="nav-text">Categories</span>
                </NavLink>

                <NavLink to="/admin/promotions" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">🎯</span>
                    <span className="nav-text">Promotions</span>
                </NavLink>

                <NavLink to="/admin/addresses" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">📍</span>
                    <span className="nav-text">Addresses</span>
                </NavLink>

                <NavLink to="/admin/audit-logs" className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                }>
                    <span className="nav-icon">📝</span>
                    <span className="nav-text">Audit Logs</span>
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
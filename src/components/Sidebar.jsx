import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        { name: 'Dashboard', path: '/sidebar' },
        { name: 'Users', path: '/sidebar/users' },
        { name: 'Products', path: '/sidebar/products' },
        { name: 'Orders', path: '/sidebar/orders' },
        { name: 'Categories', path: '/sidebar/categories' },
        { name: 'Promotions', path: '/sidebar/promotions' },
        { name: 'Addresses', path: '/sidebar/addresses' },
        { name: 'Audit Logs', path: '/sidebar/audit-logs' },
    ];

    return (
        <div
            className="sidebar"
            style={{
                width: '240px',
                background: '#2c3e50',
                color: '#ecf0f1',
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <h2 style={{ margin: '0 0 20px' }}>Admin Panel</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menuItems.map((item, index) => (
                    <li key={index} style={{ margin: '15px 0' }}>
                        <Link
                            to={item.path}
                            style={{
                                color: location.pathname === item.path ? '#3498db' : '#ecf0f1',
                                textDecoration: 'none',
                                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                            }}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

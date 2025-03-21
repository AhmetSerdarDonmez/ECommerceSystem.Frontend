// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
//  import './Layout.css'; // Optional: Use this file for layout-specific styling

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="content-area">
                {children}
            </main>
        </div>
    );
};

export default Layout;

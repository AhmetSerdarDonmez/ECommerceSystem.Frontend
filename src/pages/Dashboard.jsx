import React from 'react';

const Dashboard = () => {
    const stats = {
        Users: 12,
        Orders: 8,
        Products: 25,
        Categories: 5,
        Promotions: 3,
        Addresses: 20,
        'Audit Logs': 15,
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {Object.entries(stats).map(([label, value]) => (
                    <div
                        key={label}
                        style={{
                            flex: '1 1 150px',
                            padding: '20px',
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}
                    >
                        <h3>{label}</h3>
                        <p style={{ fontSize: '24px', margin: '10px 0 0' }}>{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

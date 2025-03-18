import React from 'react';

const Users = () => {
    const dummyUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
    ];

    return (
        <div>
            <h1>Users</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyUsers.map(user => (
                        <tr key={user.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;

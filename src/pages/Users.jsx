// src/pages/Users.jsx (veya bileþeninizin bulunduðu klasör)
import React, { useState, useEffect } from 'react';
import { GetAllUsers } from '../services/UserService'; // UserService.js dosyasýnýn doðru yolunu belirtin

const Users = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = GetAllUsers();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Kullanýcýlar yüklenirken bir hata oluþtu.');
                setLoading(false);
            }
        };

        fetchUsers();
    },);

    if (loading) {
        return <div>Kullanýcýlar yükleniyor...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontWeight: 'bold' }}>Hata: {error}</div>;
    }

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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.userId}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.userName}</td> {/* Backend'den gelen kullanýcý adý alanýný kullanýn */}
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.roleId}</td> {/* Backend'den gelen rol alanýný kullanýn */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
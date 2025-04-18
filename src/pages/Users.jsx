// src/pages/Users.jsx (veya bileşeninizin bulunduğu klasör)
import React, { useState, useEffect } from 'react';
import { GetAllUsers } from '../services/UserService'; // UserService.js dosyasının doğru yolunu belirtin

const Users = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetAllUsers();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Kullanıcılar yüklenirken bir hata oluştu.');
                setLoading(false);
            }
        };

        fetchUsers();
    },[]);

    if (loading) {
        return <div>Kullanıcılar yükleniyor...</div>;
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
                        <tr key={user.userId}>  {/* or user.id, whichever is unique */}
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.roleId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
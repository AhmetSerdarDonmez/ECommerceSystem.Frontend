import React from 'react';

const Addresses = () => {
    const dummyAddresses = [
        {
            id: 1,
            user: 'John Doe',
            country: 'USA',
            city: 'New York',
            district: 'Manhattan',
            addressLine1: '123 Main St',
            postalCode: '10001',
            billing: true,
            shipping: false,
        },
        {
            id: 2,
            user: 'Jane Smith',
            country: 'USA',
            city: 'Los Angeles',
            district: 'Downtown',
            addressLine1: '456 Sunset Blvd',
            postalCode: '90012',
            billing: false,
            shipping: true,
        },
    ];

    return (
        <div>
            <h1>Addresses</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>User</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Country</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>City</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>District</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Address</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Postal Code</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Billing</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Shipping</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyAddresses.map(addr => (
                        <tr key={addr.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.user}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.country}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.city}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.district}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.addressLine1}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.postalCode}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.billing ? 'Yes' : 'No'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{addr.shipping ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Addresses;

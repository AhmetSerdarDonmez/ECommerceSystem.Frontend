import React from 'react';

const Orders = () => {
    const dummyOrders = [
        { id: 1, orderNo: 'ORD001', date: '2023-03-01', total: 99.99, user: 'John Doe' },
        { id: 2, orderNo: 'ORD002', date: '2023-03-02', total: 149.99, user: 'Jane Smith' },
        { id: 3, orderNo: 'ORD003', date: '2023-03-03', total: 79.99, user: 'Alice Johnson' },
    ];

    return (
        <div>
            <h1>Orders</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Order No</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total ($)</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>User</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyOrders.map(order => (
                        <tr key={order.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.orderNo}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.date}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.total}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;

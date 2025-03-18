import React from 'react';

const AuditLogs = () => {
    const dummyLogs = [
        {
            id: 1,
            table: 'products',
            recordId: 3,
            column: 'price',
            oldValue: '39.99',
            newValue: '34.99',
            changedBy: 'Admin',
            changedAt: '2023-03-05 10:00:00',
            transactionType: 'update',
        },
        {
            id: 2,
            table: 'orders',
            recordId: 2,
            column: 'order_status',
            oldValue: 'pending',
            newValue: 'shipped',
            changedBy: 'Admin',
            changedAt: '2023-03-06 11:30:00',
            transactionType: 'update',
        },
    ];

    return (
        <div>
            <h1>Audit Logs</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Table</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Record ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Column</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Old Value</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>New Value</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Changed By</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Changed At</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyLogs.map(log => (
                        <tr key={log.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.table}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.recordId}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.column}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.oldValue}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.newValue}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.changedBy}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.changedAt}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.transactionType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLogs;

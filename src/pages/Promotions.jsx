import React from 'react';

const Promotions = () => {
    const dummyPromotions = [
        { id: 1, name: 'Spring Sale', type: 'percentage', value: 15, start: '2023-03-01', end: '2023-03-31' },
        { id: 2, name: 'Black Friday', type: 'amount', value: 25, start: '2023-11-24', end: '2023-11-24' },
    ];

    return (
        <div>
            <h1>Promotions</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Value</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Start Date</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyPromotions.map(promo => (
                        <tr key={promo.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.type}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.value}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.start}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{promo.end}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Promotions;

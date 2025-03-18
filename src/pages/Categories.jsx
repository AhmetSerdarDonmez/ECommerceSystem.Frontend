import React from 'react';

const Categories = () => {
    const dummyCategories = [
        { id: 1, name: 'Electronics', description: 'Gadgets and devices' },
        { id: 2, name: 'Clothing', description: 'Apparel and accessories' },
        { id: 3, name: 'Home & Garden', description: 'Furniture and decor' },
    ];

    return (
        <div>
            <h1>Categories</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyCategories.map(category => (
                        <tr key={category.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{category.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{category.name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;

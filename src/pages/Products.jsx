import React from 'react';

const Products = () => {
    const dummyProducts = [
        { id: 1, name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
        { id: 2, name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
        { id: 3, name: 'Product 3', price: 39.99, description: 'Description for Product 3' },
    ];

    return (
        <div>
            <h1>Products</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price ($)</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyProducts.map(product => (
                        <tr key={product.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.id}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.price}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;

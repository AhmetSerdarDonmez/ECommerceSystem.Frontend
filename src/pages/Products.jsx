/* eslint-disable no-unused-vars */
// pages/Products.js (updated with alerts)
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import Alert from '../components/Alert';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Replace with your actual API call
            // const response = await fetch('/api/products');
            // const data = await response.json();

            // Mock data for demonstration
            const data = [
                { id: 1, name: 'Product 1', price: 99.99, category: 'Electronics', stock: 42, description: 'Product 1 description' },
                { id: 2, name: 'Product 2', price: 49.99, category: 'Clothing', stock: 78, description: 'Product 2 description' },
                { id: 3, name: 'Product 3', price: 29.99, category: 'Home', stock: 15, description: 'Product 3 description' },
            ];

            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load products');
            setAlert({ type: 'error', message: 'Failed to load products. Please try again later.' });
            setLoading(false);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price', render: (row) => `$${row.price.toFixed(2)}` },
        { key: 'category', label: 'Category' },
        { key: 'stock', label: 'Stock' },
    ];

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                // Replace with your actual API call
                // await fetch(`/api/products/${product.id}`, { method: 'DELETE' });

                // For demonstration, we'll just filter out the product
                setProducts(products.filter(p => p.id !== product.id));
                setAlert({
                    type: 'success',
                    message: `Product "${product.name}" has been deleted successfully.`
                });
            } catch (err) {
                setAlert({
                    type: 'error',
                    message: `Failed to delete product "${product.name}". Please try again.`
                });
            }
        }
    };

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (currentProduct) {
                // Update existing product
                // Replace with your actual API call
                // await fetch(`/api/products/${currentProduct.id}`, {
                //   method: 'PUT',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(formData)
                // });

                // For demonstration, we'll just update the product in our state
                setProducts(products.map(p =>
                    p.id === currentProduct.id ? { ...p, ...formData } : p
                ));

                setAlert({
                    type: 'success',
                    message: `Product "${formData.name}" has been updated successfully.`
                });
            } else {
                // Add new product
                // Replace with your actual API call
                // const response = await fetch('/api/products', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(formData)
                // });
                // const newProduct = await response.json();

                // For demonstration, we'll just add a new product with a generated ID
                const newProduct = {
                    ...formData,
                    id: Math.max(0, ...products.map(p => p.id)) + 1
                };
                setProducts([...products, newProduct]);

                setAlert({
                    type: 'success',
                    message: `Product "${formData.name}" has been added successfully.`
                });
            }

            setIsModalOpen(false);
        } catch (err) {
            setAlert({
                type: 'error',
                message: `Failed to save product. Please try again.`
            });
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="products-container">
            <header className="page-header">
                <h1>Products</h1>
                <Button onClick={handleAddProduct}>Add New Product</Button>
            </header>

            {alert.message && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: '', message: '' })}
                    autoClose={true}
                />
            )}

            <Table
                columns={columns}
                data={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                emptyMessage="No products found. Add some products to get started."
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm
                    product={currentProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}

export default Products;
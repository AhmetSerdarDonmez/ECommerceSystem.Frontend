/* eslint-disable no-unused-vars */
// pages/Products.js (Refined Add/Update state logic)
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import Alert from '../components/Alert';
import './Products.css';
import {
    GetAllProducts,
    RemoveProductById,
    AddSingleProduct,
    UpdateProductById
} from '../services/ProductService';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });

    // --- Helper function to map API data to Table data ---
    // *** CRITICAL: Ensure this matches the ACTUAL data structure returned by GetAll, AddSingle, and UpdateById ***
    const mapApiProductToTableProduct = (apiProduct) => {
        // Add robust checks for incoming data validity
        if (!apiProduct || typeof apiProduct !== 'object' || !apiProduct.productId) {
            console.warn("mapApiProductToTableProduct received invalid data:", apiProduct);
            return null; // Return null if data is invalid/incomplete
        }

        // Check casing (price vs Price) based on console logs from handleFormSubmit
        // Assuming lowercase 'price' for now - **ADJUST THIS BASED ON YOUR CONSOLE LOGS**
        const priceFromApi = apiProduct.price !== undefined ? apiProduct.price : null; // Default to null if price is missing

        return {
            id: apiProduct.productId,
            name: apiProduct.productName || 'N/A', // Provide default if missing
            price: priceFromApi, // Use the potentially adjusted price field
            description: apiProduct.productDescription || 'N/A', // Provide default
        };
    };

    // --- Define columns based on the MAPPED structure ---
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price', render: (row) => row.price !== null ? `$${row.price.toFixed(2)}` : 'N/A' }, // Handle potential null price
        { key: 'description', label: 'Description' },
    ];

    // --- Fetch and Map Products ---
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            setAlert({ type: '', message: '' });

            const apiData = await GetAllProducts();
            // Filter out any potential nulls from mapping, although GetAll should be reliable
            const mappedProducts = apiData.map(mapApiProductToTableProduct).filter(p => p !== null);
            setProducts(mappedProducts);

        } catch (err) {
            console.error("Fetch Products Error:", err);
            setError('Failed to load products');
            setAlert({ type: 'error', message: 'Failed to load products. Please check connection or try again later.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- Modal Handlers (remain the same) ---
    const handleAddProduct = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    // --- Delete Handler (remains the same) ---
    const handleDelete = async (productToDelete) => {
        if (window.confirm(`Are you sure you want to delete "${productToDelete.name}"?`)) {
            try {
                await RemoveProductById(productToDelete.id);
                setProducts(currentProducts => currentProducts.filter(p => p.id !== productToDelete.id));
                setAlert({
                    type: 'success',
                    message: `Product "${productToDelete.name}" deleted successfully.`
                });
            } catch (err) {
                console.error("Delete Product Error:", err);
                setAlert({
                    type: 'error',
                    message: `Failed to delete product "${productToDelete.name}". ${err.message || ''}`
                });
            }
        }
    };

    // --- Form Submission Handler (Add/Update) - REFINED ---
    const handleFormSubmit = async (formData) => {
        // ... (validation remains the same) ...
        const priceValue = parseFloat(formData.price);
        if (isNaN(priceValue)) {
            setAlert({ type: 'error', message: 'Invalid price entered. Please enter a number.' });
            return;
        }
        // ... (other validation if needed) ...

        try {
            let resultApiProduct; // Will hold the raw response from the API
            let successMessage;

            setAlert({ type: '', message: '' }); // Clear previous alerts specific to submit

            console.log("Submitting Form Data:", formData); // Log data being sent

            if (currentProduct) {
                // ----- UPDATE -----
                console.log(`Calling UpdateProductById for ID: ${currentProduct.id}`);
                resultApiProduct = await UpdateProductById(
                    currentProduct.id,
                    formData.name,
                    priceValue,
                    formData.description
                );
                // *** Log the exact API response ***
                console.log("API response from UpdateProductById:", resultApiProduct);

                // *** Attempt to map the response ***
                const updatedMappedProduct = mapApiProductToTableProduct(resultApiProduct);
                console.log("Mapped data after update:", updatedMappedProduct);

                if (updatedMappedProduct) {
                    // If mapping is successful, update the state
                    successMessage = `Product "${updatedMappedProduct.name}" updated successfully.`;
                    setProducts(currentProducts =>
                        currentProducts.map(p =>
                            p.id === currentProduct.id ? updatedMappedProduct : p
                        )
                    );
                    setAlert({ type: 'success', message: successMessage });
                    closeModal();
                } else {
                    // If mapping failed (API didn't return expected data)
                    console.warn("Update successful, but API response was not usable for direct state update.");
                    setAlert({ type: 'warning', message: `Product updated. Refreshing list to ensure consistency.` });
                    closeModal();
                    await fetchProducts(); // *** Re-fetch the entire list as a fallback ***
                }

            } else {
                // ----- ADD -----
                console.log("Calling AddSingleProduct");
                resultApiProduct = await AddSingleProduct(
                    formData.name,
                    priceValue,
                    formData.description
                );
                // *** Log the exact API response ***
                console.log("API response from AddSingleProduct:", resultApiProduct);

                // *** Attempt to map the response ***
                const newMappedProduct = mapApiProductToTableProduct(resultApiProduct);
                console.log("Mapped data after add:", newMappedProduct);

                if (newMappedProduct) {
                    // If mapping is successful, add to state
                    successMessage = `Product "${newMappedProduct.name}" added successfully.`;
                    setProducts(currentProducts => [...currentProducts, newMappedProduct]);
                    setAlert({ type: 'success', message: successMessage });
                    closeModal();
                } else {
                    // If mapping failed (API didn't return expected data)
                    console.warn("Add successful, but API response was not usable for direct state update.");
                    setAlert({ type: 'warning', message: `Product added. Refreshing list to ensure consistency.` });
                    closeModal();
                    await fetchProducts(); // *** Re-fetch the entire list as a fallback ***
                }
            }

        } catch (err) {
            console.error("Form Submit Error (Add/Update):", err);
            const action = currentProduct ? 'update' : 'add';
            setAlert({
                type: 'error',
                message: `Failed to ${action} product "${formData.name}". ${err.message || 'Please try again.'}`
            });
            // Keep modal open for user correction on error
        }
    };

    // --- Render Logic (remains the same) ---
    if (loading) return <div className="loading">Loading products...</div>;
    if (error && products.length === 0) { /* ... */ }

    return (
        <div className="products-container">
            {/* Header */}
            <header className="page-header">
                <h1>Products</h1>
                <Button onClick={handleAddProduct}>Add New Product</Button>
            </header>

            {/* Alert */}
            {alert.message && (<Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} autoClose={5000} />)}

            {/* Table */}
            {!loading && (<Table columns={columns} data={products} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No products found. Click 'Add New Product' to get started." />)}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={currentProduct ? `Edit Product: ${currentProduct.name}` : 'Add New Product'} >
                <ProductForm product={currentProduct} onSubmit={handleFormSubmit} onCancel={closeModal} />
            </Modal>
        </div>
    );
}

export default Products;
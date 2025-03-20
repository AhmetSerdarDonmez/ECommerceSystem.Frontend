// components/ProductForm.js (updated)
import React, { useEffect } from 'react';
import './Form.css';
import Button from './Button';
import useFormValidation from '../hooks/useFormValidation';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const initialState = {
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
    };

    const validateProduct = (values) => {
        const errors = {};

        if (!values.name.trim()) {
            errors.name = 'Product name is required';
        }

        if (!values.price) {
            errors.price = 'Price is required';
        } else if (isNaN(values.price) || Number(values.price) <= 0) {
            errors.price = 'Price must be a positive number';
        }

        if (!values.category.trim()) {
            errors.category = 'Category is required';
        }

        if (!values.stock) {
            errors.stock = 'Stock amount is required';
        } else if (isNaN(values.stock) || Number(values.stock) < 0) {
            errors.stock = 'Stock must be a non-negative number';
        }

        return errors;
    };

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues
    } = useFormValidation(initialState, validateProduct);

    useEffect(() => {
        if (product) {
            setValues({
                name: product.name || '',
                price: product.price || '',
                category: product.category || '',
                stock: product.stock || '',
                description: product.description || ''
            });
        }
    }, [product, setValues]);

    const submitForm = (event) => {
        handleSubmit(event, (formData) => {
            onSubmit({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            });
        });
    };

    return (
        <form className="form" onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="name">Product Name*</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="price">Price ($)*</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={values.price}
                        onChange={handleChange}
                        className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <div className="error-message">{errors.price}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock*</label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={values.stock}
                        onChange={handleChange}
                        className={errors.stock ? 'error' : ''}
                    />
                    {errors.stock && <div className="error-message">{errors.stock}</div>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    className={errors.category ? 'error' : ''}
                >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows="4"
                />
            </div>

            <div className="form-actions">
                <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
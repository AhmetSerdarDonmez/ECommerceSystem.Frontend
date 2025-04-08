// src/services/UserService.js
// import axios from 'axios';
import apiClient from '../apiClient';


export const GetProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/Product/get-product-by-id/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const GetAllProducts = async () => {
    try {
        const response = await apiClient.get('/Product/get-all-product'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }


};
export const RemoveProductById = async (productId) => {
    try {
        const response = await apiClient.delete(`/Product/remove-product-by-id/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing product:', error);
        throw error;
    }

}
export const AddSingleProduct = async (productName, Price, ProductDescription) => {
    const payload = { productName, Price, ProductDescription };
    try {
        const response = await apiClient.post('/Product/add-single-product', payload);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export const UpdateProductById = async (productId, productName, Price, ProductDescription) => {
    const payload = { productName, Price, ProductDescription };
    try {
        const response = await apiClient.put(`/Product/update-product/${productId}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}
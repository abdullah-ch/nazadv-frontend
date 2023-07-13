import axios from './axiosConfig.js';

export const getProducts = () => axios.get('products');

export const createProduct = (payload) => axios.post('products', payload);

export const updateProduct = (payload) => axios.put('products', payload);

export const deleteProduct = (id) => axios.delete(`products/${id}`);

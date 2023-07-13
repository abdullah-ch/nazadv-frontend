import axios from './axiosConfig.js';

export const getCategories = () => axios.get('categories');

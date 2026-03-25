import api from './api';

export const getProducts = async (params = {}) => {
  const response = await api.get('products/', { params });
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`products/${slug}/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('categories/');
  return response.data;
};

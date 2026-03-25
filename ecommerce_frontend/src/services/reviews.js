import api from './api';

export const getReviews = async (productId) => {
  const response = await api.get(`reviews/${productId}/`);
  return response.data;
};

export const createOrUpdateReview = async (reviewData) => {
  const response = await api.post('reviews/', reviewData);
  return response.data;
};

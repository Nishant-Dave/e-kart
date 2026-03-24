import api from './api';

/**
 * Helper to construct the Authorization header
 * Retrieves the JWT token dynamically from localStorage
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

/**
 * Helper to standardise error logging
 */
const handleError = (action, error) => {
  console.error(`Error during ${action}:`);
  if (error.response) {
    console.error(`Backend returned code ${error.response.status}`);
    console.error('Response details:', error.response.data);
  } else if (error.request) {
    console.error('No response received from the server (network error or backend is down).');
  } else {
    console.error('Failed to setup request:', error.message);
  }
  throw error; // Throw so UI logic can display toast/alert messages
};

/**
 * Adds a product to the user's cart.
 * @param {number|string} productId 
 * @param {number} quantity 
 */
export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post('cart/add/', { product_id: productId, quantity }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError('add to cart', error);
  }
};

/**
 * Retrieves the user's current cart.
 * GET /cart/
 */
export const getCart = async () => {
  try {
    const response = await api.get('cart/', getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError('fetch cart', error);
  }
};

/**
 * Updates the quantity of a specific item in the cart.
 * POST /cart/update/
 * @param {number|string} productId 
 * @param {number} quantity 
 */
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.post('cart/update/', { product_id: productId, quantity }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError('update cart item', error);
  }
};

/**
 * Removes a specific item from the cart.
 * POST /cart/remove/
 * @param {number|string} productId 
 */
export const removeCartItem = async (productId) => {
  try {
    const response = await api.post('cart/remove/', { product_id: productId }, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError('remove cart item', error);
  }
};

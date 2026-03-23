import api from './api';

/**
 * Adds a product to the user's cart.
 * 
 * @param {number|string} productId - The ID of the product to add.
 * @param {number} quantity - The quantity to add.
 * @returns {Promise<Object>} The server response data.
 */
export const addToCart = async (productId, quantity) => {
  try {
    // Get JWT token from localStorage (checking both 'access_token' and 'token' formats)
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    
    // Prepare the configuration, adding the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Use the axios instance to send the request
    const response = await api.post(
      '/cart/add/', 
      {
        product_id: productId,
        quantity: quantity
      },
      config
    );
    
    return response.data;
  } catch (error) {
    // Handle API errors properly and log meaningful errors
    console.error('Error adding item to cart:');
    if (error.response) {
      // The server responded with a status code that falls out of the range of 2xx
      console.error(`Backend returned code ${error.response.status}`);
      console.error('Response details:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server (network error or backend is down).');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Failed to setup request:', error.message);
    }
    
    // Throw the error so calling components can handle UI states (e.g. toasts)
    throw error;
  }
};

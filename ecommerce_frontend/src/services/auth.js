import api from './api';

/**
 * Register a new user
 * @param {Object} userData - Should contain the necessary fields (e.g. email, password, etc)
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('auth/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Login a user and retrieve JWT tokens
 * @param {Object} credentials - Usually { email, password } or { username, password }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('auth/login/', credentials);
    // Usually responses contain access and refresh tokens
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
    } else if (response.data.token) {
      // Fallback for some Simple JWT setups that return a single 'token'
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('access_token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logout user by removing tokens
 */
export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
};

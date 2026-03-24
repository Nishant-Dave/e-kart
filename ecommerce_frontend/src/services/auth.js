import api from './api';

/**
 * Login a user natively with arguments
 * @param {string} email 
 * @param {string} password 
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('auth/login/', { email, password });
    
    // Store access token natively
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
    } else if (response.data.token) {
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
 * Remove active session tokens
 */
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
};

/**
 * Helper to safely extract the token
 * @returns {string | null}
 */
export const getToken = () => {
  return localStorage.getItem('access_token') || localStorage.getItem('token');
};

// --- Legacy aliases preserved for backwards compatibility with older UI components --- //

export const registerUser = async (userData) => {
  try {
    const response = await api.post('auth/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  return await login(credentials.email, credentials.password);
};

export const logoutUser = () => {
  logout();
};

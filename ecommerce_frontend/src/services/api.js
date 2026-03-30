import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://e-kart-3xsq.onrender.com/api/',
// });

const API = import.meta.env.VITE_API_URL;

// Configure Axios to automatically attach JWT token on requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

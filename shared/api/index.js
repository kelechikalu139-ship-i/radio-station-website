import axios from 'axios';
import { API_URL } from '../constants/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true   // if you're using cookies
});

// Auto-add token if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
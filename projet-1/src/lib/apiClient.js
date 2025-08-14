import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
});

// Intercepteur pour ajouter le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionnel: rediriger vers login
    }
    return Promise.reject(error);
  }
);

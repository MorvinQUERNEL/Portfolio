import axios from 'axios';

// Configuration dynamique de l'URL de l'API selon l'environnement
const getApiBaseUrl = () => {
  if (window.location.hostname === 'morvin-quernel.com' || window.location.hostname === 'www.morvin-quernel.com') {
    // En production, utiliser le sous-dossier api sur Hostinger (temporaire)
    return 'https://morvin-quernel.com/api';
  } else {
    // En développement, utiliser localhost
    return 'http://localhost:8080/api/public';
  }
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
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

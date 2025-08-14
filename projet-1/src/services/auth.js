import { api } from '../lib/apiClient';

export async function login({ email, password }) {
  try {
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur de connexion');
  }
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getProfile() {
  const { data } = await api.get('/me');
  return data;
}

export async function checkApiStatus() {
  const { data } = await api.get('/status');
  return data;
}

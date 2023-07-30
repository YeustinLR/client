// services/authUtils.js
import api from './api';

export const checkTokenValidity = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const response = await api.get('/users/validateToken', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.valid) {
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
  } catch (error) {
    console.error('Error al verificar la validez del token:', error);
    localStorage.removeItem('token');
    return false;
  }
};

// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

//Función para obtener el token almacenado en el almacenamiento local (localStorage)
const getToken = () => {
  return localStorage.getItem('token');
};

// Configuración global para incluir el token en el encabezado de todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

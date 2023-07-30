// pages/Register.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUserData(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {userData.nombreUsuario}</h1>
      <p>Nombre: {userData.nombre}</p>
      <p>Rol: {userData.esAdministrador ? 'Administrador' : 'Usuario'}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;

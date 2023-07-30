// components/NavBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../style/NavBar.css';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Si el usuario ha iniciado sesión, obtener su perfil
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUserData(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      // Si ocurre un error al obtener el perfil del usuario, puedes manejarlo aquí
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand-1">@YourApi</h1>
      {isLoggedIn && (
        <>
          {userData && (
            <>
              <h1 className="navbar-brand-2">Bienvenido, {userData.nombreUsuario}</h1>
              <h1 className="navbar-brand-3">Rol: {userData.esAdministrador ? 'Administrador' : 'Usuario'}</h1>
            </>
          )}
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/home" className="navbar-link">Home</Link>
            </li>
            {userData && userData.esAdministrador && (
              <li className="navbar-item"> 
                <Link to="/pending" className="navbar-link">Pendings</Link>
              </li>
            )}
            {userData && userData.esAdministrador && (
              <li className="navbar-item"> 
                <Link to="/users" className="navbar-link">Users</Link>
              </li>
            )}
          </ul>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;

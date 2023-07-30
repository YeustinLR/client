import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import { checkTokenValidity } from './services/authUtils';
import Homepage from './pages/Home';
import PendingUsers from './pages/PendingUsers';
import UsersPage from './pages/AdminUsersPage';
import api from './services/api';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  // Efecto para verificar periódicamente la validez del token
  useEffect(() => {
    const tokenInterval = setInterval(async () => {
      const isValid = await checkTokenValidity();
      setIsLoggedIn(isValid);
    }, 5000); // Verificar cada 5 segundos (5000 ms)

    return () => {
      clearInterval(tokenInterval);
    };
  }, []);

  // Efecto para obtener los datos del usuario (isAdmin) si está logeado
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await api.get('/users/profile');
          setIsAdmin(response.data.esAdministrador);
        } catch (error) {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Ruta protegida */}
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Homepage />} />
            {/* Ruta por defecto */}
            <Route path="/" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        {/* Ruta de pendientes solo visible si el usuario es administrador */}
        {isAdmin ? (
          <>
            <Route path="/pending" element={<PendingUsers />} />
          </>
        ) : (
          <Route path="/pending" element={<Navigate to="/home" />} />
        )}
        {isAdmin ? (
          <>
            <Route path="/users" element={<UsersPage />} />
          </>
        ) : (
          <Route path="/users" element={<Navigate to="/home" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

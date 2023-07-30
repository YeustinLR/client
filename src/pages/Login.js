// pages/Register.js

import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../style/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', { correoElectronico: email, contrasena: password });
      const { token } = response.data;

      // Guardar el token JWT en el almacenamiento local (localStorage)
      localStorage.setItem('token', token);

      window.location.href = '/home';
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Datos incorrectos. Por favor, verifica tu correo y contraseña.');
      setEmail('');
      setPassword('');

      // Restablecer el mensaje de error 
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="register-link">¿Nuevo por aquí? <Link to="/register">Regístrate</Link></p>
    </div>
  );
};

export default Login;

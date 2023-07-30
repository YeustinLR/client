// pages/Register.js
import React, { useState } from 'react';
import api from '../services/api';
import '../style/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();



    // Validar que todos los campos tengan valor
    if (!nombre || !nombreUsuario || !correoElectronico || !contrasena) {
      setMessage('Por favor, complete todos los campos.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
      return;
    }

    try {
      const response = await api.post('/pending/register', {
        nombre,
        nombreUsuario,
        correoElectronico,
        contrasena,
      });

      if (response.status === 201) {
        //Validacion de registro exitoso
        setMessage('Su usuario ha sido registrado, espera que su cuenta sea validada por un administrador');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMessage('Ha ocurrido un error al registrar usuario');
    }
  };
  const handleLoginButtonClick = () => {
    window.location.href = '/login'; 
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
          <input type="text" id="nombreUsuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
        </div>
        <div>
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input type="email" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" onClick={handleLoginButtonClick}>
          Cancelar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;

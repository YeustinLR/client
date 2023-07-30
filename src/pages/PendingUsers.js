import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../style/Pending.css'

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      const response = await api.get('/pending/pending');
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error al cargar los usuarios pendientes:', error);
    }
  };

  const approveUser = async (userId) => {
    try {
      await api.post(`/pending/approve/${userId}`);
      // Recargar la lista de usuarios pendientes después de aprobar/rechazar
      loadPendingUsers();
    } catch (error) {
      console.error('Error al aprobar el usuario:', error);
    }
  };

  const rejectUser = async (userId) => {
    try {
      await api.delete(`/pending/reject/${userId}`);
      // Recargar la lista de usuarios pendientes después de aprobar/rechazar
      loadPendingUsers();
    } catch (error) {
      console.error('Error al rechazar el usuario:', error);
    }
  };

  return (
    <div className="container">
      <div className="pending-users-wrapper" id="pending-users-page">
        <h1 className="pending-users-header">Usuarios Pendientes</h1>
        <ul>
          {pendingUsers.map((user) => (
            <li key={user._id} className="pending-user-card">
              <div className="pending-user-info">
                <p>Nombre: {user.nombre}</p>
                <p>Nombre de Usuario: {user.nombreUsuario}</p>
                <p>Correo Electrónico: {user.correoElectronico}</p>
              </div>
              <div className="pending-user-actions">
                <button onClick={() => approveUser(user._id)}>Aprobar</button>
                <button onClick={() => rejectUser(user._id)}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingUsers;

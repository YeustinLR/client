// src/pages/AdminUsersPage.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/modals/EditModal';
import CreateModal from '../components/modals/CreateModal';
import '../style/AdminUsersPage.css';


const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [message, setMessage] = useState('');



  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);

    } catch (error) {
      console.error('Error al cargar los usuarios:', error);

      setMessage('Error al cargar los usuarios:');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/delete/${userId}`);
      loadUsers();

      setMessage('Usuario eliminado correctamente');
      setTimeout(() => {
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error al eliminar el usuario:', error);

      setMessage('Error al eliminar el usuario.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCreateUser = () => {
    setCreateModalOpen(true);
  };

  const handleCreateNewUser = async (userData) => {
    try {
      await api.post('/users/create',userData);
      setCreateModalOpen(false);
      loadUsers();
  
      setMessage('Usuario creado exitosamente.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
  
      setMessage('Error al agregar el usuario, revisa nuevamente los datos.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };
  

  const handleUpdateUser = async (userData) => {
    try {
      await api.patch(`/users/update/${userData._id}`, userData);
      setEditModalOpen(false);
      loadUsers();

      setMessage('Usuario actualizado correctamente.');
      setTimeout(() => {
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      
      setMessage('Error al actualizar el usuario, revisa nuevamente los datos.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div className="admin-users-page">
      <h1>Administración de Usuarios</h1>
      <button onClick={handleCreateUser}>Crear Usuario</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nombre de Usuario</th>
            <th>Correo Electrónico</th>
            <th>Es Administrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.nombreUsuario}</td>
              <td>{user.correoElectronico}</td>
              <td>{user.esAdministrador ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p>{message}</p>}

      {/* Modal para editar usuario */}
      {isEditModalOpen && (
        <EditModal user={selectedUser} onClose={() => setEditModalOpen(false)} onSave={handleUpdateUser} />
      )}

      {/* Modal para crear usuario */}
      {isCreateModalOpen && <CreateModal onClose={() => setCreateModalOpen(false)} onSave={handleCreateNewUser} />}
    </div>
  );
};

export default AdminUsersPage;

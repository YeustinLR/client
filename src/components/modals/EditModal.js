// src/components/modals/EditModal.js
import React, { useState, useEffect } from 'react';

const EditModal = ({ user, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    _id: '',
    nombre: '',
    nombreUsuario: '',
    correoElectronico: '',
    esAdministrador: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        _id: user._id,
        nombre: user.nombre,
        nombreUsuario: user.nombreUsuario,
        correoElectronico: user.correoElectronico,
        esAdministrador: user.esAdministrador,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(userData);
  };

  return (
    <div className="edit-modal">
      <h2>Editar Usuario</h2>
      <label>
        Nombre:
        <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} />
      </label>
      <label>
        Nombre de Usuario:
        <input type="text" name="nombreUsuario" value={userData.nombreUsuario} onChange={handleChange} />
      </label>
      <label>
        Correo Electrónico:
        <input type="email" name="correoElectronico" value={userData.correoElectronico} onChange={handleChange} />
      </label>
      <label>
        Es Administrador:
        <select name="esAdministrador" value={userData.esAdministrador} onChange={handleChange}>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </label>
      <div className="modal-buttons">
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;

import React, { useState } from 'react';

const CreateModal = ({ onClose, onSave }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    nombreUsuario: '',
    correoElectronico: '',
    contrasena: '',
    esAdministrador: false, // Valor predeterminado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(userData);
  };

  return (
    <div className="create-modal">
      <h2>Crear Nuevo Usuario</h2>
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
        Contraseña:
        <input type="password" name="contrasena" value={userData.contrasena} onChange={handleChange} />
      </label>
      <label>
        Es Administrador:
        <select name="esAdministrador" value={userData.esAdministrador} onChange={handleChange}>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </label>
      <div className="modal-buttons">
        <button onClick={handleSave}>Crear</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default CreateModal;

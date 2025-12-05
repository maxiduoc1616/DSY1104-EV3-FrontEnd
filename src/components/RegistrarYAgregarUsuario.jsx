import React, { useState } from 'react';
import api from '../services/axios';

const RegistroYAgregarUsuario = () => {
  // Formulario de Registro
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    codigoPromocional: "",
    nombre: "",
    apellido: "",
    phone: "",
    mayorDe50: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitRegistro = (e) => {
    e.preventDefault();

    const usuario = {
      email: formData.email,
      password: formData.password,
      nombre: formData.nombre,
      apellido: formData.apellido,
      phone: formData.phone,
      codigoPromocional:
        formData.codigoPromocional === "FELICES50"
          ? formData.codigoPromocional
          : null,
      mayorDe50: formData.mayorDe50,
    };

    // Guardar usuario en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Registro exitoso. ¡Bienvenido!");
  };

  // Formulario de Agregar Usuario (Añadir)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitAddUser = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
    };

    try {
      const response = await api.post('/api/users/add', newUser);

      if (response.status === 201) {
        setMessage('Usuario agregado con éxito');
      }
    } catch (error) {
      setMessage('Error al agregar el usuario');
    }

    // Limpiar el formulario
    setName('');
    setEmail('');
  };

  return (
    <div className="container">
      {/* Formulario de Registro */}
      <h2>Formulario de Registro</h2>
      <form id="registroForm" onSubmit={handleSubmitRegistro}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codigoPromocional" className="form-label">Código Promocional (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="codigoPromocional"
            value={formData.codigoPromocional}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono (opcional)</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="mayorDe50"
            checked={formData.mayorDe50}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="mayorDe50">Tengo más de 50 años</label>
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>

      {/* Mensaje de éxito al registrar usuario */}
      {message && <p>{message}</p>}

      {/* Formulario para Agregar un Usuario (Backend) */}
      <h2>Agregar Usuario (Backend)</h2>
      <form onSubmit={handleSubmitAddUser}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Usuario</button>
      </form>

      {/* Mensaje de éxito al agregar usuario */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistroYAgregarUsuario;

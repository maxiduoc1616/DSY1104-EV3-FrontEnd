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

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    const usuario = {
      email: formData.email,
      password: formData.password,
      name: formData.nombre,  // Mapear 'nombre' a 'name'
      apellido: formData.apellido,  // Agregar 'apellido'
      phone: formData.phone,  // Agregar 'phone'
      codigoPromocional:
        formData.codigoPromocional === "FELICES50"
          ? formData.codigoPromocional
          : null,
      mayorDe50: formData.mayorDe50,  // Agregar 'mayorDe50'
    };

    try {
      const response = await api.post('/api/v1/users/add', usuario);
      if (response.status === 201) {
        alert("Registro exitoso. ¡Bienvenido!");
        localStorage.setItem("usuario", JSON.stringify(response.data));  // Guardar el usuario registrado
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario.");
    }
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
    </div>
  );
};

export default RegistroYAgregarUsuario;

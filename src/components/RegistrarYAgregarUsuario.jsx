import React, { useState } from 'react';
import api from '../services/axios';

const RegistroYAgregarUsuario = () => {
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

        const emailBase = formData.email.split('@')[0].toLowerCase();
        let rolAsignado = "USER";
        
        if (emailBase === "admin") {
            rolAsignado = "ADMIN";
        }
        const usuarioAEnviar = {
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
            
            role: rolAsignado,
        };

        try {
          const response = await api.post('/v1/users/add', usuarioAEnviar);
            
            if (response.status === 201) {
                alert(`Registro exitoso. ¡Bienvenido, tu rol es ${rolAsignado}!`);
                
                localStorage.setItem("usuario", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error.response ? error.response.data : error.message);
            alert("Hubo un error al registrar el usuario.");
        }
    };

    return (
        <div className="container">
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
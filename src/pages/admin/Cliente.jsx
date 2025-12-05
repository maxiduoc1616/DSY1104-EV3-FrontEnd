import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });

  // Cargar clientes desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(stored);
  }, []);

  // Guardar en localStorage cuando cambian los clientes
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.correo.trim() || !form.telefono.trim()) return;

    setClientes([...clientes, form]);
    setForm({ nombre: "", correo: "", telefono: "" });
  };

  const eliminarCliente = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      const nuevos = [...clientes];
      nuevos.splice(index, 1);
      setClientes(nuevos);
    }
  };

  const editarCliente = (index) => {
    const c = clientes[index];
    const nuevoNombre = prompt("Nuevo nombre:", c.nombre);
    const nuevoCorreo = prompt("Nuevo correo:", c.correo);
    const nuevoTelefono = prompt("Nuevo teléfono:", c.telefono);

    if (nuevoNombre && nuevoCorreo && nuevoTelefono) {
      const nuevos = [...clientes];
      nuevos[index] = {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        telefono: nuevoTelefono,
      };
      setClientes(nuevos);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4">Clientes</h2>

      {/* Formulario */}
      <div className="card mb-4">
        <div className="card-body">
          <form id="clientForm" className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre del cliente"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="correo@cliente.com"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                placeholder="555-1234"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-success">
                Agregar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lista de clientes */}
      <div id="clientList">
        {clientes.length === 0 ? (
          <div className="alert alert-info">
            No hay clientes registrados.
          </div>
        ) : (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c, i) => (
                <tr key={i}>
                  <td>{c.nombre}</td>
                  <td>{c.correo}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editarCliente(i)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCliente(i)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

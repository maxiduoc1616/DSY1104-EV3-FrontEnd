import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({ nombre: "", cargo: "", correo: "" });

  // Cargar empleados desde localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("empleados")) || [];
    setEmpleados(stored);
  }, []);

  // Guardar en localStorage cuando cambien los empleados
  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  // Manejar cambio de inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  // Agregar empleado
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.cargo.trim() || !form.correo.trim()) return;

    setEmpleados([...empleados, form]);
    setForm({ nombre: "", cargo: "", correo: "" });
  };

  // Eliminar empleado
  const eliminarEmpleado = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar este empleado?")) {
      const nuevos = [...empleados];
      nuevos.splice(index, 1);
      setEmpleados(nuevos);
    }
  };

  // Editar empleado
  const editarEmpleado = (index) => {
    const e = empleados[index];
    const nuevoNombre = prompt("Nuevo nombre:", e.nombre);
    const nuevoCargo = prompt("Nuevo cargo:", e.cargo);
    const nuevoCorreo = prompt("Nuevo correo:", e.correo);

    if (nuevoNombre && nuevoCargo && nuevoCorreo) {
      const nuevos = [...empleados];
      nuevos[index] = {
        nombre: nuevoNombre,
        cargo: nuevoCargo,
        correo: nuevoCorreo,
      };
      setEmpleados(nuevos);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4">Empleados</h2>

      {/* Formulario */}
      <div className="card mb-4">
        <div className="card-body">
          <form id="employeeForm" className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre del empleado"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="cargo" className="form-label">
                Cargo
              </label>
              <input
                type="text"
                className="form-control"
                id="cargo"
                placeholder="Cargo del empleado"
                value={form.cargo}
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
                placeholder="correo@empresa.com"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-success">
                Agregar Empleado
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lista de empleados */}
      <div id="employeeList">
        {empleados.length === 0 ? (
          <div className="alert alert-info">
            No hay empleados registrados.
          </div>
        ) : (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((e, i) => (
                <tr key={i}>
                  <td>{e.nombre}</td>
                  <td>{e.cargo}</td>
                  <td>{e.correo}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editarEmpleado(i)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarEmpleado(i)}
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

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/estiloAdmin.css";
import logo from "../assets/img/logo.png";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("usuarioLogueado")
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = e.target.usuario.value.trim();
    const password = e.target.password.value.trim();

    if (usuario === "admin" && password === "1234") {
      localStorage.setItem("usuarioLogueado", usuario);
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("usuarioLogueado");
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ width: "350px" }}>
          <div className="text-center mb-3">
            <img src={logo} alt="Logo Empresa" style={{ width: "80px" }} />
            <h5 className="mt-2">Acceso Administrador</h5>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                name="usuario"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo Empresa" style={{ width: "80px" }} />
          <h5 className="mt-2">Panel Admin</h5>
        </div>

        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/ordenes" className="nav-link">Órdenes</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/clientes" className="nav-link">Clientes</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/empleados" className="nav-link">Empleados</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link">Agregar Producto</Link>
          </li>
        </ul>

        {/* Botón Cerrar Sesión centrado y al fondo */}
        <div className="logout-container">
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import carrito from "../assets/img/carrito-de-compras.png";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fondoNavBar">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo Pastelería"
            width="37"
            height="30"
            className="d-inline-block align-text-top"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link">
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link">
                Contactos
              </NavLink>
            </li>
          </ul>

          {usuario ? (
            <span className="nav-link me-5">{usuario.nombre}</span>
          ) : (

            <>
              <NavLink to="/iniciarSesion" className="nav-link me-2">
                Iniciar Sesión |
              </NavLink>
              <NavLink to="/registro" className="nav-link me-5">
                Registrarse
              </NavLink>
            </>
          )}

          <NavLink to="/carro" className="navbar-text">
            <img src={carrito} alt="Carro" width="20" height="20" />
            Carro
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

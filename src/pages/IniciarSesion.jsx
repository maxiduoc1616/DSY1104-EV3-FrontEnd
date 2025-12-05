import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.email === email && usuario.password === password) {
      alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
      navigate("/usuarioNormal/paginaPrincipal"); 
      
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container">
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;

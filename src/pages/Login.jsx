import React, { useState } from "react";
import api from "../services/axios"; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/v1/auth/login", {
        email: username, 
        password,
      });

      const { token, userId, userName, roles } = response.data;

      localStorage.setItem("jwtToken", token); 
      localStorage.setItem("user", JSON.stringify({ userId, userName, roles })); 

      navigate("/admin");
      
    } catch (error) {
      console.error("Error de autenticación:", error.response ? error.response.data : error.message);
      alert("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
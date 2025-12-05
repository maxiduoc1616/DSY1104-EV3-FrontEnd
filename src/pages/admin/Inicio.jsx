import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Inicio() {
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    // Obtener la fecha del último inicio de sesión
    const storedDate = localStorage.getItem("lastLoginDate");

    if (storedDate) {
      setLastLogin(new Date(storedDate).toLocaleString());
    } else {
      // Si no existe, crearla
      const now = new Date().toISOString();
      localStorage.setItem("lastLoginDate", now);
      setLastLogin(new Date(now).toLocaleString());
    }

    // Inicializar modales Bootstrap si hubiera alguno en esta sección
    const modals = document.querySelectorAll("#mainContent .modal");
    modals.forEach((modalEl) => new window.bootstrap.Modal(modalEl));
  }, []);

  return (
    <div className="text-center mt-5">
      <h2>¡Hola Administrador!</h2>
      <p>Bienvenido al panel de administración.</p>

      <div className="mt-3">
        <strong>Último inicio de sesión:</strong>{" "}
        <span id="lastLogin">{lastLogin || "Cargando..."}</span>
      </div>
    </div>
  );
}

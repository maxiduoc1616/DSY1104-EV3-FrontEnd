import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Páginas de usuario
import PaginaPrincipal from "./pages/paginaPrincipal.jsx";
import Carro from "./pages/carro.jsx";
import Productos from "./pages/Productos.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/IniciarSesion.jsx";
import Registro from "./components/RegistrarYAgregarUsuario.jsx";
import UsersList from "./components/UserList.jsx"; 

// Páginas de admin
import Inicio from "./pages/admin/Inicio.jsx";
import Ordenes from "./pages/admin/Ordenes.jsx";
import Clientes from "./pages/admin/Cliente.jsx";
import Empleados from "./pages/admin/Empleado.jsx";
import ProductsPage from "./pages/admin/ProductsPage.jsx";

// Logos del footer
import mastercardLogo from "./assets/img/logo-Mastercard.png";
import paypalLogo from "./assets/img/Paypal_2014_logo.png";
import visaLogo from "./assets/img/Visa_Logo.png";

export default function App() {
  const location = useLocation();
  const esAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar y footer solo fuera del admin */}
      {!esAdmin && <Navbar />}

      <Routes>
        {/* ==== RUTAS DE USUARIO ==== */}
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/carro" element={<Carro />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/iniciarsesion" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Ruta para mostrar la lista de usuarios */}
        <Route path="/usuarios" element={<UsersList />} />
        

        {/* ==== RUTAS DE ADMIN ==== */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<Inicio />} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>

        {/* ==== 404 ==== */}
        <Route
          path="*"
          element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>}
        />
      </Routes>

      {!esAdmin && (
        <Footer
          mastercardLogo={mastercardLogo}
          paypalLogo={paypalLogo}
          visaLogo={visaLogo}
        />
      )}
    </>
  );
}

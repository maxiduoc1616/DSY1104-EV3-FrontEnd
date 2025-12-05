import React from "react";
import '../App.css';
import { products } from "../pages/carro";
import paginaPrincipalImagen from "../assets/img/paginaPrincipalImagen.jpg";

export default function Home() { 
  const agregarAlCarrito = (id) => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
  

    const productoEnCarrito = carritoGuardado.find(item => item.id === id);
  
    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad >= 5) {
        alert("⚠️ No puedes agregar más de 5 unidades de este producto.");
        return;
      }
      productoEnCarrito.cantidad += 1;
    } else {
      const productoParaAgregar = products.find(p => p.id === id);
      if (!productoParaAgregar) {
        alert("Producto no encontrado");
        return;
      }
      carritoGuardado.push({ ...productoParaAgregar, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoGuardado));
    alert("Producto agregado al carrito");
  };

  return (
    <>
      {/* Contenido principal */}
      <div className="container pt-3">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-6 px-5 pt-5 pb-5">
              <div className="card-body">
                <h5 className="card-title">Aniversario 50</h5>
                <p className="card-text">
                  Pastelería 1000 Sabores celebra su 50 aniversario como un
                  referente en la repostería chilena. Famosa por su
                  participación en un récord Guinness en 1995, cuando colaboró
                  en la creación de la torta más grande del mundo, la
                  pastelería busca renovar su sistema de ventas online para
                  ofrecer una experiencia de compra moderna y accesible para
                  sus clientes.
                </p>
                <a href="/products">Ver products ⬇</a>
              </div>
            </div>
            <div className="col-md-6 px-3 pt-3 pb-3">
              <img
                src={paginaPrincipalImagen}
                className="img-pag-principal"
                alt="Imagen del aniversario"
              />
            </div>
          </div>
        </div>

        {/* Cards de products */}
        <div className="pt-3">
          <div className="row">
            {products.map((producto) => (
              <div key={producto.id} className="col-md-3 mb-4">
                <div className="card h-100" style={{ width: '18rem' }} id={producto.nombre}>
                  <img
                    src={producto.imagen}
                    className="card-img-top px-3 pt-3 pb-3"
                    alt={producto.nombre}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">Precio: {producto.precio.toLocaleString('es-CL')}</p>
                    <button onClick={() => agregarAlCarrito(producto.id)}>
                      Agregar al Carro
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

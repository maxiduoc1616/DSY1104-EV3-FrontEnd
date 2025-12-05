import React from "react";
import '../App.css';
import { products } from "../pages/carro";

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
      <div className="container pt-3">
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

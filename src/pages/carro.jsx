import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import tortaChocolate from "../assets/img/torta-chocolate.jpg";
import tortaCocoPina from "../assets/img/torta-coco-piña.jpg";
import tortaTresLeches from "../assets/img/torta-tres-leches.jpg";
import tortaRedVelvet from "../assets/img/torta-red-velvet.jpg";
import tortaFrutas from "../assets/img/torta-frutas.jpg";
import tortaLimon from "../assets/img/torta-limon.jpg";
import pieManzana from "../assets/img/pie-manzana.jpg";
import pieLimon from "../assets/img/pie-limon.jpg";
import pieCalabaza from "../assets/img/pie-calabaza.jpg";
import pieArandanos from "../assets/img/pie-arandanos.jpg";
import pieCereza from "../assets/img/pie_cereza.jpg";
import pieChocolate from "../assets/img/pie-chocolate.jpg";
import kuchenManzana from "../assets/img/kuchen-manzana.jpg";
import kuchenFrambuesa from "../assets/img/kuchen-frambuesa.jpg";
import kuchenDurazno from "../assets/img/kuchen-durazno.jpg";
import kuchenNuez from "../assets/img/kuchen-nuez.jpg";
import kuchenMora from "../assets/img/kuchen-mora.jpg";
import kuchenAlmendra from "../assets/img/kuchen-almendra.jpg";
import cheesecakeVainilla from "../assets/img/cheesecake-vainilla.jpg";
import cheesecakeFresa from "../assets/img/cheesecake-fresajpg.jpg";
import cheesecakeChocolateBlanco from "../assets/img/cheesecake-chocolate-blanco.jpg";
import cheesecakeLimon from "../assets/img/cheesecake-limon.jpg";
import cheesecakeFrutosRojos from "../assets/img/cheesecake-frutos-rojos.jpg";
import cheesecakeNutella from "../assets/img/cheesecake-nutella.jpg";
import api from "../services/axios";

import axios from '../services/axios';

const products = [
  { id: 1, nombre: "Torta de Chocolate", precio: 15000, categoria: "Torta", imagen: tortaChocolate },
  { id: 2, nombre: "Torta de Coco y Pina", precio: 13500, categoria: "Torta", imagen: tortaCocoPina },
  { id: 3, nombre: "Torta de Tres Leches", precio: 16000, categoria: "Torta", imagen: tortaTresLeches },
  { id: 4, nombre: "Torta Red Velvet", precio: 18000, categoria: "Torta", imagen: tortaRedVelvet },
  { id: 5, nombre: "Torta de Frutas", precio: 17500, categoria: "Torta", imagen: tortaFrutas },
  { id: 6, nombre: "Torta de Limón", precio: 14000, categoria: "Torta", imagen: tortaLimon },
  { id: 7, nombre: "Pie de Manzana", precio: 8000, categoria: "Pie", imagen: pieManzana },
  { id: 8, nombre: "Pie de Limon", precio: 8500, categoria: "Pie", imagen: pieLimon },
  { id: 9, nombre: "Pie de Calabaza", precio: 9500, categoria: "Pie", imagen: pieCalabaza },
  { id: 10, nombre: "Pie de Arandanos", precio: 10000, categoria: "Pie", imagen: pieArandanos },
  { id: 11, nombre: "Pie de Cereza", precio: 9500, categoria: "Pie", imagen: pieCereza },
  { id: 12, nombre: "Pie de Chocolate", precio: 11000, categoria: "Pie", imagen: pieChocolate },
  { id: 13, nombre: "Kuchen de Manzana", precio: 10000, categoria: "Kuchen", imagen: kuchenManzana },
  { id: 14, nombre: "Kuchen de Frambuesa", precio: 11500, categoria: "Kuchen", imagen: kuchenFrambuesa },
  { id: 15, nombre: "Kuchen de Durazno", precio: 12000, categoria: "Kuchen", imagen: kuchenDurazno },
  { id: 16, nombre: "Kuchen de Nuez", precio: 12500, categoria: "Kuchen", imagen: kuchenNuez },
  { id: 17, nombre: "Kuchen de Mora", precio: 11000, categoria: "Kuchen", imagen: kuchenMora },
  { id: 18, nombre: "Kuchen de Almendra", precio: 12000, categoria: "Kuchen", imagen: kuchenAlmendra },
  { id: 19, nombre: "Cheesecake Clasico de Vainilla", precio: 15000, categoria: "Cheesecake", imagen: cheesecakeVainilla },
  { id: 20, nombre: "Cheesecake de Fresa", precio: 16000, categoria: "Cheesecake", imagen: cheesecakeFresa },
  { id: 21, nombre: "Cheesecake de Chocolate Blanco", precio: 17500, categoria: "Cheesecake", imagen: cheesecakeChocolateBlanco },
  { id: 22, nombre: "Cheesecake de Limon", precio: 18000, categoria: "Cheesecake", imagen: cheesecakeLimon },
  { id: 23, nombre: "Cheesecake de Frutos Rojos", precio: 18000, categoria: "Cheesecake", imagen: cheesecakeFrutosRojos },
  { id: 24, nombre: "Cheesecake de Nutella", precio: 19000, categoria: "Cheesecake", imagen: cheesecakeNutella },
];

export { products };
export default function Carrito() {
  const [categoria, setCategoria] = useState("Todos");
  const [productsFiltrados, setproductsFiltrados] = useState(products);
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [total, setTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [tortaGratisAdded, setTortaGratisAdded] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  // Filtrar products según categoría
  useEffect(() => {
    if (categoria === "Todos") {
      setproductsFiltrados(products);
    } else {
      setproductsFiltrados(products.filter((p) => p.categoria === categoria));
    }
  }, [categoria]);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Calcular total y aplicar descuentos
  useEffect(() => {
    let totalCalc = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    let desc = 0;

    if (usuario) {
      if (usuario.codigoPromocional === "FELICES50") {
        desc = 0.1;
      }
      if (usuario.mayorDe50) {
        desc = 0.5; // Esto sobreescribe el anterior descuento si es mayor de 50 años
      }
    }

    setDescuento(desc);
    totalCalc = totalCalc * (1 - desc);
    setTotal(totalCalc);
  }, [carrito, usuario]);

  // Funciones para manipular carrito
  function agregarAlCarrito(id) {
    setCarrito((current) => {
      const existe = current.find((p) => p.id === id);
      if (existe) {
        if (existe.cantidad >= 5) {
          alert("⚠️ No puedes agregar más de 5 unidades de este producto.");
          return current;
        }
        return current.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      const producto = products.find((p) => p.id === id);
      return [...current, { ...producto, cantidad: 1 }];
    });
  }

  function aumentar(id) {
    setCarrito((current) =>
      current.map((p) => {
        if (p.id === id) {
          if (p.cantidad >= 5) {
            alert("⚠️ Máximo 5 unidades por producto.");
            return p;
          }
          return { ...p, cantidad: p.cantidad + 1 };
        }
        return p;
      })
    );
  }

  function disminuir(id) {
    setCarrito((current) => {
      return current
        .map((p) => {
          if (p.id === id) {
            return { ...p, cantidad: p.cantidad - 1 };
          }
          return p;
        })
        .filter((p) => p.cantidad > 0);
    });
  }

  function limpiarCarrito() {
    setCarrito([]);
    setTortaGratisAdded(false);
  }

  function handlePagar() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío. No puedes realizar el pago.");
      return;
    }

    // Verificar si es estudiante DUOC y agregar torta gratis si no está ya
    if (
      usuario &&
      usuario.email.endsWith("@duocuc.cl") &&
      !tortaGratisAdded
    ) {
      const tortaGratis = products.find((p) =>
        p.nombre.toLowerCase().includes("torta")
      );
      if (tortaGratis) {
        setCarrito((current) => [...current, { ...tortaGratis, cantidad: 1 }]);
        setTortaGratisAdded(true);
        alert(
          "¡Felicidades! Eres estudiante de Duoc y recibirás una torta gratis en tu compra."
        );
      }
    }
    setShowModal(true);
  }

  function confirmarPago() {
    alert("¡Gracias por tu compra!");
    
    // Crear el objeto de la compra con los datos necesarios
    const compra = {
      usuario: usuario, 
      total: total,    
      descuento: descuento, 
      detalles: carrito.map((producto) => ({
        productoId: producto.id,
        cantidad: producto.cantidad,
      })),
    };
    
  
    // Realizar la solicitud POST a /api/compras/registrar
    api.post('/api/compras/registrar', compra)
      .then(response => {
        console.log('Compra registrada:', response.data);
        limpiarCarrito();
        setShowModal(false);
        setTortaGratisAdded(false);
      })
      .catch(error => {
        console.error('Error al registrar la compra:', error);
        alert("Hubo un problema al registrar tu compra. Intenta nuevamente.");
      });
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-8">
          <h1>products disponibles</h1>

          <label htmlFor="filtroCategoria" className="form-label">
            Filtrar por categoría:
          </label>
          <select
            id="filtroCategoria"
            className="form-select mb-3"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Todos">Todos</option>
            {[...new Set(products.map((p) => p.categoria))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <h2>products</h2>
          <div id="listaproducts">
            {productsFiltrados.map((p) => (
              <div key={p.id} className="producto border p-3 mb-3 rounded">
                <h3>{p.nombre}</h3>
                <p>Categoría: {p.categoria}</p>
                <p>Precio: ${p.precio.toLocaleString("es-CL")}</p>
                <button
                  onClick={() => agregarAlCarrito(p.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-4">
          <h2>🛒 Carrito</h2>
          <div id="carrito" className="border p-3 rounded mb-3" style={{ minHeight: 200 }}>
            {carrito.length === 0 ? (
              <p>Carrito vacío</p>
            ) : (
              carrito.map((p) => (
                <div key={p.id} className="item-carrito d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <strong>{p.nombre}</strong> (x{p.cantidad}) - $
                    {(p.precio * p.cantidad).toLocaleString("es-CL")}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-success me-1"
                      onClick={() => aumentar(p.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => disminuir(p.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <p id="total" className="fs-5 fw-bold">
            Total: ${total.toLocaleString("es-CL")}
            {descuento > 0 && (
              <span className="text-success"> (Descuento aplicado!)</span>
            )}
          </p>

          <button className="me-2" onClick={limpiarCarrito}>
            🗑️ Limpiar Carrito
          </button>

          <button className="btn btn-success" onClick={handlePagar}>
            Pagar
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de la Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {carrito.map((p) => (
              <li key={p.id}>
                {p.nombre} (x{p.cantidad}) - $
                {(p.precio * p.cantidad).toLocaleString("es-CL")}
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toLocaleString("es-CL")}</h4>
          {descuento > 0 && (
            <p className="text-success">
              Se aplicó un descuento del {Math.round(descuento * 100)}%
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarPago}>
            Confirmar Pago
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

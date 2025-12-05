import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ordenes() {
  const [orders, setOrders] = useState([]);
  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [success, setSuccess] = useState(false);

  // Cargar órdenes almacenadas al iniciar
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Guardar en localStorage cuando cambian las órdenes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cliente.trim() || !producto.trim() || cantidad <= 0) return;

    const nuevaOrden = { cliente, producto, cantidad };
    const nuevasOrdenes = [...orders, nuevaOrden];
    setOrders(nuevasOrdenes);
    setSuccess(true);

    // Resetear formulario
    setCliente("");
    setProducto("");
    setCantidad(1);

    // Ocultar mensaje después de 2 segundos
    setTimeout(() => setSuccess(false), 2000);
  };

  const renderOrders = () => {
    if (orders.length === 0) {
      return (
        <div className="alert alert-info">No hay órdenes registradas.</div>
      );
    }

    return (
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, index) => (
            <tr key={index}>
              <td>{o.cliente}</td>
              <td>{o.producto}</td>
              <td>{o.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      <h3>Órdenes</h3>
      <p>Aquí puedes gestionar las órdenes de los clientes.</p>

      {/* Listado de órdenes */}
      <div id="ordersList" className="mb-4">
        {renderOrders()}
      </div>

      <hr />

      {/* Formulario para agregar nueva orden */}
      <h5>Agregar Nueva Orden</h5>
      <form id="orderForm" className="w-75" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">
            Cliente
          </label>
          <input
            type="text"
            id="cliente"
            className="form-control"
            placeholder="Nombre del cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="producto" className="form-label">
            Producto
          </label>
          <input
            type="text"
            id="producto"
            className="form-control"
            placeholder="Producto solicitado"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Agregar Orden
        </button>
      </form>

      {success && (
        <div id="orderSuccess" className="mt-3 text-success">
          Orden agregada correctamente.
        </div>
      )}
    </div>
  );
}

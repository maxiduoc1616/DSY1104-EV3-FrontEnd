import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(stored);
  }, []);

  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace("product", "").toLowerCase()]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, nombre, precio, stock, imagen } = formData;

    const producto = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      imagen,
    };

    const nuevosProductos = [...productos];

    if (id !== null && id !== "") {
      nuevosProductos[id] = producto;
    } else {
      nuevosProductos.push(producto);
    }

    setProductos(nuevosProductos);
    setFormData({ id: null, nombre: "", precio: "", stock: "", imagen: "" });

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("productModal")
    );
    if (modal) modal.hide();
  };

  const handleEdit = (index) => {
    const p = productos[index];
    setFormData({
      id: index,
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
      imagen: p.imagen || "",
    });
    const modal = new window.bootstrap.Modal(
      document.getElementById("productModal")
    );
    modal.show();
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const nuevosProductos = [...productos];
      nuevosProductos.splice(index, 1);
      setProductos(nuevosProductos);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Inventario</h3>
      <p>Aquí puedes administrar los productos disponibles.</p>

      {/* Botón para agregar producto */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setFormData({ id: null, nombre: "", precio: "", stock: "", imagen: "" });
          new window.bootstrap.Modal(
            document.getElementById("productModal")
          ).show();
        }}
      >
        + Agregar Producto
      </button>

      {/* Tabla de productos */}
      <div id="inventoryTableContainer">
        {productos.length === 0 ? (
          <div className="alert alert-info">No hay productos en el inventario.</div>
        ) : (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal para agregar/editar producto */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="productForm" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {formData.id !== null ? "Editar Producto" : "Agregar Producto"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <input type="hidden" id="productId" value={formData.id || ""} />
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    className="form-control"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productStock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="productStock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    URL Imagen (opcional)
                  </label>
                  <input
                    type="text"
                    id="productImage"
                    className="form-control"
                    value={formData.imagen}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

const Contacto = () => {
  return (
    <div className="container pt-3">
      <h5>Contáctanos</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Correo electrónico: contacto@1000sabores.com</li>
        <li className="list-group-item">Teléfono: +56 9 1234 5678</li>
        <li className="list-group-item">Instagram: @1000sabores</li>
        <li className="list-group-item">Facebook: @1000sabores</li>
      </ul>
      <br />
      <h5>
        Si prefieres, puedes rellenar el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
      </h5>
      <br />
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre Completo
          </label>
          <input type="text" className="form-control" id="nombre" />
        </div>
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <input type="text" className="form-control" id="mensaje" />
        </div>
        <button type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;

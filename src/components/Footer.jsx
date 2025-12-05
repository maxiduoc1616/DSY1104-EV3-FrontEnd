// components/Footer.jsx
import React from "react";

const Footer = ({ mastercardLogo, paypalLogo, visaLogo }) => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Pastelería</h5>
            <br />
            <br />
            <img src={mastercardLogo} alt="Mastercard" height="30" width="50" />
            <img src={paypalLogo} alt="Paypal" height="30" width="30" />
            <img src={visaLogo} alt="Visa" height="30" width="85" />
          </div>

          <div className="col-md-4 mb-3">
            <h5>Pasteles</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://es.wikipedia.org/wiki/Pastel_de_queso"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cheesecake
                </a>
              </li>
              <li>
                <a
                  href="https://es.wikipedia.org/wiki/Kuchen"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kuchen
                </a>
              </li>
              <li>
                <a
                  href="https://es.wikipedia.org/wiki/Torta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Torta
                </a>
              </li>
              <li>
                <a
                  href="https://es.wikipedia.org/wiki/Pie_(tarta_rellena)"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pie
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Recibe Ofertas</h5>
            <form className="d-flex" role="subscription">
              <input
                className="form-control me-2"
                type="email"
                placeholder="Suscribirse"
                aria-label="Suscribete"
              />
              <button type="submit">Suscribete</button>
            </form>
          </div>
        </div>
        <hr className="bg-white" />
        <p className="text-center mb-0">
          &copy; 2025 Pastelería 1000 Sabores. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

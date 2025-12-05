import React from "react";

import mision from "../assets/img/mision.png"
import imagenNosotros2 from "../assets/img/nosotros2.jpg"
import imagenNosotros3 from "../assets/img/nosotros3.jpg"

const Nosotros = () => {
  return (
    <div className="container pt-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6 px-5 pt-5 pb-5">
            <div className="card-body">
              <h5 className="card-title">Misión</h5>
              <p className="card-text">
                Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos
                de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces
                históricas y fomentamos la creatividad en la repostería.
              </p>
            </div>
          </div>
          <div className="col-md-6 px-3 pt-3 pb-3">
            <img
              src={mision}
              className="img-pag-principal"
              alt="Imagen del aniversario"
            />
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6 px-5 pt-5 pb-5">
            <div className="card-body">
              <h5 className="card-title">Visión</h5>
              <p className="card-text">
                Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra
                innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos
                talentos en gastronomía.
              </p>
            </div>
          </div>
          <div className="col-md-6 px-3 pt-3 pb-3">
            <img
              src={imagenNosotros2}
              className="img-pag-principal"
              alt="Imagen del aniversario"
            />
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6 px-5 pt-5 pb-5">
            <div className="card-body">
              <h5 className="card-title">Alcance del Proyecto</h5>
              <p className="card-text">
                Desarrollo de una plataforma de e-commerce que permita a los usuarios comprar productos de
                repostería, personalizar pedidos, y participar en un programa de descuentos basado en edad y
                promociones especiales.
              </p>
            </div>
          </div>
          <div className="col-md-6 px-3 pt-3 pb-3">
            <img
              src={imagenNosotros3}
              className="img-pag-principal"
              alt="Imagen del aniversario"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;

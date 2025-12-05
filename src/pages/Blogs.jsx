import React from "react";

import imagenNosotros1 from "../assets/img/nosotros1.jpg"
import imagenConsejo1 from "../assets/img/consejo1.jpg"
import imagenConsejo2 from "../assets/img/consejo2.jpg"

const Blogs = () => {
  return (
    <div className="container pt-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6 px-5 pt-5 pb-5">
            <div className="card-body">
              <h5 className="card-title">Blogs</h5>
              <p className="card-text">
                ¡Bienvenidos a nuestro espacio dedicado a todos los amantes de la
                pastelería! En este blog, compartiremos todo lo que necesitas saber
                para convertirte en un experto pastelero, desde deliciosas recetas
                paso a paso hasta consejos útiles para perfeccionar tus técnicas de
                decoración y cocción. Además, te mantendremos al día con las últimas
                noticias y tendencias del mundo de la pastelería, desde innovaciones
                gastronómicas hasta los eventos más destacados.
                <br />
                Si alguna vez te has sentido tentado a preparar un pastel, unos
                cupcakes o unas galletas perfectas, este es el lugar indicado. Te
                invitamos a explorar nuestras recetas, experimentar en tu cocina y,
                sobre todo, disfrutar del arte de crear dulces irresistibles.
                ¡Acompáñanos en este delicioso viaje lleno de sabor y creatividad!
              </p>
            </div>
          </div>
          <div className="col-md-6 px-3 pt-3 pb-3">
            <img
              src={imagenNosotros1}
              className="img-pag-principal"
              alt="Imagen del aniversario"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Consejo para lograr el bizcocho perfecto</h5>
              <p className="card-text">
                Si alguna vez has tenido problemas para conseguir un bizcocho esponjoso,
                asegúrate de no sobrebatir la mezcla y utilizar ingredientes a temperatura
                ambiente. Esto ayudará a que tu pastel tenga una textura más ligera y
                uniforme. También es recomendable engrasar bien el molde y no abrir el horno
                durante los primeros 30 minutos de cocción para evitar que el bizcocho se hunda.
              </p>
              <img
                src={imagenConsejo1}
                alt="Consejo para bizcocho"
                width="600"
                height="330"
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Consejo para una decoración de pasteles impecable</h5>
              <p className="card-text">
                Cuando decores un pastel, asegúrate de que la capa de glaseado sea suave y
                uniforme. Una buena técnica es aplicar una capa base o "crumb coat" para
                atrapar las migas antes de aplicar la capa final de glaseado. Además, usa
                herramientas como espátulas y cucharas para conseguir acabados más
                profesionales. Recuerda siempre trabajar con un pastel completamente frío
                para evitar que el glaseado se derrita.
              </p>
              <img
                src={imagenConsejo2}
                alt="Consejo decoración"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recetas</h5>
              <p className="card-text">
                En este apartado podrás encontrar algunas de nuestras recetas favoritas,
                elegidas con mucho cariño para compartir contigo. Cada una está pensada
                para inspirarte a disfrutar de la pastelería casera, con instrucciones
                fáciles de seguir y consejos prácticos. ¡Esperamos que las disfrutes tanto
                como nosotros al prepararlas!
                <br />
                <a href="../usuarioNormal/detalleBlog2.html">Ir a las recetas</a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Noticias</h5>
              <p className="card-text">
                Aquí podrás ver las últimas novedades del fascinante mundo de la pastelería.
                Desde nuevas tendencias y técnicas innovadoras hasta eventos y lanzamientos de
                productos, aquí encontrarás información actualizada sobre todo lo que está sucediendo
                en el ámbito de la repostería. ¡No te pierdas nuestras noticias para estar siempre
                al tanto de lo que está marcando la pauta en el dulce universo de la pastelería!
              </p>
              <a href="https://elpais.com/noticias/pasteleria/">Ir a las noticias</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

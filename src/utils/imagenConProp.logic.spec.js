// src/utils/imagenConProp.logic.spec.js

import { cambiarImagen } from './imagenConProp.logic';

describe("ImagenConProp Logic", () => {
  
  it("debe actualizar la imagen cuando se selecciona una nueva", () => {
    const imagenAnterior = "img1.jpg";
    const nuevaImagen = "img2.jpg";

    const resultado = cambiarImagen(nuevaImagen, imagenAnterior);
    expect(resultado).toBe(nuevaImagen);
  });

  it("no debe cambiar la imagen si el valor seleccionado es nulo", () => {
    const imagenAnterior = "img1.jpg";
    const resultado = cambiarImagen(null, imagenAnterior);
    expect(resultado).toBe(imagenAnterior);
  });

  it("no debe cambiar la imagen si el valor seleccionado no es string", () => {
    const imagenAnterior = "img1.jpg";
    const resultado = cambiarImagen(12345, imagenAnterior);
    expect(resultado).toBe(imagenAnterior);
  });

});
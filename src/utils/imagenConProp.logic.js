// src/utils/imagenConProp.logic.js

/**
 * Función pura para cambiar la imagen según la selección del usuario
 * @param {string} valorSeleccionado - valor seleccionado del select (src de imagen)
 * @param {string} imagenActual - imagen actual
 * @returns {string} - la nueva imagen a mostrar
 */
export function cambiarImagen(valorSeleccionado, imagenActual) {
  // Se añade el check de typeof 'string' para manejar 'null' y otros tipos
  if (!valorSeleccionado || typeof valorSeleccionado !== "string") return imagenActual;
  return valorSeleccionado;
}
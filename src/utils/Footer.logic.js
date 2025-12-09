// src/utils/Footer.logic.js
// Lógica pura para el componente Footer

/**
 * Devuelve la fecha actual en formato dd de <mes> del yyyy en castellano
 * @returns {string} Fecha en formato "dd de <mes> del yyyy"
 */
export function obtenerFechaCastellano() {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    return `${dia} de ${mes} del ${anio}`;
}
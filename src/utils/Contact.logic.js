// src/utils/Contact.logic.js

/**
 * Valida si un string tiene formato de email válido
 * @param {string} v - valor a validar
 * @returns {boolean} true si es email válido
 */
export function isEmail(v) {
    // Se asegura que sea un string y no esté vacío antes de probar el regex
    if (typeof v !== 'string' || v.trim() === '') {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * Valida si un string tiene formato de teléfono válido
 * @param {string} v - valor a validar
 * @returns {boolean} true si es vacío o cumple patrón de 7 a 15 dígitos con + opcional
 */
export function isPhone(v) {
    if (typeof v !== 'string') {
        v = String(v || '');
    }
    return !v.trim() || /^\+?\d{7,15}$/.test(v.trim());
}

/**
 * Valida todos los campos del formulario
 * @param {Object} values - objeto con campos {name, email, phone, message}
 * @returns {Object} errores encontrados por campo
 */
export function validate(values) {
    const e = {};

    // Nombre obligatorio
    if (!values.name.trim()) e.name = "El nombre es obligatorio.";

    // Email obligatorio y con formato válido
    if (!values.email.trim()) {
        e.email = "El email es obligatorio.";
    } else if (!isEmail(values.email.trim())) {
        e.email = "Formato de email no válido.";
    }

    // Teléfono opcional, pero si está presente debe cumplir patrón
    if (values.phone && !isPhone(values.phone.trim())) {
        e.phone = "El teléfono debe tener 7 a 15 dígitos (opcional).";
    }

    // Mensaje obligatorio
    if (!values.message.trim()) e.message = "El mensaje es obligatorio.";

    return e;
}
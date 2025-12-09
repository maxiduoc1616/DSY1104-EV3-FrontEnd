// src/utils/registro.logic.js

// Constante para el código promocional válido
const CODIGO_PROMOCIONAL_VALIDO = "FELICES50";

/**
 * Valida si un string tiene formato de email válido.
 * Se agrega verificación de tipo para evitar el TypeError.
 * @param {string} v - valor a validar.
 * @returns {boolean} true si es un email válido.
 */
export function isEmail(v) {
    if (typeof v !== 'string' || v.trim() === '') {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * Valida si un string de teléfono es vacío o cumple con el patrón.
 * @param {string} v - valor a validar.
 * @returns {boolean} true si es vacío o cumple patrón de 7 a 15 dígitos con + opcional.
 */
export function isPhone(v) {
    if (typeof v !== 'string') {
        v = String(v || '');
    }
    return !v.trim() || /^\+?\d{7,15}$/.test(v.trim());
}

/**
 * Prepara el objeto de usuario final para la solicitud de registro.
 * @param {Object} formData - objeto con los datos del formulario.
 * @returns {Object} El objeto de usuario final listo para ser enviado al backend.
 */
export function prepararUsuario(formData) {
    // ... (El contenido de la función es el mismo)
    const cleanData = {
        email: formData.email ? formData.email.trim() : '',
        password: formData.password || '',
        nombre: formData.nombre ? formData.nombre.trim() : '',
        apellido: formData.apellido ? formData.apellido.trim() : '',
        phone: formData.phone ? formData.phone.trim() : '',
        codigoPromocional: formData.codigoPromocional ? formData.codigoPromocional.trim() : '',
        mayorDe50: !!formData.mayorDe50,
    };

    const usuario = {
        email: cleanData.email,
        password: cleanData.password,
        name: cleanData.nombre,
        apellido: cleanData.apellido,
        phone: cleanData.phone || null,
        mayorDe50: cleanData.mayorDe50,
        codigoPromocional: null,
    };

    if (cleanData.codigoPromocional === CODIGO_PROMOCIONAL_VALIDO) {
        usuario.codigoPromocional = cleanData.codigoPromocional;
    }

    return usuario;
}

/**
 * Valida todos los campos requeridos del formulario.
 * @param {Object} formData - objeto con campos.
 * @returns {Object} errores encontrados por campo.
 */
export function validateForm(formData) {
    // ... (El contenido de la función es el mismo)
    const errors = {};

    const cleanData = {
        email: formData.email ? formData.email.trim() : '',
        password: formData.password || '',
        nombre: formData.nombre ? formData.nombre.trim() : '',
        apellido: formData.apellido ? formData.apellido.trim() : '',
        phone: formData.phone ? formData.phone.trim() : '',
    };

    // Email
    if (!cleanData.email) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!isEmail(cleanData.email)) {
        errors.email = "Formato de email no válido.";
    }

    // Contraseña
    if (!cleanData.password) {
        errors.password = "La contraseña es obligatoria.";
    }

    // Nombre
    if (!cleanData.nombre) {
        errors.nombre = "El nombre es obligatorio.";
    }

    // Apellido
    if (!cleanData.apellido) {
        errors.apellido = "El apellido es obligatorio.";
    }

    // Teléfono
    if (cleanData.phone && !isPhone(cleanData.phone)) {
        errors.phone = "El teléfono debe tener 7 a 15 dígitos (opcional).";
    }

    return errors;
}
// src/utils/Contact.logic.spec.js
// Pruebas Jasmine para la lógica de Contact

import { isEmail, isPhone, validate } from './Contact.logic';

describe("Tests ContactLogic", function() {

    // Tests para isEmail
    describe("isEmail", function() {

        it("debe retornar true para email válido", function() {
            expect(isEmail("test@mail.com")).toBe(true);
        });

        it("debe retornar false para email inválido", function() {
            expect(isEmail("test@@mail")).toBe(false);
        });

        it("debe retornar false para valor vacío", function() {
            expect(isEmail("")).toBe(false);
        });

    });

    // Tests para isPhone
    describe("isPhone", function() {

        it("debe retornar true para teléfono vacío", function() {
            expect(isPhone("")).toBe(true);
        });

        it("debe retornar true para teléfono válido", function() {
            expect(isPhone("+56912345678")).toBe(true);
        });

        it("debe retornar false para teléfono inválido", function() {
            // El patrón solo exige 7-15 dígitos. '123' es inválido.
            expect(isPhone("123")).toBe(false); 
        });

    });

    // Tests para validate
    describe("validate", function() {

        it("debe retornar errores vacíos para valores válidos", function() {
            var valores = {name: "Juan", email: "juan@mail.com", phone: "+56912345678", message: "Hola"};
            expect(validate(valores)).toEqual({});
        });

        it("debe retornar errores para campos vacíos", function() {
            var valores = {name: "", email: "", phone: "", message: ""};
            var errores = validate(valores);
            expect(errores.name).toBeDefined();
            expect(errores.email).toBeDefined();
            expect(errores.message).toBeDefined();
        });

        it("debe retornar error si email o teléfono inválidos", function() {
            var valores = {name: "Ana", email: "ana@", phone: "123", message: "Hola"};
            var errores = validate(valores);
            expect(errores.email).toBeDefined();
            expect(errores.phone).toBeDefined();
        });

    });

});
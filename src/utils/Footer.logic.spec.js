// src/utils/Footer.logic.spec.js
// Pruebas Jasmine para la lógica de Footer

import { obtenerFechaCastellano } from './Footer.logic';

describe("Tests FooterLogic", function() {

    // Test para obtenerFechaCastellano
    describe("obtenerFechaCastellano", function() {

        it("debe retornar una fecha en formato dd de <mes> del yyyy", function() {
            var fecha = obtenerFechaCastellano();
            expect(fecha).toMatch(/\d{1,2} de \w+ del \d{4}/);
        });

        it("no debe retornar undefined ni null", function() {
            var fecha = obtenerFechaCastellano();
            expect(fecha).not.toBeUndefined();
            expect(fecha).not.toBeNull();
        });

        it("el día debe ser un número entre 1 y 31", function() {
            var fecha = obtenerFechaCastellano();
            var dia = parseInt(fecha.split(" de ")[0], 10);
            expect(dia).toBeGreaterThan(0);
            expect(dia).toBeLessThanOrEqual(31);
        });

    });

});
import { isEmail, isPhone, prepararUsuario, validateForm } from './registro.logic'; 

describe("Registro Logic Unit Tests", () => {
    const baseFormData = {
        email: "test@user.com",
        password: "password123",
        nombre: "Juan",
        apellido: "Perez",
        phone: "12345678",
        codigoPromocional: "",
        mayorDe50: false,
    };
    
    const validFormData = {
        email: "valid@email.com",
        password: "p1",
        nombre: "A",
        apellido: "B",
        phone: "1234567890",
    };

    describe("isEmail", () => {
        it("debe retornar true para un email válido", () => {
            expect(isEmail("prueba@dominio.com")).toBe(true);
        });

        it("debe retornar false para un email sin @", () => {
            expect(isEmail("pruebadominio.com")).toBe(false);
        });
        
        it("debe retornar false para un email sin dominio", () => {
            expect(isEmail("prueba@.com")).toBe(false);
        });
        
        it("debe retornar false para un email vacío", () => {
            expect(isEmail("")).toBe(false);
        });
    });

    describe("isPhone", () => {
        it("debe retornar true para un número de teléfono válido (10 dígitos)", () => {
            expect(isPhone("1234567890")).toBe(true);
        });

        it("debe retornar true para un número de teléfono vacío", () => {
            expect(isPhone("")).toBe(true);
        });

        it("debe retornar true para un número de teléfono con código de país (+)", () => {
            expect(isPhone("+56912345678")).toBe(true);
        });
        
        it("debe retornar false para un número de teléfono con letras", () => {
            expect(isPhone("1234567A")).toBe(false);
        });
    });

    describe("prepararUsuario", () => {
        it("debe preparar el objeto de usuario correctamente sin código promocional", () => {
            const usuario = prepararUsuario(baseFormData);
            expect(usuario.email).toBe("test@user.com");
            expect(usuario.name).toBe("Juan");
            expect(usuario.codigoPromocional).toBe(null);
        });

        it("debe aplicar el código promocional válido 'FELICES50'", () => {
            const formDataConCodigo = {
                ...baseFormData,
                codigoPromocional: "FELICES50"
            };
            const usuario = prepararUsuario(formDataConCodigo);
            expect(usuario.codigoPromocional).toBe("FELICES50");
        });

        it("debe ignorar un código promocional no válido", () => {
            const formDataConCodigo = {
                ...baseFormData,
                codigoPromocional: "OTROCODIGO"
            };
            const usuario = prepararUsuario(formDataConCodigo);
            expect(usuario.codigoPromocional).toBe(null);
        });
        
        it("debe manejar correctamente el campo mayorDe50 como true", () => {
            const formDataMayor = {
                ...baseFormData,
                mayorDe50: true
            };
            const usuario = prepararUsuario(formDataMayor);
            expect(usuario.mayorDe50).toBe(true);
        });
    });

    describe("validateForm", () => {
        it("debe retornar un objeto de errores vacío para datos válidos", () => {
            const errors = validateForm(validFormData);
            expect(Object.keys(errors).length).toBe(0);
        });

        it("debe identificar email, password, nombre y apellido faltantes como errores", () => {
            const formData = {
                email: "",
                password: "",
                nombre: "",
                apellido: "",
                phone: ""
            };
            const errors = validateForm(formData);
            expect(errors.email).toBeDefined();
            expect(errors.password).toBeDefined();
            expect(errors.nombre).toBeDefined();
            expect(errors.apellido).toBeDefined();
            expect(errors.phone).toBeUndefined(); 
        });

        it("debe identificar un formato de email no válido", () => {
            const formData = { ...validFormData, email: "invalid-email" };
            const errors = validateForm(formData);
            expect(errors.email).toBe("Formato de email no válido.");
        });

        it("debe identificar un formato de teléfono no válido", () => {
            const formData = { ...validFormData, phone: "abcde" };
            const errors = validateForm(formData);
            expect(errors.phone).toBe("El teléfono debe tener 7 a 15 dígitos (opcional).");
        });
    });

});
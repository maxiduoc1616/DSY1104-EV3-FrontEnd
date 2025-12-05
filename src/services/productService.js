// src/services/productService.js
import axios from "axios";
// URL base del backend Spring Boot
const API_BASE = "http://localhost:8080/api/v1/products";
/**
* Obtiene todos los productos desde el backend (GET)
*/
export async function getProducts() {
    const res = await axios.get(API_BASE);
    return res.data;
}
/**
* Crea un nuevo producto (POST)
*/
export async function createProduct(product) {
    const res = await axios.post(API_BASE, product);
    return res.data;
}
/**
* Actualiza un producto existente (PUT)
*/
export async function updateProduct(id, product) {
    const res = await axios.put(`${API_BASE}/${id}`, product);
    return res.data;
}
/**
* Elimina un producto por su ID (DELETE)
*/
export async function deleteProduct(id) {
    await axios.delete(`${API_BASE}/${id}`);
}
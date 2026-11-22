import api from "./api.js";

export async function listarProductos() {
  const respuesta = await api.get("/productos");
  return respuesta.data;
}

export async function obtenerProducto(id) {
  const respuesta = await api.get(`/productos/${id}`);
  return respuesta.data;
}

export async function crearProducto(producto) {
  const respuesta = await api.post("/productos", producto);
  return respuesta.data;
}

export async function actualizarProducto(id, producto) {
  const respuesta = await api.put(`/productos/${id}`, producto);
  return respuesta.data;
}

export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`);
}
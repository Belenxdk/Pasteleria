import { productosIniciales } from "./semilla.js";


const CLAVE = "milsabores_productos";

function guardarProductos(productos) {
  localStorage.setItem(CLAVE, JSON.stringify(productos));
}

export function listarProductos() {
  const guardados = localStorage.getItem(CLAVE);

  if (guardados === null) {
    guardarProductos(productosIniciales);
    return structuredClone(productosIniciales);
  }

  return JSON.parse(guardados);
}

export function obtenerProducto(id) {
  return listarProductos().find((producto) => producto.id === id);
}

function validarProducto(producto) {
  if (!producto.nombre || !producto.nombre.trim()) {
    throw new Error("El nombre es obligatorio.");
  }

  if (!producto.categoria || !producto.categoria.trim()) {
    throw new Error("La categoría es obligatoria.");
  }

  if (!Number.isFinite(producto.precio) || producto.precio <= 0) {
    throw new Error("El precio debe ser un número mayor que cero.");
  }

  if (!Number.isInteger(producto.stock) || producto.stock < 0) {
    throw new Error("El stock debe ser un número entero de cero o más.");
  }
}

export function crearProducto(datos) {
  const productos = listarProductos();

  const nuevoProducto = {
    ...datos,
    id: crypto.randomUUID(),
    activo: true,
  };

  validarProducto(nuevoProducto);

  productos.push(nuevoProducto);
  guardarProductos(productos);

  return nuevoProducto;
}

export function actualizarProducto(id, cambios) {
  const productos = listarProductos();
  const indice = productos.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    throw new Error("El producto no existe.");
  }

  const actualizado = {
    ...productos[indice],
    ...cambios,
    id,
  };

  validarProducto(actualizado);

  productos[indice] = actualizado;
  guardarProductos(productos);

  return actualizado;
}

export function eliminarProducto(id) {
  const productos = listarProductos();
  const existe = productos.some((producto) => producto.id === id);

  if (!existe) {
    throw new Error("El producto no existe.");
  }

  const restantes = productos.filter((producto) => producto.id !== id);
  guardarProductos(restantes);
}
import { obtenerProducto } from "./productos.js";
import { listarUsuarios } from "./usuarios.js";

const CLAVE = "milsabores_ordenes";

export const ESTADOS_ORDEN = [
  "Pendiente",
  "En preparación",
  "Enviada",
  "Entregada",
  "Cancelada",
];

export function listarOrdenes() {
  const guardadas = localStorage.getItem(CLAVE);
  return guardadas === null ? [] : JSON.parse(guardadas);
}

function guardarOrdenes(ordenes) {
  localStorage.setItem(CLAVE, JSON.stringify(ordenes));
}

export function obtenerOrden(id) {
  return listarOrdenes().find((orden) => orden.id === id);
}

// Recibe el usuario y los artículos del carrito.
// Cada artículo debe tener productoId y cantidad.
export function crearOrden({ usuarioId, items }) {
  const usuario = listarUsuarios().find(
    (usuario) => usuario.id === usuarioId
  );

  if (!usuario) {
    throw new Error("El usuario de la compra no existe.");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("La orden debe contener al menos un producto.");
  }

  // Agrupa productos repetidos antes de validar las cantidades.
  const cantidades = new Map();

  for (const item of items) {
    if (
      !item ||
      !item.productoId ||
      !Number.isInteger(item.cantidad) ||
      item.cantidad <= 0
    ) {
      throw new Error("Los artículos deben tener una cantidad entera positiva.");
    }

    const anterior = cantidades.get(item.productoId) || 0;
    cantidades.set(item.productoId, anterior + item.cantidad);
  }

  const detalle = [];

  for (const [productoId, cantidad] of cantidades) {
    const producto = obtenerProducto(productoId);

    if (!producto || producto.activo === false) {
      throw new Error("Uno de los productos ya no está disponible.");
    }

    if (cantidad > producto.stock) {
      throw new Error(`Stock insuficiente para ${producto.nombre}.`);
    }

    // Conserva el nombre y precio del momento de la compra.
    detalle.push({
      productoId: producto.id,
      nombre: producto.nombre,
      precioUnitario: producto.precio,
      cantidad,
      subtotal: producto.precio * cantidad,
    });
  }

  const nuevaOrden = {
    id: crypto.randomUUID(),
    usuarioId: usuario.id,
    cliente: `${usuario.nombre} ${usuario.apellidos}`.trim(),
    email: usuario.email,
    direccion: usuario.direccion,
    items: detalle,
    total: detalle.reduce((suma, item) => suma + item.subtotal, 0),
    estado: "Pendiente",
    fecha: new Date().toISOString(),
  };

  const ordenes = listarOrdenes();
  ordenes.push(nuevaOrden);
  guardarOrdenes(ordenes);

  return nuevaOrden;
}

export function actualizarEstadoOrden(id, nuevoEstado) {
  if (!ESTADOS_ORDEN.includes(nuevoEstado)) {
    throw new Error("El estado seleccionado no es válido.");
  }

  const ordenes = listarOrdenes();
  const indice = ordenes.findIndex((orden) => orden.id === id);

  if (indice === -1) {
    throw new Error("La orden no existe.");
  }

  ordenes[indice] = {
    ...ordenes[indice],
    estado: nuevoEstado,
  };

  guardarOrdenes(ordenes);

  return ordenes[indice];
}   
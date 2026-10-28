
export function agregarProducto(carrito, producto) {
  const existe = carrito.find((item) => item.id === producto.id)
  if (existe) {
    return carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
    )
  }
  return [...carrito, { ...producto, cantidad: 1 }]
}

export function cambiarCantidad(carrito, id, cantidad) {
  if (cantidad <= 0) return eliminarItem(carrito, id)
  return carrito.map((item) => (item.id === id ? { ...item, cantidad } : item))
}

export function eliminarItem(carrito, id) {
  return carrito.filter((item) => item.id !== id)
}

export function calcularTotal(carrito) {
  return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
}

export function cantidadTotal(carrito) {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0)
}

export function armarItemsOrden(carrito) {
  return carrito.map((item) => ({ productoId: item.id, cantidad: item.cantidad }))
}
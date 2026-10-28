const CLAVE = 'carrito-mil-sabores'

export function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    const datos = guardado ? JSON.parse(guardado) : []
    return Array.isArray(datos) ? datos.filter((i) => i && typeof i.id === 'string' &&
      Number.isFinite(i.precio) && i.precio > 0 && Number.isInteger(i.cantidad) && i.cantidad > 0) : []
  } catch {
    return []
  }
}

export function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(carrito))
  } catch {
    // si el navegador bloquea el almacenamiento, el carrito sigue funcionando en memoria
  }
}
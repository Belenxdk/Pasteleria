const CLAVE = 'carrito-mil-sabores'

export function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
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
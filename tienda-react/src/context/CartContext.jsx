import { createContext, useContext, useEffect, useState } from 'react'
import { agregarProducto, cambiarCantidad, eliminarItem, calcularTotal, cantidadTotal } from '../utils/carrito.js'
import { leerCarrito, guardarCarrito } from '../utils/almacenamiento.js'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => { const datos = leerCarrito(); return Array.isArray(datos) ? datos : [] })
  useEffect(() => { guardarCarrito(carrito) }, [carrito])
  const agregarAlCarrito = (producto, unidades = 1) => setCarrito(actual => {
    const cantidad = actual.find(i => i.id === producto.id)?.cantidad ?? 0
    if (!Number.isInteger(unidades) || unidades < 1 || producto.activo === false || (producto.stock != null && cantidad + unidades > producto.stock)) return actual
    let siguiente = actual
    for (let i = 0; i < unidades; i++) siguiente = agregarProducto(siguiente, producto)
    return siguiente
  })
  const cambiarCantidadItem = (id, cantidad) => setCarrito(actual => {
    const item = actual.find(i => i.id === id)
    if (!Number.isInteger(cantidad) || (item?.stock != null && cantidad > item.stock)) return actual
    return cambiarCantidad(actual, id, cantidad)
  })
  const eliminarDelCarrito = id => setCarrito(actual => eliminarItem(actual, id))
  const vaciarCarrito = () => setCarrito([])
  return <CartContext.Provider value={{ carrito, cantidad: cantidadTotal(carrito), total: calcularTotal(carrito), agregarAlCarrito, cambiarCantidadItem, eliminarDelCarrito, vaciarCarrito }}>{children}</CartContext.Provider>
}
export function useCarrito() {
  const contexto = useContext(CartContext)
  if (!contexto) throw new Error('useCarrito requiere CartProvider')
  return contexto
}

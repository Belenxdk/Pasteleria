import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Encabezado from './components/Encabezado.jsx'
import PiePagina from './components/PiePagina.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import Nosotros from './pages/tienda/Nosotros.jsx'
import Carrito from './pages/tienda/Carrito.jsx'
import {
  agregarProducto,
  cambiarCantidad,
  eliminarItem,
  calcularTotal,
  cantidadTotal,
} from './utils/carrito.js'
import { leerCarrito, guardarCarrito } from './utils/almacenamiento.js'

function App(){
  const [carrito, setCarrito] = useState(leerCarrito)
  const cantidad = cantidadTotal(carrito)
  const total = calcularTotal(carrito)

  useEffect(() => {
    guardarCarrito(carrito)
  }, [carrito])

  function agregarAlCarrito(producto){
    setCarrito((actual) => agregarProducto(actual, producto))
  }

  function cambiarCantidadItem(id, nuevaCantidad){
    setCarrito((actual) => cambiarCantidad(actual, id, nuevaCantidad))
  }

  function eliminarDelCarrito(id){
    setCarrito((actual) => eliminarItem(actual, id))
  }

  function vaciarCarrito(){
    setCarrito([])
  }

  return (
    <>
      <Encabezado cantidad={cantidad} />
      <Routes>
        <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
        <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              cantidad={cantidad}
              total={total}
              onCambiarCantidad={cambiarCantidadItem}
              onEliminar={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          }
        />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App
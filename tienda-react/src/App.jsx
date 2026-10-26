import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Encabezado from './components/Encabezado.jsx'
import PiePagina from './components/PiePagina.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import Nosotros from './pages/tienda/Nosotros.jsx'
import { agregarProducto, cantidadTotal } from './utils/carrito.js'

function App(){
  const [carrito, setCarrito] = useState([])
  const cantidad = cantidadTotal(carrito)

  function agregarAlCarrito(producto){
    setCarrito((carritoActual) => agregarProducto(carritoActual, producto))
  }

  return (
    <>
      <Encabezado cantidad={cantidad} />
      <Routes>
        <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
        <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App
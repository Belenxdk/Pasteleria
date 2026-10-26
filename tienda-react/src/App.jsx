import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Encabezado from './components/Encabezado.jsx'
import PiePagina from './components/PiePagina.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import Nosotros from "./pages/tienda/Nosotros.jsx";

function App(){
  const [carrito, setCarrito] = useState([])
  const cantidadTotal = carrito.reduce((suma,item)=> suma + item.cantidad, 0)

  function agregarAlCarrito(producto){
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item)=> item.id === producto.id)
      if (existe){
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...carritoActual, { ...producto, cantidad:1}]
    })
  }

  return (
    <>
      <Encabezado cantidad={cantidadTotal} />
      <Routes>
        <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
        <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros/>} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App
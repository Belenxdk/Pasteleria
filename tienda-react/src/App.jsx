import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";

import Home from "./pages/tienda/Home.jsx";
import Productos from "./pages/tienda/Productos.jsx";
import Nosotros from "./pages/tienda/Nosotros.jsx";
import Carrito from "./pages/tienda/Carrito.jsx";
import Checkout from "./pages/tienda/Checkout.jsx";
import PagoCorrecto from "./pages/tienda/PagoCorrecto.jsx";
import PagoError from "./pages/tienda/PagoError.jsx";

import Login from "./pages/auth/Login.jsx";
import Registro from "./pages/auth/Registro.jsx";

import RutaAdmin from "./pages/admin/RutaAdmin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductosAdmin from "./pages/admin/ProductosAdmin.jsx";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin.jsx";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin.jsx";

import {
  agregarProducto,
  cambiarCantidad,
  eliminarItem,
  calcularTotal,
  cantidadTotal,
} from "./utils/carrito.js";
import { leerCarrito, guardarCarrito } from "./utils/almacenamiento.js";

function App() {
  const [carrito, setCarrito] = useState(leerCarrito);
  const cantidad = cantidadTotal(carrito);
  const total = calcularTotal(carrito);

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => agregarProducto(actual, producto));
  }

  function cambiarCantidadItem(id, nuevaCantidad) {
    setCarrito((actual) => cambiarCantidad(actual, id, nuevaCantidad));
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) => eliminarItem(actual, id));
  }

  function vaciarCarrito() {
    setCarrito([]);
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
        <Route
          path="/checkout"
          element={<Checkout carrito={carrito} total={total} onVaciar={vaciarCarrito} />}
        />
        <Route path="/pago-correcto" element={<PagoCorrecto />} />
        <Route path="/pago-error" element={<PagoError />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/admin" element={<RutaAdmin><Dashboard /></RutaAdmin>} />
        <Route path="/admin/productos" element={<RutaAdmin><ProductosAdmin /></RutaAdmin>} />
        <Route path="/admin/usuarios" element={<RutaAdmin><UsuariosAdmin /></RutaAdmin>} />
        <Route path="/admin/ordenes" element={<RutaAdmin><OrdenesAdmin /></RutaAdmin>} />

        <Route
          path="*"
          element={
            <div className="container py-4">
              <h2>Página no encontrada</h2>
              <Link to="/">Volver al inicio</Link>
            </div>
          }
        />
      </Routes>

      <PiePagina />
    </>
  );
}

export default App;
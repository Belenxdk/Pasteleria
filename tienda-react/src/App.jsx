import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { listarProductos } from "./data/productos.js";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";

import Home from "./pages/tienda/Home.jsx";
import Productos from "./pages/tienda/Productos.jsx";
import Nosotros from "./pages/tienda/Nosotros.jsx";
import Carrito from "./pages/tienda/Carrito.jsx";
import Checkout from "./pages/tienda/Checkout.jsx";
import PagoCorrecto from "./pages/tienda/PagoCorrecto.jsx";
import PagoError from "./pages/tienda/PagoError.jsx";
import Contacto from "./pages/tienda/Contacto.jsx";

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
  const [aviso, setAviso] = useState("");
  const [, refrescarSesion] = useState(0);
  useEffect(() => {
    const actualizar = () => refrescarSesion((n) => n + 1);
    window.addEventListener('sesion-cambiada', actualizar);
    return () => window.removeEventListener('sesion-cambiada', actualizar);
  }, []);
  const cantidad = cantidadTotal(carrito);
  const total = calcularTotal(carrito);

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  function agregarAlCarrito(producto) {
    try {
      const vigente = listarProductos().find((p) => p.id === producto.id);
      if (!vigente) throw new Error("Este producto ya no está disponible.");
      setCarrito(agregarProducto(carrito, vigente));
      setAviso(`${vigente.nombre} agregado al carrito.`);
    } catch (error) { setAviso(error.message); }
  }

  function cambiarCantidadItem(id, nuevaCantidad) {
    try {
      const vigente = listarProductos().find((p) => p.id === id);
      if (nuevaCantidad > 0 && (!vigente || vigente.activo === false)) throw new Error("Este producto ya no está disponible. Elimínalo del carrito.");
      const actual = carrito.map((i) => i.id === id && vigente ? { ...i, stock: vigente.stock } : i);
      setCarrito(cambiarCantidad(actual, id, nuevaCantidad));
      setAviso("");
    } catch (error) { setAviso(error.message); }
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) => eliminarItem(actual, id));
  }

  function vaciarCarrito() {
    setCarrito([]);
    setAviso("");
  }

  return (
    <>
      <Encabezado cantidad={cantidad} />

      {aviso && <div className="container mt-3"><div className="alert alert-info d-flex justify-content-between gap-2" role="status">{aviso}<button className="btn-close" aria-label="Cerrar aviso" onClick={() => setAviso("")} /></div></div>}
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
          element={<Checkout carrito={carrito} total={total} onVaciar={vaciarCarrito} onActualizar={setCarrito} />}
        />
        <Route path="/pago-correcto" element={<PagoCorrecto />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route path="/contacto" element={<Contacto />} />

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
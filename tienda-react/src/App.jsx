import { Routes, Route, Link } from "react-router-dom";

import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";

import Home from "./pages/tienda/Home.jsx";
import Productos from "./pages/tienda/Productos.jsx";
import Nosotros from "./pages/tienda/Nosotros.jsx";

import Login from "./pages/auth/Login.jsx";
import Registro from "./pages/auth/Registro.jsx";

import RutaAdmin from "./pages/admin/RutaAdmin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductosAdmin from "./pages/admin/ProductosAdmin.jsx";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin.jsx";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin.jsx";

import { useState } from "react";

function App() {
  // ESTADO del carrito (vive en App porque lo usan Encabezado y las tarjetas)
  const [carrito, setCarrito] = useState([]);
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);
      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }
      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  }

  return (
    <>
      <Encabezado cantidad={cantidadTotal} />

      <Routes>
        {/* Tienda pública */}
        <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
        <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* Cuentas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Administración (protegida) */}
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

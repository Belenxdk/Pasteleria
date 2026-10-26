import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Encabezado from "./components/Encabezado.jsx";
import ProductosAdmin from "./pages/admin/ProductosAdmin.jsx";
import RutaAdmin from "./pages/admin/RutaAdmin.jsx";
import Registro from "./pages/auth/Registro.jsx";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin.jsx";
import OrdenesAdmin from "./pages/admin/OrdenesAdmin.jsx";
import Portada from "./components/Portada.jsx";
import Catalogo from "./components/Catalogo.jsx";
import PiePagina from "./components/PiePagina.jsx";
import { listarProductos } from "./data/productos.js";

function Inicio() {
  const productos = listarProductos().filter(
    (producto) => producto.activo !== false
  );

  return (
    <>
      <Portada />

      <main className="container py-4" id="productos">
        <h2 className="mb-3">Nuestros productos</h2>
        <Catalogo productos={productos} />
      </main>

      <PiePagina />
    </>
  );
}
function ProductosTienda() {
  const productos = listarProductos().filter(
    (producto) => producto.activo !== false
  );

  return (
    <>
      <main className="container py-4" id="productos">
        <h1 className="mb-4">Nuestros productos</h1>
        <Catalogo productos={productos} />
      </main>

      <PiePagina />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Encabezado />

      <Routes>
        <Route path="/productos" element={<ProductosTienda />} />
        
        <Route path="/" element={<Inicio />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <Dashboard />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <RutaAdmin>
              <ProductosAdmin />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <RutaAdmin>
              <UsuariosAdmin />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/ordenes"
          element={
            <RutaAdmin>
              <OrdenesAdmin />
            </RutaAdmin>
          }
        />

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
    </BrowserRouter>
  );
}

export default App;
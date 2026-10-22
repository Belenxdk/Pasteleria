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

function App() {
  return (
    <BrowserRouter>
      <Encabezado />

      <nav
        className="container d-flex flex-wrap gap-2 py-3"
        aria-label="Navegación de acceso"

      >

        <Link to="/admin" className="btn btn-outline-dark">
          Panel administrador
        </Link>

        <Link to="/" className="btn btn-outline-secondary">
          Inicio
        </Link>

        <Link to="/registro" className="btn btn-outline-success">
          Crear cuenta
        </Link>

        <Link to="/login" className="btn btn-outline-primary">
          Iniciar sesión
        </Link>

        <Link
          to="/admin/productos"
          className="btn btn-outline-dark"
        >
          Administrar productos
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main className="contenedor">
              <h1>🎂 Pastelería Mil Sabores</h1>
              <p>
                Mi primer proyecto con <strong>React + Vite</strong>.
              </p>
              <p className="pie">
                Belén Conalef y Eduardo · DSY1104 · 2026
              </p>
            </main>
          }
        />

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
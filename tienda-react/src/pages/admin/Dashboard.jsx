import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarProductos } from "../../servicios/productos.js";
import { mensajeDeError } from "../../servicios/errores.js";
import { listarUsuarios } from "../../data/usuarios.js";
import { obtenerSesion } from "../../data/auth.js";

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const usuarios = listarUsuarios();
  const sesion = obtenerSesion();
  const esAdmin = sesion?.rol === "ADMIN";

  useEffect(() => {
    let ignorar = false;

    async function cargar() {
      try {
        const datos = await listarProductos();
        if (!ignorar) setProductos(datos);
      } catch (e) {
        if (!ignorar) setError(mensajeDeError(e));
      } finally {
        if (!ignorar) setCargando(false);
      }
    }

    cargar();
    return () => {
      ignorar = true;
    };
  }, []);

  const productosSinStock = productos.filter(
    (producto) => producto.stock === 0
  ).length;

  return (
    <section className="container py-4">
      <h2>Panel de administración</h2>
      <p>Bienvenido, {sesion?.nombre}.</p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Productos registrados</h3>
              <p className="display-6 mb-0">
                {cargando ? "-" : productos.length}
              </p>
            </div>
          </div>
        </div>

        {esAdmin && (
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">Usuarios registrados</h3>
                <p className="display-6 mb-0">{usuarios.length}</p>
                <small className="text-muted">
                  Incluye la cuenta administradora.
                </small>
              </div>
            </div>
          </div>
        )}

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Productos sin stock</h3>
              <p className="display-6 mb-0">
                {cargando ? "-" : productosSinStock}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link to="/admin/productos" className="btn btn-success">
        {esAdmin ? "Administrar productos" : "Ver productos"}
      </Link>

      {esAdmin && (
        <Link to="/admin/usuarios" className="btn btn-primary ms-2">
          Administrar usuarios
        </Link>
      )}

      <Link to="/admin/ordenes" className="btn btn-outline-primary ms-2">
        {esAdmin ? "Administrar órdenes" : "Ver órdenes"}
      </Link>
    </section>
  );
}

export default Dashboard;
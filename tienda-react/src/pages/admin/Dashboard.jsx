import { Link } from "react-router-dom";
import { listarProductos } from "../../data/productos.js";
import { listarUsuarios } from "../../data/usuarios.js";
import { obtenerSesion } from "../../data/auth.js";

function Dashboard() {
  const productos = listarProductos();
  const usuarios = listarUsuarios();
  const sesion = obtenerSesion();

  const productosSinStock = productos.filter(
    (producto) => producto.stock === 0
  ).length;

  return (
    <section className="container py-4">
      <h2>Panel de administración</h2>
      <p>Bienvenido, {sesion?.nombre}.</p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Productos registrados</h3>
              <p className="display-6 mb-0">{productos.length}</p>
            </div>
          </div>
        </div>

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

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Productos sin stock</h3>
              <p className="display-6 mb-0">{productosSinStock}</p>
            </div>
          </div>
        </div>
      </div>

      <Link to="/admin/productos" className="btn btn-success">
        Administrar productos
      </Link>
    </section>
  );
}

export default Dashboard;
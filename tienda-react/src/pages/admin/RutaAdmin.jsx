import { Navigate } from "react-router-dom";
import { obtenerSesion } from "../../data/auth.js";

function RutaAdmin({ children }) {
  const sesion = obtenerSesion();

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  if (sesion.rol !== "admin") {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Tu cuenta no tiene permisos de administrador.
        </div>
      </div>
    );
  }

  return children;
}

export default RutaAdmin;
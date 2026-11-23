import { Navigate } from "react-router-dom";
import { obtenerSesion } from "../../data/auth.js";

function RutaAdmin({ children, roles = ["ADMIN"] }) {
  const sesion = obtenerSesion();

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(sesion.rol)) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Tu cuenta no tiene permisos para ver esta página.
        </div>
      </div>
    );
  }

  return children;
}

export default RutaAdmin;
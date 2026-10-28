import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  iniciarSesion,
  obtenerSesion,
  cerrarSesion,
} from "../../data/auth.js";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sesion, setSesion] = useState(() => obtenerSesion());

  useEffect(() => {
    const actualizar = () => setSesion(obtenerSesion());
    window.addEventListener('sesion-cambiada', actualizar);
    return () => window.removeEventListener('sesion-cambiada', actualizar);
  }, []);

  function manejarLogin(evento) {
    evento.preventDefault();
    setError("");

    try {
      const usuario = iniciarSesion(email, password);
      setSesion(usuario);
      if (location.state?.volver === "/checkout") navigate("/checkout");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }

  function manejarCerrarSesion() {
    cerrarSesion();
    setSesion(null);
    setError("");
    setPassword("");
  }

  return (
    <section className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {sesion ? (
                <>
                  <h2>Hola, {sesion.nombre}</h2>
                  <Link to="/checkout" className="btn btn-primario mb-3">Continuar compra</Link>

                  <div className="alert alert-success" role="status">
                    Has iniciado sesión correctamente.
                  </div>

                  <p>
                    <strong>Correo:</strong> {sesion.email}
                  </p>

                  <p>
                    <strong>Rol:</strong> {sesion.rol}
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={manejarCerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <h2 className="mb-3">Iniciar sesión</h2>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={manejarLogin}>
                    <div className="mb-3">
                      <label
                        htmlFor="login-email"
                        className="form-label"
                      >
                        Correo electrónico
                      </label>

                      <input
                        id="login-email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        autoComplete="username"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="login-password"
                        className="form-label"
                      >
                        Contraseña
                      </label>

                      <input
                        id="login-password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        autoComplete="current-password"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100"
                    >
                      Ingresar
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
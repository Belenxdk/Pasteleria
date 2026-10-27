import { useState } from "react";
import { Link } from "react-router-dom";
import {
  listarUsuarios,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  validarRegistro,
} from "../../data/usuarios.js";

const formularioInicial = {
  run: "",
  nombre: "",
  apellidos: "",
  email: "",
  direccion: "",
  password: "",
  confirmarPassword: "",
};

const campos = [
  { nombre: "run", etiqueta: "RUN sin puntos ni guion", tipo: "text" },
  { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
  { nombre: "apellidos", etiqueta: "Apellidos", tipo: "text" },
  { nombre: "email", etiqueta: "Correo electrónico", tipo: "email" },
  { nombre: "direccion", etiqueta: "Dirección", tipo: "text" },
  { nombre: "password", etiqueta: "Contraseña", tipo: "password" },
  {
    nombre: "confirmarPassword",
    etiqueta: "Confirmar contraseña",
    tipo: "password",
  },
];

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(() => listarUsuarios());
  const [formulario, setFormulario] = useState({ ...formularioInicial });
  const [idEditando, setIdEditando] = useState(null);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial });
    setIdEditando(null);
    setErrores({});
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrores((actuales) => ({
      ...actuales,
      [name]: "",
    }));

    setMensaje("");
    setErrorGeneral("");
  }

  function manejarEditar(usuario) {
    setIdEditando(usuario.id);
    setFormulario({
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      direccion: usuario.direccion,
      password: "",
      confirmarPassword: "",
    });
    setErrores({});
    setMensaje("");
    setErrorGeneral("");
  }

  function cancelarEdicion() {
    limpiarFormulario();
    setMensaje("");
    setErrorGeneral("");
  }

  function manejarGuardar(evento) {
    evento.preventDefault();
    setMensaje("");
    setErrorGeneral("");

    const nuevosErrores = validarRegistro(formulario);

    // Al editar, ambos campos vacíos conservan la contraseña.
    const conservarPassword =
      idEditando !== null &&
      formulario.password === "" &&
      formulario.confirmarPassword === "";

    if (conservarPassword) {
      delete nuevosErrores.password;
      delete nuevosErrores.confirmarPassword;
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      if (idEditando !== null) {
        actualizarUsuario(idEditando, formulario);
      } else {
        registrarUsuario(formulario);
      }

      setUsuarios(listarUsuarios());
      setMensaje(
        idEditando !== null
          ? "Usuario actualizado correctamente."
          : "Usuario creado correctamente."
      );
      limpiarFormulario();
    } catch (error) {
      setErrorGeneral(error.message);
    }
  }

  function manejarEliminar(usuario) {
    const confirmar = window.confirm(
      `¿Quieres eliminar la cuenta de ${usuario.nombre}?`
    );

    if (!confirmar) return;

    setMensaje("");
    setErrorGeneral("");

    try {
      eliminarUsuario(usuario.id);

      if (idEditando === usuario.id) {
        limpiarFormulario();
      }

      setUsuarios(listarUsuarios());
      setMensaje("Usuario eliminado correctamente.");
    } catch (error) {
      setErrorGeneral(error.message);
    }
  }

  return (
    <section className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2>Administración de usuarios</h2>
          <p className="mb-0">
            Usuarios registrados: {usuarios.length}
          </p>
        </div>

        <Link to="/admin" className="btn btn-outline-secondary">
          Volver al panel
        </Link>
      </div>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}

      <form
        onSubmit={manejarGuardar}
        className="card card-body mb-4"
        noValidate
      >
        <h3>
          {idEditando !== null ? "Editar cliente" : "Crear cliente"}
        </h3>

        {idEditando !== null && (
          <p className="text-muted">
            Deja los dos campos de contraseña vacíos para conservar
            la actual.
          </p>
        )}

        <div className="row g-3">
          {campos.map((campo) => (
            <div className="col-12 col-md-6" key={campo.nombre}>
              <label
                htmlFor={`usuario-${campo.nombre}`}
                className="form-label"
              >
                {campo.etiqueta}
              </label>

              <input
                id={`usuario-${campo.nombre}`}
                name={campo.nombre}
                type={campo.tipo}
                className={`form-control ${
                  errores[campo.nombre] ? "is-invalid" : ""
                }`}
                value={formulario[campo.nombre]}
                onChange={manejarCambio}
                autoComplete={
                  campo.tipo === "password" ? "new-password" : "off"
                }
                aria-invalid={Boolean(errores[campo.nombre])}
                aria-describedby={
                  errores[campo.nombre]
                    ? `usuario-error-${campo.nombre}`
                    : undefined
                }
                required={
                  campo.tipo !== "password" || idEditando === null
                }
              />

              {errores[campo.nombre] && (
                <div
                  id={`usuario-error-${campo.nombre}`}
                  className="invalid-feedback"
                >
                  {errores[campo.nombre]}
                </div>
              )}
            </div>
          ))}

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-success me-2"
            >
              {idEditando !== null
                ? "Guardar cambios"
                : "Crear cliente"}
            </button>

            {idEditando !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelarEdicion}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">RUN</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Dirección</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.run || "Sin RUN"}</td>

                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>

                <td>{usuario.email}</td>
                <td>{usuario.direccion}</td>

                <td>
                  <span
                    className={
                      usuario.rol === "admin"
                        ? "badge bg-dark"
                        : "badge bg-success"
                    }
                  >
                    {usuario.rol === "admin"
                      ? "Administrador"
                      : "Cliente"}
                  </span>
                </td>

                <td>
                  {usuario.rol === "admin" ? (
                    <span className="text-muted">
                      Cuenta de demo protegida
                    </span>
                  ) : (
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => manejarEditar(usuario)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => manejarEliminar(usuario)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsuariosAdmin;
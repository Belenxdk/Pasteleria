import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerSesion } from "../../data/auth.js";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../../servicios/usuarios.js";
import { mensajeDeError } from "../../servicios/errores.js";

const formularioVacio = {
  nombre: "",
  email: "",
  password: "",
  rol: "CLIENTE",
};

const nombreRol = {
  ADMIN: "Administrador",
  VENDEDOR: "Vendedor",
  CLIENTE: "Cliente",
};

function explicarError(error) {
  const mensaje = mensajeDeError(error);
  const campos = error.response?.data?.campos;
  return campos && Object.keys(campos).length
    ? `${mensaje}: ${Object.values(campos).join(". ")}`
    : mensaje;
}

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({ ...formularioVacio });
  const [idEditando, setIdEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const emailActual = obtenerSesion()?.email;

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const lista = await listarUsuarios();
        if (activo) setUsuarios(lista);
      } catch (e) {
        if (activo) setError(explicarError(e));
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => { activo = false; };
  }, []);

  async function recargar() {
    const lista = await listarUsuarios();
    setUsuarios(lista);
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioVacio });
    setIdEditando(null);
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setMensaje("");
    setError("");
  }

  function manejarEditar(usuario) {
    setIdEditando(usuario.id);
    setFormulario({
      nombre: usuario.nombre,
      email: usuario.email,
      password: "",
      rol: usuario.rol,
    });
    setMensaje("");
    setError("");
  }

  async function manejarGuardar(evento) {
    evento.preventDefault();
    setMensaje("");
    setError("");

    const nombre = formulario.nombre.trim();
    const email = formulario.email.trim().toLowerCase();
    const password = formulario.password;

    if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un nombre y un correo válido.");
      return;
    }
    if ((idEditando === null || password !== "") && password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const datos = { nombre, email, rol: formulario.rol };
    // Al editar, no enviamos la contraseña si se deja vacía.
    if (password) datos.password = password;

    setGuardando(true);
    try {
      if (idEditando === null) {
        await crearUsuario(datos);
      } else {
        await actualizarUsuario(idEditando, datos);
      }
      await recargar();
      setMensaje(idEditando === null
        ? "Usuario creado correctamente."
        : "Usuario actualizado correctamente.");
      limpiarFormulario();
    } catch (e) {
      setError(explicarError(e));
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(usuario) {
    if (usuario.email.toLowerCase() === emailActual?.toLowerCase()) {
      setError("No puedes eliminar tu propia cuenta.");
      return;
    }
    if (!window.confirm(`¿Quieres eliminar la cuenta de ${usuario.nombre}?`)) return;

    setMensaje("");
    setError("");
    setEliminando(usuario.id);
    try {
      await eliminarUsuario(usuario.id);
      await recargar();
      if (idEditando === usuario.id) limpiarFormulario();
      setMensaje("Usuario eliminado correctamente.");
    } catch (e) {
      setError(explicarError(e));
    } finally {
      setEliminando(null);
    }
  }

  return (
    <section className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2>Administración de usuarios</h2>
          <p className="mb-0">Usuarios registrados: {usuarios.length}</p>
        </div>
        <Link to="/admin" className="btn btn-outline-secondary">Volver al panel</Link>
      </div>

      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <form className="card card-body mb-4" onSubmit={manejarGuardar}>
        <h3>{idEditando === null ? "Crear usuario" : "Editar usuario"}</h3>
        {idEditando !== null && (
          <p className="text-muted">Deja la contraseña vacía para conservar la actual.</p>
        )}

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="usuario-nombre">Nombre</label>
            <input id="usuario-nombre" name="nombre" className="form-control"
              value={formulario.nombre} onChange={manejarCambio} maxLength={100} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="usuario-email">Correo electrónico</label>
            <input id="usuario-email" name="email" className="form-control" type="email"
              value={formulario.email} onChange={manejarCambio} maxLength={100} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="usuario-password">Contraseña</label>
            <input id="usuario-password" name="password" className="form-control" type="password"
              value={formulario.password} onChange={manejarCambio}
              minLength={idEditando === null ? 6 : undefined}
              required={idEditando === null} autoComplete="new-password" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="usuario-rol">Rol</label>
            <select id="usuario-rol" name="rol" className="form-select"
              value={formulario.rol} onChange={manejarCambio}>
              <option value="CLIENTE">Cliente</option>
              <option value="VENDEDOR">Vendedor</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-success" type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : idEditando === null ? "Crear usuario" : "Guardar cambios"}
          </button>
          {idEditando !== null && (
            <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {cargando ? <p>Cargando usuarios...</p> : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{nombreRol[usuario.rol] ?? usuario.rol}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button type="button" className="btn btn-warning btn-sm"
                        onClick={() => manejarEditar(usuario)}>Editar</button>
                      <button type="button" className="btn btn-danger btn-sm"
                        onClick={() => manejarEliminar(usuario)}
                        disabled={eliminando !== null || usuario.email.toLowerCase() === emailActual?.toLowerCase()}>
                        {eliminando === usuario.id ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr><td colSpan={5} className="text-center">No hay usuarios registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UsuariosAdmin;

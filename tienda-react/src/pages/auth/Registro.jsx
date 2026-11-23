import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarse } from "../../data/auth.js";
import { validarRun } from "../../data/usuarios.js";

const formularioInicial = {
  run: "",
  nombre: "",
  apellidos: "",
  direccion: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

const campos = [
  { nombre: "run", etiqueta: "RUN sin puntos ni guion", tipo: "text", maximo: 9 },
  { nombre: "nombre", etiqueta: "Nombre", tipo: "text", maximo: 100 },
  { nombre: "apellidos", etiqueta: "Apellidos", tipo: "text", maximo: 100 },
  { nombre: "email", etiqueta: "Correo electrónico", tipo: "email", maximo: 100 },
  { nombre: "direccion", etiqueta: "Dirección", tipo: "text", maximo: 300 },
  { nombre: "password", etiqueta: "Contraseña (mínimo 6 caracteres)", tipo: "password", maximo: 50 },
  { nombre: "confirmarPassword", etiqueta: "Confirmar contraseña", tipo: "password", maximo: 50 },
];

function validar(f) {
  const errores = {};
  if (!validarRun(f.run)) errores.run = "Ingresa un RUN válido, sin puntos ni guion";
  if (!f.apellidos.trim()) errores.apellidos = "Faltan los apellidos";
  if (!f.direccion.trim()) errores.direccion = "Falta la dirección";
  if (!f.nombre.trim()) errores.nombre = "Falta el nombre";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    errores.email = "El correo no es válido";
  }
  if (f.password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres";
  }
  if (f.confirmarPassword !== f.password) {
    errores.confirmarPassword = "Las contraseñas no coinciden";
  }
  return errores;
}

function Registro() {
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
    setErrorGeneral("");
  }

  async function manejarRegistro(evento) {
    evento.preventDefault();
    setErrorGeneral("");

    const nuevosErrores = validar(formulario);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    try {
      await registrarse(formulario.nombre, formulario.email, formulario.password, {
        run: formulario.run.trim().toUpperCase(),
        apellidos: formulario.apellidos.trim(),
        direccion: formulario.direccion.trim(),
      });
      navegar("/");
    } catch (error) {
      if (error.campos) setErrores(error.campos);
      setErrorGeneral(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-3">Crear cuenta</h2>
              <p className="text-muted">
                Completa tus datos para registrarte en Pastelería Mil Sabores.
              </p>

              {errorGeneral && (
                <div className="alert alert-danger" role="alert">
                  {errorGeneral}
                </div>
              )}

              <form onSubmit={manejarRegistro} noValidate>
                {campos.map((campo) => (
                  <div className="mb-3" key={campo.nombre}>
                    <label htmlFor={`registro-${campo.nombre}`} className="form-label">
                      {campo.etiqueta}
                    </label>
                    <input
                      id={`registro-${campo.nombre}`}
                      name={campo.nombre}
                      type={campo.tipo}
                      maxLength={campo.maximo}
                      className={`form-control ${errores[campo.nombre] ? "is-invalid" : ""}`}
                      value={formulario[campo.nombre]}
                      onChange={manejarCambio}
                      aria-invalid={Boolean(errores[campo.nombre])}
                      autoComplete={campo.tipo === "password" ? "new-password" : undefined}
                      required
                    />
                    {errores[campo.nombre] && (
                      <div className="invalid-feedback">{errores[campo.nombre]}</div>
                    )}
                  </div>
                ))}

                <button type="submit" className="btn btn-success w-100" disabled={enviando}>
                  {enviando ? "Creando cuenta..." : "Registrarme"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;
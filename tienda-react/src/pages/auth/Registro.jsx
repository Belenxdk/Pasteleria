import { useState } from "react";
import {
  registrarUsuario,
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
  {
    nombre: "run",
    etiqueta: "RUN sin puntos ni guion",
    tipo: "text",
    maximo: 9,
  },
  {
    nombre: "nombre",
    etiqueta: "Nombre",
    tipo: "text",
    maximo: 50,
  },
  {
    nombre: "apellidos",
    etiqueta: "Apellidos",
    tipo: "text",
    maximo: 100,
  },
  {
    nombre: "email",
    etiqueta: "Correo electrónico",
    tipo: "email",
    maximo: 100,
  },
  {
    nombre: "direccion",
    etiqueta: "Dirección",
    tipo: "text",
    maximo: 300,
  },
  {
    nombre: "password",
    etiqueta: "Contraseña",
    tipo: "password",
    maximo: 10,
  },
  {
    nombre: "confirmarPassword",
    etiqueta: "Confirmar contraseña",
    tipo: "password",
    maximo: 10,
  },
];

function Registro() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");

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

  function manejarRegistro(evento) {
    evento.preventDefault();
    setMensaje("");
    setErrorGeneral("");

    const nuevosErrores = validarRegistro(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    try {
      registrarUsuario(formulario);
      setFormulario({ ...formularioInicial });
      setErrores({});
      setMensaje("Cuenta creada correctamente.");
    } catch (error) {
      setErrorGeneral(error.message);
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
                Completa tus datos para registrarte en Pastelería Mil
                Sabores.
              </p>

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

              <form onSubmit={manejarRegistro} noValidate>
                {campos.map((campo) => (
                  <div className="mb-3" key={campo.nombre}>
                    <label
                      htmlFor={`registro-${campo.nombre}`}
                      className="form-label"
                    >
                      {campo.etiqueta}
                    </label>

                    <input
                      id={`registro-${campo.nombre}`}
                      name={campo.nombre}
                      type={campo.tipo}
                      maxLength={campo.maximo}
                      className={`form-control ${
                        errores[campo.nombre] ? "is-invalid" : ""
                      }`}
                      value={formulario[campo.nombre]}
                      onChange={manejarCambio}
                      aria-invalid={Boolean(errores[campo.nombre])}
                      aria-describedby={
                        errores[campo.nombre]
                          ? `error-${campo.nombre}`
                          : undefined
                      }
                      autoComplete={
                        campo.tipo === "password"
                          ? "new-password"
                          : undefined
                      }
                      required
                    />

                    {errores[campo.nombre] && (
                      <div
                        id={`error-${campo.nombre}`}
                        className="invalid-feedback"
                      >
                        {errores[campo.nombre]}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Registrarme
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
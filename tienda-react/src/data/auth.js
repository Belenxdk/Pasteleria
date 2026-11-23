import api from "../servicios/api.js";
import { mensajeDeError } from "../servicios/errores.js";

const CLAVE_SESION = "milsabores_sesion";

function guardarSesion(datos) {
  const sesion = {
    id: datos.email,
    token: datos.token,
    nombre: datos.nombre,
    email: datos.email,
    rol: datos.rol,
  };

  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  window.dispatchEvent(new Event("sesion-cambiada"));
  return sesion;
}

export async function iniciarSesion(email, password) {
  const correo = email.trim().toLowerCase();

  if (!correo || !password) {
    throw new Error("Completa el correo y la contraseña.");
  }

  try {
    const respuesta = await api.post("/auth/login", { email: correo, password });
    return guardarSesion(respuesta.data);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Correo o contraseña incorrectos.");
    }
    throw new Error(mensajeDeError(error));
  }
}

// El registro crea un CLIENTE en la base de datos y devuelve una sesión JWT.
export async function registrarse(nombre, email, password, camposExtra = {}) {
  const nombreLimpio = nombre.trim();
  const correo = email.trim().toLowerCase();

  if (!nombreLimpio || !correo || password.length < 6) {
    throw new Error("Completa los datos y usa una contraseña de al menos 6 caracteres.");
  }

  try {
    const respuesta = await api.post("/auth/registro", {
      nombre: nombreLimpio,
      email: correo,
      password,
      ...camposExtra,
    });
    return guardarSesion(respuesta.data);
  } catch (error) {
    throw new Error(mensajeDeError(error));
  }
}

export function obtenerSesion() {
  const guardada = sessionStorage.getItem(CLAVE_SESION);
  return guardada ? JSON.parse(guardada) : null;
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.dispatchEvent(new Event("sesion-cambiada"));
}

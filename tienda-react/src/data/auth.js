import api from "../servicios/api.js";
import { mensajeDeError } from "../servicios/errores.js";

const CLAVE_SESION = "milsabores_sesion";

export async function iniciarSesion(email, password) {
  const correo = email.trim().toLowerCase();

  if (!correo || !password) {
    throw new Error("Completa el correo y la contraseña.");
  }

  try {
    const respuesta = await api.post("/auth/login", { email: correo, password });

    const sesion = {
      id: respuesta.data.email,
      token: respuesta.data.token,
      nombre: respuesta.data.nombre,
      email: respuesta.data.email,
      rol: respuesta.data.rol,
    };

    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    return sesion;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Correo o contraseña incorrectos.");
    }
    throw new Error(mensajeDeError(error));
  }
}

export function obtenerSesion() {
  const guardada = sessionStorage.getItem(CLAVE_SESION);
  return guardada ? JSON.parse(guardada) : null;
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
}
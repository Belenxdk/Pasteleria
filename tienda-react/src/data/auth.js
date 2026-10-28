import { listarUsuarios } from "./usuarios.js";

const CLAVE_SESION = "milsabores_sesion";

export function iniciarSesion(email, password) {
  const correo = email.trim().toLowerCase();

  if (!correo || !password) {
    throw new Error("Completa el correo y la contraseña.");
  }

  const usuario = listarUsuarios().find(
    (usuario) =>
      usuario.email === correo && usuario.password === password
  );

  if (!usuario) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  // Guardamos solo los datos necesarios, sin la contraseña.
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  };

  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));

  window.dispatchEvent(new Event("sesion-cambiada"));
  return sesion;
}

export function obtenerSesion() {
  const guardada = sessionStorage.getItem(CLAVE_SESION);
  return guardada ? JSON.parse(guardada) : null;
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.dispatchEvent(new Event("sesion-cambiada"));
}
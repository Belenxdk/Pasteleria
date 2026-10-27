const CLAVE = "milsabores_usuarios";

export function listarUsuarios() {
  const guardados = localStorage.getItem(CLAVE);
  return guardados === null ? [] : JSON.parse(guardados);
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE, JSON.stringify(usuarios));
}

export function validarRun(valor) {
  const run = valor.trim().toUpperCase();

  if (!/^\d{7,8}[\dK]$/.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  const digito = run.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);
  const esperado =
    resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);

  return digito === esperado;
}

export function validarRegistro(datos) {
  const errores = {};

  if (!validarRun(datos.run || "")) {
    errores.run = "Ingresa un RUN válido, sin puntos ni guion.";
  }

  const nombre = (datos.nombre || "").trim();
  if (!nombre || nombre.length > 50) {
    errores.nombre = "Ingresa un nombre de hasta 50 caracteres.";
  }

  const apellidos = (datos.apellidos || "").trim();
  if (!apellidos || apellidos.length > 100) {
    errores.apellidos = "Ingresa apellidos de hasta 100 caracteres.";
  }

  const email = (datos.email || "").trim();
  const formatoEmail =
    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  if (email.length > 100 || !formatoEmail.test(email)) {
    errores.email =
      "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }

  const direccion = (datos.direccion || "").trim();
  if (!direccion || direccion.length > 300) {
    errores.direccion = "Ingresa una dirección de hasta 300 caracteres.";
  }

  const password = datos.password || "";
  if (password.length < 4 || password.length > 10) {
    errores.password = "La contraseña debe tener entre 4 y 10 caracteres.";
  }

  if (password !== datos.confirmarPassword) {
    errores.confirmarPassword = "Las contraseñas no coinciden.";
  }

  return errores;
}

export function registrarUsuario(datos) {
  const errores = validarRegistro(datos);

  if (Object.keys(errores).length > 0) {
    throw new Error("Revisa los campos del formulario.");
  }

  const usuarios = listarUsuarios();
  const email = datos.email.trim().toLowerCase();
  const run = datos.run.trim().toUpperCase();

  if (usuarios.some((usuario) => usuario.email === email)) {
    throw new Error("Ese correo ya está registrado.");
  }

  if (usuarios.some((usuario) => usuario.run === run)) {
    throw new Error("Ese RUN ya está registrado.");
  }

  const nuevoUsuario = {
    id: crypto.randomUUID(),
    run,
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    email,
    direccion: datos.direccion.trim(),
    password: datos.password,
    rol: "cliente",
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  return {
    id: nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    email: nuevoUsuario.email,
    rol: nuevoUsuario.rol,
  };
}

export function inicializarAdminDemo() {
  const usuarios = listarUsuarios();
  const emailAdmin = "admin@milsabores.test";

  const existe = usuarios.some(
    (usuario) => usuario.email === emailAdmin
  );

  if (existe) return;

  const administrador = {
    id: "admin-demo",
    run: "",
    nombre: "Administrador",
    apellidos: "Demo",
    email: emailAdmin,
    direccion: "Cuenta de demostración",
    password: "Admin123",
    rol: "admin",
  };

  usuarios.push(administrador);
  guardarUsuarios(usuarios);
}
export function actualizarUsuario(id, datos) {
  const usuarios = listarUsuarios();
  const indice = usuarios.findIndex((usuario) => usuario.id === id);

  if (indice === -1) {
    throw new Error("El usuario no existe.");
  }

  const usuarioActual = usuarios[indice];

  if (usuarioActual.rol === "admin") {
    throw new Error("La cuenta administradora de demo no se puede editar.");
  }

  const password =
    datos.password === "" || datos.password === undefined
      ? usuarioActual.password
      : datos.password;

  const actualizado = {
    ...usuarioActual,
    run: (datos.run || "").trim().toUpperCase(),
    nombre: (datos.nombre || "").trim(),
    apellidos: (datos.apellidos || "").trim(),
    email: (datos.email || "").trim().toLowerCase(),
    direccion: (datos.direccion || "").trim(),
    password,
  };

  const errores = validarRegistro({
    ...actualizado,
    confirmarPassword: password,
  });

  if (Object.keys(errores).length > 0) {
    throw new Error(Object.values(errores)[0]);
  }

  const correoRepetido = usuarios.some(
    (usuario) =>
      usuario.id !== id && usuario.email === actualizado.email
  );

  if (correoRepetido) {
    throw new Error("Ese correo ya pertenece a otro usuario.");
  }

  const runRepetido = usuarios.some(
    (usuario) =>
      usuario.id !== id && usuario.run === actualizado.run
  );

  if (runRepetido) {
    throw new Error("Ese RUN ya pertenece a otro usuario.");
  }

  usuarios[indice] = actualizado;
  guardarUsuarios(usuarios);

  return {
    id: actualizado.id,
    nombre: actualizado.nombre,
    email: actualizado.email,
    rol: actualizado.rol,
  };
}

export function eliminarUsuario(id) {
  const usuarios = listarUsuarios();
  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  if (usuario.rol === "admin") {
    throw new Error("La cuenta administradora de demo no se puede eliminar.");
  }

  const restantes = usuarios.filter((usuario) => usuario.id !== id);
  guardarUsuarios(restantes);
}
export function validarContacto(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  const correo = datos.correo.trim()
  const telefono = datos.telefono.trim()
  const asunto = datos.asunto.trim()
  const mensaje = datos.mensaje.trim()

  if (nombre.length < 3) {
    errores.nombre = 'Ingresa tu nombre completo (mínimo 3 caracteres).'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errores.correo = 'Ingresa un correo válido.'
  }
  if (telefono !== '' && !/^\+?\d{8,12}$/.test(telefono.replace(/\s/g, ''))) {
    errores.telefono = 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.'
  }
  if (asunto.length < 3) {
    errores.asunto = 'Ingresa un asunto (mínimo 3 caracteres).'
  }
  if (mensaje.length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  }

  return errores
}
export function mensajeDeError(error) {
  if (error.response) {
    return (
      error.response.data?.mensaje ??
      `El servidor respondió con el error ${error.response.status}.`
    );
  }

  if (error.request) {
    return "No hay conexión con el servidor. Revisa que la API de Spring Boot esté corriendo.";
  }

  return error.message;
}
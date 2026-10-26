export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
}
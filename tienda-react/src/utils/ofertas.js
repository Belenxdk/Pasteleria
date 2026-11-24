export function estaEnOferta(p) {
  return Number.isInteger(p.precioAnterior) && p.precioAnterior > p.precio && p.precio > 0
}
export function porcentajeOferta(p) {
  return estaEnOferta(p) ? Math.floor((p.precioAnterior - p.precio) * 100 / p.precioAnterior) : 0
}

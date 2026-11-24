import { Badge } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'
import { estaEnOferta, porcentajeOferta } from '../utils/ofertas.js'
export default function PrecioProducto({ producto }) {
  return <div className="precio mb-3">
    {estaEnOferta(producto) && <div><del className="text-muted">{formatearPrecio(producto.precioAnterior)}</del>{' '}<Badge bg="danger">-{porcentajeOferta(producto)}%</Badge></div>}
    <span className="fw-bold">{formatearPrecio(producto.precio)}</span>
  </div>
}

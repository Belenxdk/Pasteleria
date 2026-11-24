import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PrecioProducto from './PrecioProducto.jsx'
import { useCarrito } from '../context/CartContext.jsx'
export default function TarjetaProducto({ producto }) {
  const { carrito, agregarAlCarrito } = useCarrito()
  const { id, nombre, imagen, stock } = producto
  const cantidad = carrito.find(i => i.id === id)?.cantidad ?? 0
  const agotado = stock != null && stock <= cantidad
  const ruta = `/productos/${encodeURIComponent(id)}`
  return <Card className="tarjeta-producto h-100">
    <Link to={ruta} aria-label={`Ver detalle de ${nombre}`}><Card.Img variant="top" src={imagen} alt={nombre} className="imagen-producto" /></Link>
    <Card.Body className="d-flex flex-column text-center">
      <Card.Title>{nombre}</Card.Title><small className="text-muted">{producto.categoria}</small>
      <PrecioProducto producto={producto} />
      <Link to={ruta} className="btn btn-primary btn-agregar mt-auto mb-2">Ver detalle</Link>
      <Button className="btn-agregar" disabled={agotado} onClick={() => agregarAlCarrito(producto)}>{agotado ? 'Sin unidades disponibles' : 'Agregar al carrito'}</Button>
    </Card.Body>
  </Card>
}


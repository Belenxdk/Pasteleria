import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { obtenerProducto } from '../../servicios/productos.js'
import { mensajeDeError } from '../../servicios/errores.js'
import { useCarrito } from '../../context/CartContext.jsx'
import PrecioProducto from '../../components/PrecioProducto.jsx'
export default function DetalleProducto() {
  const { id } = useParams()
  const { carrito, agregarAlCarrito } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [agregado, setAgregado] = useState(false)
  const [unidades, setUnidades] = useState(1)
  useEffect(() => {
    let ignorar = false
    setCargando(true); setError(''); setProducto(null); setAgregado(false); setUnidades(1)
    obtenerProducto(id).then(p => { if (!ignorar) { if (p.activo === false) setError('Producto no disponible.'); else setProducto(p) } }).catch(e => { if (!ignorar) setError(mensajeDeError(e)) }).finally(() => { if (!ignorar) setCargando(false) })
    return () => { ignorar = true }
  }, [id])
  const enCarrito = carrito.find(i => i.id === id)?.cantidad ?? 0
  const disponibles = Math.max(0, (producto?.stock ?? 0) - enCarrito)
  const cantidadValida = Number.isInteger(unidades) && unidades > 0 && unidades <= disponibles
  return <Container as="main" className="py-4">
    <Link to="/productos">Volver a productos</Link>
    {cargando ? <div className="py-5 text-center"><Spinner role="status" /><p>Cargando producto…</p></div> : error ? <Alert variant="danger" className="mt-3">{error}</Alert> : producto && <Row className="g-4 mt-2 align-items-start">
      <Col md={6}><img className="img-fluid detalle-imagen" src={producto.imagen} alt={producto.nombre} /></Col>
      <Col md={6}><h1>{producto.nombre}</h1><p><Link to={`/productos?categoria=${encodeURIComponent(producto.categoria)}`}>{producto.categoria}</Link></p><PrecioProducto producto={producto} /><p>{producto.descripcion || 'Sin descripción disponible.'}</p><p>Stock disponible: {producto.stock}</p><p>En tu carrito: {enCarrito}</p>
      <Form.Group className="mb-3" controlId="unidades-detalle"><Form.Label>Cantidad</Form.Label><Form.Control type="number" min={1} max={disponibles} step={1} value={unidades} disabled={!disponibles} onChange={e => { setUnidades(Number(e.target.value)); setAgregado(false) }} /></Form.Group>
      <Button className="btn-primario" disabled={!cantidadValida} onClick={() => { agregarAlCarrito(producto, unidades); setAgregado(true); setUnidades(1) }}>Agregar al carrito</Button>{' '}<Button as={Link} to="/carrito" className="btn-agregar">Ver carrito</Button>
      {agregado && <Alert variant="success" className="mt-3" role="status">Producto agregado al carrito.</Alert>}</Col>
    </Row>}
  </Container>
}

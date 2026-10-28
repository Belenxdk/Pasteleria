import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'

function ItemCarrito({ item, onCambiarCantidad, onEliminar }) {
    const { id, nombre, imagen, precio, cantidad } = item

    return (
        <Row className="item-carrito align-items-center g-3">
            <Col xs={4} md={2}>
                <img src={imagen} alt={nombre} className="imagen-item" />
            </Col>
            <Col xs={8} md={4}>
                <h5 className="mb-1">{nombre}</h5>
                <small>{formatearPrecio(precio)} c/u</small>
            </Col>
            <Col xs={6} md={3}>
                <ButtonGroup aria-label={`Cantidad de ${nombre}`}>
                    <Button className="btn-agregar" aria-label="Disminuir" onClick={() => onCambiarCantidad(id, cantidad - 1)}>−</Button>
                    <Button className="btn-cantidad" disabled>{cantidad}</Button>
                    <Button className="btn-agregar" disabled={cantidad >= item.stock} aria-label="Aumentar" onClick={() => onCambiarCantidad(id, cantidad + 1)}>+</Button>
                </ButtonGroup>
            </Col>
            <Col xs={4} md={2} className="fw-bold">
                {formatearPrecio(precio * cantidad)}
            </Col>
            <Col xs={2} md={1}>
                <Button variant="outline-danger" size="sm" aria-label={`Eliminar ${nombre}`} onClick={() => onEliminar(id)}>✕</Button>
            </Col>
        </Row>
    )
}

export default ItemCarrito
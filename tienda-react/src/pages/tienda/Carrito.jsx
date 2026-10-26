import { Link } from 'react-router-dom'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import ItemCarrito from '../../components/ItemCarrito.jsx'
import ResumenCarrito from '../../components/ResumenCarrito.jsx'

function Carrito({ carrito, cantidad, total, onCambiarCantidad, onEliminar, onVaciar }) {
    return (
        <Container as="main" className="py-4">
            <h2 className="text-center mb-4">Tu carrito de compras</h2>
            {carrito.length === 0 ? (
                <Alert variant="info" className="text-center">
                    Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
                </Alert>
            ) : (
                <Row className="g-4">
                    <Col lg={8}>
                        {carrito.map((item) => (
                            <ItemCarrito
                                key={item.id}
                                item={item}
                                onCambiarCantidad={onCambiarCantidad}
                                onEliminar={onEliminar}
                            />
                        ))}
                    </Col>
                    <Col lg={4}>
                        <ResumenCarrito cantidad={cantidad} total={total} onVaciar={onVaciar} />
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default Carrito
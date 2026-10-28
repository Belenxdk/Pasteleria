import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'

function ResumenCarrito({ cantidad, total, onVaciar }) {
    return (
        <Card className="resumen-carrito">
            <Card.Body>
                <h4>Resumen del pedido</h4>
                <p className="d-flex justify-content-between mb-1">
                    <span>Productos</span>
                    <span>{cantidad}</span>
                </p>
                <p className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total</span>
                    <span>{formatearPrecio(total)}</span>
                </p>
                <Button as={Link} to="/checkout" className="btn-primario w-100 mb-2">Ir a pagar</Button>
                <Button className="btn-agregar w-100" onClick={onVaciar}>Vaciar carrito</Button>
            </Card.Body>
        </Card>
    )
}

export default ResumenCarrito
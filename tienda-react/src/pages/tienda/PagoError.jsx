import { Link, useLocation } from 'react-router-dom'
import { Alert, Button, Container } from 'react-bootstrap'

function PagoError() {
    const { state } = useLocation()
    const mensaje = state && state.mensaje ? state.mensaje : 'No pudimos procesar tu compra.'

    return (
        <Container as="main" className="py-4">
            <Alert variant="danger" className="text-center">
                <h2>No se pudo completar la compra</h2>
                <p className="mb-0">{mensaje}</p>
            </Alert>

            <div className="d-flex justify-content-center gap-2">
                <Button as={Link} to="/carrito" className="btn-primario">Volver al carrito</Button>
                <Button as={Link} to="/productos" className="btn-agregar">Ver productos</Button>
            </div>
        </Container>
    )
}

export default PagoError
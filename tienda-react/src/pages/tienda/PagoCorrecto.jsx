import { Link, Navigate, useLocation } from 'react-router-dom'
import { Alert, Button, Container, Table } from 'react-bootstrap'
import { formatearPrecio } from '../../utils/formato.js'

function PagoCorrecto() {
    const { state } = useLocation()

    if (!state || !state.orden) {
        return <Navigate to="/" replace />
    }

    const { orden } = state

    return (
        <Container as="main" className="py-4">
            <Alert variant="success" className="text-center">
                <h2>¡Compra realizada!</h2>
                <p className="mb-0">Tu orden quedó registrada con estado: {orden.estado}</p>
            </Alert>

            <p className="text-center">N° de orden: {orden.id.slice(0, 8)}</p>

            <Table responsive className="bg-white">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {orden.items.map((item) => (
                        <tr key={item.productoId}>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>{formatearPrecio(item.subtotal)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2}>Total</th>
                        <th>{formatearPrecio(orden.total)}</th>
                    </tr>
                </tfoot>
            </Table>

            <div className="text-center">
                <Button as={Link} to="/productos" className="btn-primario">Seguir comprando</Button>
            </div>
        </Container>
    )
}

export default PagoCorrecto
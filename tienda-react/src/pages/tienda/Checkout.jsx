import { useState } from 'react'
import { listarProductos } from '../../data/productos.js'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Container, Table } from 'react-bootstrap'
import { obtenerSesion } from '../../data/auth.js'
import { crearOrden } from '../../data/ordenes.js'
import { armarItemsOrden } from '../../utils/carrito.js'
import { formatearPrecio } from '../../utils/formato.js'

function Checkout({ carrito, total, onVaciar, onActualizar }) {
    const navigate = useNavigate()
    const [aviso, setAviso] = useState('')
    const sesion = obtenerSesion()

    function confirmarCompra() {
        try {
            const catalogo = listarProductos()
            const actual = carrito.flatMap((item) => {
                const producto = catalogo.find((p) => p.id === item.id && p.activo !== false && p.stock > 0)
                return producto ? [{ ...producto, cantidad: Math.min(item.cantidad, producto.stock) }] : []
            })
            if (JSON.stringify(actual.map(i => [i.id, i.precio, i.cantidad])) !== JSON.stringify(carrito.map(i => [i.id, i.precio, i.cantidad]))) {
                onActualizar(actual)
                setAviso('El precio o la disponibilidad cambió. Actualizamos el pedido; revisa los artículos y el total antes de volver a confirmar.')
                return
            }
            const orden = crearOrden({
                usuarioId: sesion.id,
                totalEsperado: total,
                items: armarItemsOrden(carrito),
            })
            onVaciar()
            navigate('/pago-correcto', { state: { orden } })
        } catch (error) {
            navigate('/pago-error', { state: { mensaje: error.message } })
        }
    }

    if (!sesion) {
        return (
            <Container as="main" className="py-4">
                <Alert variant="warning" className="text-center">
                    Para comprar necesitas iniciar sesión. <Link to="/login" state={{ volver: "/checkout" }}>Iniciar sesión</Link> o{' '}
                    <Link to="/registro">crear una cuenta</Link>.
                </Alert>
            </Container>
        )
    }

    if (carrito.length === 0) {
        return (
            <Container as="main" className="py-4">
                <Alert variant="info" className="text-center">
                    Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
                </Alert>
            </Container>
        )
    }

    return (
        <Container as="main" className="py-4">
            <h2 className="text-center mb-4">Confirmar compra</h2>
            <p className="text-center">Comprador: {sesion.nombre} ({sesion.email})</p>

            {aviso && <Alert variant="warning" role="alert">{aviso}</Alert>}
            <Table responsive className="bg-white">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>{formatearPrecio(item.precio * item.cantidad)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2}>Total</th>
                        <th>{formatearPrecio(total)}</th>
                    </tr>
                </tfoot>
            </Table>

            <div className="d-flex justify-content-center flex-wrap gap-2">
                <Button as={Link} to="/carrito" className="btn-agregar">Volver al carrito</Button>
                <Button className="btn-primario" onClick={confirmarCompra}>Confirmar compra</Button>
            </div>
        </Container>
    )
}

export default Checkout
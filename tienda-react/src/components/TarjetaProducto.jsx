import { Card, Button } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'

function TarjetaProducto({ producto, onAgregar }) {
    const { nombre, precio, imagen, stock } = producto

    return (
        <Card className="tarjeta-producto h-100">
            <Card.Img variant="top" src={imagen} alt={nombre} className="imagen-producto" />
            <Card.Body className="d-flex flex-column text-center">
                <Card.Title>{nombre}</Card.Title>
                <Card.Text className="precio">{formatearPrecio(precio)}</Card.Text>
                <Card.Text className="stock-producto">
                    {stock > 0
                        ? `¡Nos ${stock === 1 ? 'queda 1 unidad' : `quedan ${stock} unidades`}, aprovecha!`
                        : 'Agotado por el momento'}
                </Card.Text>
                <Button
                    disabled={stock <= 0 || producto.activo === false}
                    className="btn-agregar mt-auto"
                    onClick={() => onAgregar && onAgregar(producto)}
                >
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    )
}

export default TarjetaProducto
import { useState } from 'react'
import { Row, Col, Alert, Button } from 'react-bootstrap'
import TarjetaProducto from './TarjetaProducto'

function Catalogo({ productos, onAgregar }) {
    const [categoria, setCategoria] = useState('Todos')

    const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))]

    const visibles =
        categoria === 'Todos'
            ? productos
            : productos.filter((p) => p.categoria === categoria)

    return (
        <>
            <div className="filtros d-flex flex-wrap justify-content-center gap-2 mb-4">
                {categorias.map((cat) => (
                    <Button
                        key={cat}
                        className={`btn-filtro ${cat === categoria ? 'activo' : ''}`}
                        onClick={() => setCategoria(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {visibles.length === 0 ? (
                <Alert variant="warning">No hay productos</Alert>
            ) : (
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {visibles.map((producto) => (
                        <Col key={producto.id}>
                            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default Catalogo
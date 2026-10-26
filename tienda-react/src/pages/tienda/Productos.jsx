import { Container } from 'react-bootstrap'
import Catalogo from '../../components/Catalogo.jsx'
import productos from '../../data/productos.js'

function Productos({ onAgregar }) {
    return (
        <Container as="main" className="py-4">
            <h2 className="mb-4 text-center">Nuestros Productos</h2>
            <Catalogo productos={productos} onAgregar={onAgregar} />
        </Container>
    )
}

export default Productos
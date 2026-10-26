import {Link} from "react-router-dom"
import {Container, Row, Col} from "react-bootstrap"

function PiePagina(){
    return(
        <footer className="pie">
            <Container fluid className="px-4">
                <Row className="g-4">
                    <Col md={4}>
                        <h3 className="pie-logo">Pasteleria Mil Sabores</h3>
                        <p>Desde 1950 endulzando tus momentos especiales.</p>
                    </Col>
                    <Col md={4}>
                        <h4>Enlaces</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/productos">Productos</Link></li>
                            <li><Link to="/nosotros">Nosotros</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h4>Contacto</h4>
                        <p className="mb-1">Av. Siempre Viva 123, Santiago</p>
                        <p>contacto@milsabores.cl</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default PiePagina
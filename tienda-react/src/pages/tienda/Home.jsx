import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Portada from '../../components/Portada.jsx'
import TarjetaProducto from '../../components/TarjetaProducto.jsx'
import { listarProductos } from '../../data/productos.js'

const idsFavoritos = ['torta-chocolate', 'cheesecake-frutos-rojos', 'macarons']

function Home({ onAgregar }) {
    const favoritos = listarProductos().filter((p) => idsFavoritos.includes(p.id))

    return (
        <>
            <Portada />

            <Container as="section" className="py-4">
                <h2 className="text-center mb-4">Nuestros Productos Favoritos</h2>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {favoritos.map((producto) => (
                        <Col key={producto.id}>
                            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <section className="historia">
                <Container>
                    <Row className="align-items-center g-4">
                        <Col md={5}>
                            <img src="/img/productos/tienda.jpg" alt="Fachada de la pastelería" className="img-fluid" />
                        </Col>
                        <Col md={7}>
                            <h2>Nuestra historia</h2>
                            <p>
                                Desde 1950, Pastelería Mil Sabores endulza los momentos más importantes de
                                nuestros clientes. Comenzamos como un pequeño local familiar y hoy seguimos
                                fieles a las mismas recetas artesanales, hechas con ingredientes de calidad
                                y mucho cariño.
                            </p>
                            <Button as={Link} to="/nosotros" className="btn-agregar">Conócenos más</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Home
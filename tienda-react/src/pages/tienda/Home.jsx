import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import Portada from '../../components/Portada.jsx'
import TarjetaProducto from '../../components/TarjetaProducto.jsx'
import { listarProductos } from '../../servicios/productos.js'
import { mensajeDeError } from '../../servicios/errores.js'

const idsFavoritos = ['torta-chocolate', 'cheesecake-frutos-rojos', 'macarons']

function Home() {
    const [favoritos, setFavoritos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignorar = false

        async function cargar() {
            try {
                const datos = await listarProductos()
                if (!ignorar) {
                    setFavoritos(datos.filter((p) => idsFavoritos.includes(p.id)))
                }
            } catch (e) {
                if (!ignorar) setError(mensajeDeError(e))
            } finally {
                if (!ignorar) setCargando(false)
            }
        }

        cargar()
        return () => {
            ignorar = true
        }
    }, [])

    return (
        <>
            <Portada />

            <Container as="section" className="py-4">
                <h2 className="text-center mb-4">Nuestros Productos Favoritos</h2>

                {cargando ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Row xs={1} sm={2} lg={3} className="g-4">
                        {favoritos.map((producto) => (
                            <Col key={producto.id}>
                                <TarjetaProducto producto={producto} />
                            </Col>
                        ))}
                    </Row>
                )}
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
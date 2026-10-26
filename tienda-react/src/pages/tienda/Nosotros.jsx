import { Container, Row, Col, Card } from "react-bootstrap";

const valores = [
    { icono: '🍰', titulo: 'Calidad', texto: 'Seleccionamos los mejores ingredientes para cada una de nuestras creaciones.' },
    { icono: '❤️', titulo: 'Tradición', texto: 'Recetas familiares transmitidas por más de tres generaciones.' },
    { icono: '✨', titulo: 'Innovación', texto: 'Combinamos técnicas tradicionales con nuevas tendencias de repostería.' },
]

function Nosotros(){
    return(
        <Container as="main" className="py-4">
            <h2 className="text-center mb-4">Nuestra Historia</h2>

            <section className="historia-caja mb-4">
                <Row className="align-items-center g-4">
                    <Col md={4}>
                        <img src="/img/productos/tienda.jpg" alt="Fachada de la pasteleria" className="img-fluid"/>
                    </Col>
                    <Col md={8}>
                        <h3>Desde 1950</h3>
                        <p>
                            Pastelería Mil Sabores nació como un pequeño local familiar en el corazón de
                            Santiago. Con el paso de los años, nos hemos convertido en un referente de la
                            repostería artesanal, manteniendo siempre la misma pasión y calidad de nuestras
                            primeras recetas.
                        </p>
                    </Col>
                </Row>
            </section>

            <Row xs={1} md={3} className="g-4 mb-4">
                {valores.map((valor) => (
                    <Col key={valor.titulo}>
                        <Card className="tarjeta-valor h-100 text-center">
                            <Card.Body>
                                <h4>{valor.icono} {valor.titulo}</h4>
                                <p className="mb-0">{valor.texto}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card className="tarjeta-rosada h-100">
                        <Card.Body>
                            <h4>Misión</h4>
                            <p className="mb-0">
                                Endulzar los momentos más importantes de nuestros clientes con productos de
                                la más alta calidad, elaborados con dedicación y amor.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="tarjeta-rosada h-100">
                        <Card.Body>
                            <h4>Visión</h4>
                            <p className="mb-0">
                                Ser la pastelería artesanal más reconocida de Chile, expandiendo nuestra
                                tradición a nuevas generaciones de amantes de la repostería.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Nosotros
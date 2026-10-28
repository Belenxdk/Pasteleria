import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { validarContacto } from '../../utils/contacto.js'

const vacio = { nombre: '', correo: '', telefono: '', asunto: '', mensaje: '' }

function Contacto() {
    const [datos, setDatos] = useState(vacio)
    const [errores, setErrores] = useState({})
    const [enviado, setEnviado] = useState(false)

    function cambiar(evento) {
        const { name, value } = evento.target
        setDatos((actual) => ({ ...actual, [name]: value }))
    }

    function enviar(evento) {
        evento.preventDefault()
        const nuevosErrores = validarContacto(datos)
        setErrores(nuevosErrores)

        if (Object.keys(nuevosErrores).length === 0) {
            setEnviado(true)
            setDatos(vacio)
        } else {
            setEnviado(false)
        }
    }

    return (
        <Container as="main" className="py-4">
            <h2 className="text-center mb-2">Contáctanos</h2>
            <p className="text-center mb-4">
                ¿Tienes dudas o quieres hacer un pedido especial? Escríbenos.
            </p>

            <Row className="g-4">
                <Col lg={7}>
                    <Form noValidate onSubmit={enviar} className="caja-contacto">
                        {enviado && (
                            <Alert variant="success">
                                ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
                            </Alert>
                        )}

                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                                name="nombre"
                                value={datos.nombre}
                                onChange={cambiar}
                                placeholder="Ej: María González"
                                isInvalid={Boolean(errores.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={datos.correo}
                                onChange={cambiar}
                                placeholder="ejemplo@correo.com"
                                isInvalid={Boolean(errores.correo)}
                            />
                            <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Teléfono (opcional)</Form.Label>
                            <Form.Control
                                name="telefono"
                                value={datos.telefono}
                                onChange={cambiar}
                                placeholder="+56 9 1234 5678"
                                isInvalid={Boolean(errores.telefono)}
                            />
                            <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="asunto">
                            <Form.Label>Asunto</Form.Label>
                            <Form.Control
                                name="asunto"
                                value={datos.asunto}
                                onChange={cambiar}
                                placeholder="Ej: Consulta por pedido especial"
                                isInvalid={Boolean(errores.asunto)}
                            />
                            <Form.Control.Feedback type="invalid">{errores.asunto}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="mensaje">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="mensaje"
                                value={datos.mensaje}
                                onChange={cambiar}
                                placeholder="Escribe tu mensaje..."
                                isInvalid={Boolean(errores.mensaje)}
                            />
                            <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="btn-primario w-100">Enviar mensaje</Button>
                    </Form>
                </Col>

                <Col lg={5}>
                    <div className="caja-contacto">
                        <h4>Información de contacto</h4>
                        <ul className="lista-contacto">
                            <li>📍 Av. Siempre Viva 123, Santiago</li>
                            <li>📞 +56 9 1234 5678</li>
                            <li>✉️ contacto@milsabores.cl</li>
                            <li>🕒 Lunes a Sábado: 9:00 - 20:00</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Contacto
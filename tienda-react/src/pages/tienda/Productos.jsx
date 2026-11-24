import { estaEnOferta } from '../../utils/ofertas.js'
import { useEffect, useState } from 'react'
import { Container, Spinner, Alert, Button } from 'react-bootstrap'
import Catalogo from '../../components/Catalogo.jsx'
import { listarProductos } from '../../servicios/productos.js'
import { mensajeDeError } from '../../servicios/errores.js'

function Productos({ soloOfertas = false }) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [intento, setIntento] = useState(0)

    useEffect(() => {
        let ignorar = false

        async function cargar() {
            setCargando(true)
            setError(null)
            try {
                const datos = await listarProductos()
                if (!ignorar) setProductos(datos)
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
    }, [intento])

    return (
        <Container as="main" className="py-4">
            <h2 className="mb-4 text-center">{soloOfertas ? "Ofertas" : "Nuestros Productos"}</h2>

            {cargando ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status" />
                    <p className="mt-2">Cargando productos…</p>
                </div>
            ) : error ? (
                <Alert variant="danger">
                    <Alert.Heading>No pudimos cargar los productos</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={() => setIntento((n) => n + 1)}>
                        Reintentar
                    </Button>
                </Alert>
            ) : (
                <Catalogo
                    productos={productos.filter(p => p.activo !== false && (!soloOfertas || estaEnOferta(p)))}
                />
            )}
        </Container>
    )
}

export default Productos
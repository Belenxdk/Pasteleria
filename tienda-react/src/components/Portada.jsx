import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Portada() {
    return (
        <header id="inicio" className="portada">
            <div className="portada-contenido">
                <h1>Endulzamos tus momentos especiales</h1>
                <p>
                    Repostería artesanal hecha con amor desde 1950. Tortas, pasteles y postres para cada ocasión.
                </p>
                <Button as={Link} to="/productos" className="btn-primario">Ver productos</Button>
            </div>
        </header>
    )
}

export default Portada
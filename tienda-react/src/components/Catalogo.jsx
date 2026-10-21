import { Row, Col, Alert } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
function Catalogo({productos}){
    if (productos.length === 0){
        return <Alert variant="warning">No hay productos</Alert>
    }
    return(
        <Row xs={1} sm={2} lg={3} className="g-4">
            {productos.map((producto) => (
                <Col key={producto.id}>
                    <TarjetaProducto producto={producto} />
                </Col>
            ))}
        </Row>

    )
    
    
}

export default Catalogo
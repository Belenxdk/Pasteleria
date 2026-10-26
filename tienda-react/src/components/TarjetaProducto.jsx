import {Card, Button, Badge} from 'react-bootstrap'
import { formatearPrecio } from "../utils/formato.js";


function TarjetaProducto({producto}){
    const {nombre, categoria,precio,imagen} = producto

    return(
        <Card className='h-100 shadow-sm'>
            <Card.Img variant="top" src={imagen} alt={nombre} className="imagen-producto" />
             <Card.Body className="d-flex flex-column">
                 <Badge bg="secondary" className="align-self-start mb-2">
                    {categoria}
                 </Badge>
                 <Card.Title>{nombre}</Card.Title>
                 <Card.Text className="fs-5 fw-semibold">{formatearPrecio(precio)}</Card.Text>
                 <Button className="mt-auto" variant="dark">
                    Agregar al Carrito
                 </Button>
             </Card.Body>
        </Card>
    )
}

export default TarjetaProducto
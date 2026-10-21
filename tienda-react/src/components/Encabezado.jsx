import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Encabezado() {
    return(
        <Navbar bg="dark" data-bs-theme="dark" expand="md" sticky="top">
            <Container>
                <Navbar.Brand href="#inicio">🎂 Pastelería Mil Sabores</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="me-auto">
                        <Nav.Link href="#inicio">Inicio</Nav.Link>
                        <Nav.Link href="#productos">Productos</Nav.Link>
                        <Nav.Link href="#nosotros">Nosotros</Nav.Link>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                        <Nav.Link href="#contacto">Contacto</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" className="me-2">Iniciar sesión</Button>
                    <Button variant="outline-light">🛒 Carrito</Button>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    
}

export default Encabezado
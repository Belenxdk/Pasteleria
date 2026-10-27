import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Encabezado({ cantidad = 0 }) {
    return (
        <Navbar bg="white" expand="md" sticky="top" className="encabezado shadow-sm" collapseOnSelect>
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="logo">
                    Pastelería <span>Mil Sabores</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="mx-auto gap-md-3">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Administración</Nav.Link>
                    </Nav>
                    <Nav.Link as={Link} to="/registro" className="me-3">Crear cuenta</Nav.Link>
                    <Button as={Link} to="/login" variant="outline-dark" className="btn-login me-3">
                        Iniciar sesión
                    </Button>
                    <Button as={Link} to="/carrito" variant="link" className="carrito">
                        🛒 {cantidad}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Encabezado
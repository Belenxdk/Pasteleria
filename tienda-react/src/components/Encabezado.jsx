import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Encabezado() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      sticky="top"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          🎂 Pastelería Mil Sabores
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" eventKey="inicio">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/productos" eventKey="productos">
              Productos
            </Nav.Link>

            <Nav.Link as={Link} to="/admin" eventKey="admin">
              Panel administrador
            </Nav.Link>
          </Nav>

          <Nav className="gap-2">
            <Nav.Link
              as={Link}
              to="/registro"
              eventKey="registro"
              className="btn btn-outline-light px-3"
            >
              Crear cuenta
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              eventKey="login"
              className="btn btn-outline-light px-3"
            >
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
import { useEffect, useState } from "react";
import { obtenerSesion, cerrarSesion } from "../data/auth.js";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Encabezado({ cantidad = 0 }) {
    const [sesion, setSesion] = useState(obtenerSesion);
    const [menu, setMenu] = useState({ abierto: false, ruta: "" });
    const location = useLocation();
    useEffect(() => {
        const actualizar = () => setSesion(obtenerSesion());
        window.addEventListener('sesion-cambiada', actualizar);
        return () => window.removeEventListener('sesion-cambiada', actualizar);
    }, []);
    const expandido = menu.abierto && menu.ruta === location.pathname;
    const setExpandido = (abierto) => setMenu({ abierto, ruta: location.pathname });
    return (
        <Navbar expanded={expandido} onToggle={setExpandido} bg="white" expand="xxl" sticky="top" className="encabezado shadow-sm" collapseOnSelect>
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="logo">
                    Pastelería <span>Mil Sabores</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="mx-auto gap-xxl-3">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        {sesion?.rol === "admin" && <Nav.Link as={NavLink} to="/admin">Administración</Nav.Link>}
                    </Nav>
                    {!sesion && <><Nav.Link as={Link} to="/registro" className="me-3">Crear cuenta</Nav.Link>
                    <Button as={Link} to="/login" variant="outline-dark" className="btn-login me-3">
                        Iniciar sesión
                    </Button>
                    </>}
                    {sesion && <div className="d-flex flex-wrap align-items-center gap-2 me-3">
                        <Link to="/login" className="nav-link">Mi cuenta</Link>
                        <Button variant="outline-dark" className="btn-login" onClick={() => { cerrarSesion(); setExpandido(false); }}>Cerrar sesión</Button>
                    </div>}
                    <Button as={Link} to="/carrito" aria-label={`Carrito: ${cantidad} unidades`} variant="link" className="carrito">
                        🛒 {cantidad}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Encabezado
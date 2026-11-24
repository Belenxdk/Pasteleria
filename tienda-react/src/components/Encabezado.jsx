import { useCarrito } from '../context/CartContext.jsx';
import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { obtenerSesion, cerrarSesion } from "../data/auth.js";

function Encabezado() {
    const { cantidad } = useCarrito();
    const [sesion, setSesion] = useState(() => obtenerSesion());
    const navegar = useNavigate();

    useEffect(() => {
        function actualizar() {
            setSesion(obtenerSesion());
        }
        window.addEventListener("sesion-cambiada", actualizar);
        return () => window.removeEventListener("sesion-cambiada", actualizar);
    }, []);

    const puedeAdministrar = sesion?.rol === "ADMIN" || sesion?.rol === "VENDEDOR";

    function salir() {
        cerrarSesion();
        navegar("/");
    }

    return (
        <Navbar bg="white" expand="xl" sticky="top" className="encabezado shadow-sm" collapseOnSelect>
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="logo">
                    Pastelería <span>Mil Sabores</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="mx-auto gap-lg-3">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
                        <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        {puedeAdministrar && (
                            <Nav.Link as={NavLink} to="/admin">Administración</Nav.Link>
                        )}
                    </Nav>
                    {sesion ? (
                        <>
                            <span className="me-3">Hola, {sesion.nombre}</span>
                            <Button variant="outline-dark" className="btn-login me-3" onClick={salir}>
                                Cerrar sesión
                            </Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/registro" className="me-3">Crear cuenta</Nav.Link>
                            <Button as={Link} to="/login" variant="outline-dark" className="btn-login me-3">
                                Iniciar sesión
                            </Button>
                        </>
                    )}
                    <Button as={Link} to="/carrito" variant="link" className="carrito">
                        🛒 {cantidad}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Encabezado
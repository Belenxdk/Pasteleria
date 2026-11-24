import { Routes, Route, Link } from 'react-router-dom'
import Encabezado from './components/Encabezado.jsx'
import PiePagina from './components/PiePagina.jsx'
import Home from './pages/tienda/Home.jsx'
import Productos from './pages/tienda/Productos.jsx'
import DetalleProducto from './pages/tienda/DetalleProducto.jsx'
import Blog from './pages/tienda/Blog.jsx'
import BlogDetalle from './pages/tienda/BlogDetalle.jsx'
import Nosotros from './pages/tienda/Nosotros.jsx'
import Carrito from './pages/tienda/Carrito.jsx'
import Checkout from './pages/tienda/Checkout.jsx'
import PagoCorrecto from './pages/tienda/PagoCorrecto.jsx'
import PagoError from './pages/tienda/PagoError.jsx'
import Contacto from './pages/tienda/Contacto.jsx'
import Login from './pages/auth/Login.jsx'
import Registro from './pages/auth/Registro.jsx'
import RutaAdmin from './pages/admin/RutaAdmin.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductosAdmin from './pages/admin/ProductosAdmin.jsx'
import UsuariosAdmin from './pages/admin/UsuariosAdmin.jsx'
import OrdenesAdmin from './pages/admin/OrdenesAdmin.jsx'
import { CartProvider } from './context/CartContext.jsx'
export default function App() {
  return <CartProvider>
    <Encabezado />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<DetalleProducto />} />
      <Route path="/ofertas" element={<Productos soloOfertas />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetalle />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pago-correcto" element={<PagoCorrecto />} />
      <Route path="/pago-error" element={<PagoError />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/admin" element={<RutaAdmin roles={['ADMIN','VENDEDOR']}><Dashboard /></RutaAdmin>} />
      <Route path="/admin/productos" element={<RutaAdmin roles={['ADMIN','VENDEDOR']}><ProductosAdmin /></RutaAdmin>} />
      <Route path="/admin/usuarios" element={<RutaAdmin roles={['ADMIN']}><UsuariosAdmin /></RutaAdmin>} />
      <Route path="/admin/ordenes" element={<RutaAdmin roles={['ADMIN','VENDEDOR']}><OrdenesAdmin /></RutaAdmin>} />
      <Route path="*" element={<main className="container py-4"><h2>Página no encontrada</h2><Link to="/">Volver al inicio</Link></main>} />
    </Routes>
    <PiePagina />
  </CartProvider>
}

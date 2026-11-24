import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCarrito } from '../context/CartContext.jsx'
import TarjetaProducto from '../components/TarjetaProducto.jsx'
import Catalogo from '../components/Catalogo.jsx'
import Carrito from '../pages/tienda/Carrito.jsx'
import Contacto from '../pages/tienda/Contacto.jsx'
import Blog from '../pages/tienda/Blog.jsx'
import BlogDetalle from '../pages/tienda/BlogDetalle.jsx'
import DetalleProducto from '../pages/tienda/DetalleProducto.jsx'
import api from '../servicios/api.js'
const torta = { id: 'torta', nombre: 'Torta de prueba', categoria: 'Tortas', precio: 9000, precioAnterior: 10000, stock: 2, imagen: '/torta.jpg', descripcion: 'Torta artesanal', activo: true }
const macaron = { ...torta, id: 'macaron', nombre: 'Macaron de prueba', categoria: 'Individual', precioAnterior: null }
function Contador() { const { cantidad } = useCarrito(); return <output aria-label="Unidades">{cantidad}</output> }
function montar(ui, ruta = '/') { return render(<MemoryRouter initialEntries={[ruta]}><CartProvider>{ui}</CartProvider></MemoryRouter>) }
describe('Componentes React de Mil Sabores', () => {
  let almacen
  beforeEach(() => { almacen = {}; spyOn(Storage.prototype, 'getItem').and.callFake(k => almacen[k] ?? null); spyOn(Storage.prototype, 'setItem').and.callFake((k, v) => { almacen[k] = v }) })
  afterEach(() => cleanup())
  it('renderiza tarjeta con nombre, descuento y enlace de detalle', () => {
    montar(<TarjetaProducto producto={torta} />)
    expect(screen.getByText(torta.nombre)).toBeTruthy()
    expect(screen.getByText('-10%')).toBeTruthy()
    expect(screen.getByRole('link', {name: 'Ver detalle'}).getAttribute('href')).toBe('/productos/torta')
  })
  it('agrega al contexto y respeta el stock', () => {
    montar(<><TarjetaProducto producto={torta}/><Contador/></>)
    fireEvent.click(screen.getByRole('button', {name:'Agregar al carrito'}))
    fireEvent.click(screen.getByRole('button', {name:'Agregar al carrito'}))
    expect(screen.getByLabelText('Unidades').textContent).toBe('2')
    expect(screen.getByRole('button', {name:'Sin unidades disponibles'}).disabled).toBeTrue()
  })
  it('filtra productos por categoría', () => {
    montar(<Catalogo productos={[torta, macaron]} />)
    fireEvent.click(screen.getByRole('button', {name:'Individual'}))
    expect(screen.queryByText(torta.nombre)).toBeNull()
    expect(screen.getByText(macaron.nombre)).toBeTruthy()
  })
  it('muestra carrito vacío', () => {
    montar(<Carrito />)
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })
  it('actualiza y elimina unidades en la pantalla del carrito', () => {
    montar(<><TarjetaProducto producto={torta}/><Carrito/><Contador/></>)
    fireEvent.click(screen.getByRole('button', {name:'Agregar al carrito'}))
    fireEvent.click(screen.getByRole('button', {name:'Aumentar'}))
    expect(screen.getByLabelText('Unidades').textContent).toBe('2')
    fireEvent.click(screen.getByRole('button', {name:`Eliminar ${torta.nombre}`}))
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })
  it('valida campos del formulario de contacto vacío', () => {
    montar(<Contacto />)
    fireEvent.click(screen.getByRole('button', {name:'Enviar mensaje'}))
    expect(screen.getByText(/Ingresa un correo válido/)).toBeTruthy()
    expect(screen.getByText(/Ingresa tu nombre completo/)).toBeTruthy()
  })
  it('acepta datos válidos en formulario de contacto', () => {
    montar(<Contacto />)
    for (const [label, value] of [['Nombre completo','Cliente Prueba'],['Correo electrónico','cliente@example.com'],['Asunto','Pedido'],['Mensaje','Consulta por una torta de chocolate']]) fireEvent.change(screen.getByLabelText(label), { target: { value } })
    fireEvent.click(screen.getByRole('button', {name:'Enviar mensaje'}))
    expect(screen.getByText(/Gracias/)).toBeTruthy()
  })
  it('navega desde blog hacia el artículo', () => {
    montar(<Routes><Route path="/blog" element={<Blog/>}/><Route path="/blog/:id" element={<BlogDetalle/>}/></Routes>, '/blog')
    fireEvent.click(screen.getAllByRole('link',{name:'Leer más'})[0])
    expect(screen.getByRole('heading',{name:'Cómo elegir la torta perfecta para tu evento'})).toBeTruthy()
  })
  it('carga el detalle desde la API simulada', async () => {
    spyOn(api, 'get').and.resolveTo({data:torta})
    montar(<Routes><Route path="/productos/:id" element={<DetalleProducto/>}/></Routes>, '/productos/torta')
    await waitFor(() => expect(screen.getByText('Torta artesanal')).toBeTruthy())
    expect(api.get).toHaveBeenCalledWith('/productos/torta')
    expect(screen.getByText('Stock disponible: 2')).toBeTruthy()
  })
  it('muestra error de producto cuando la API falla', async () => {
    spyOn(api, 'get').and.rejectWith(new Error('Producto no encontrado'))
    montar(<Routes><Route path="/productos/:id" element={<DetalleProducto/>}/></Routes>, '/productos/inexistente')
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
  })
})

import { Container } from 'react-bootstrap'

import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Catalogo from './components/Catalogo.jsx'
import PiePagina from './components/PiePagina.jsx'
import productos from './data/productos.js'


function App() {
  return (
    <>
      <Encabezado />
      <Portada />

      <Container as="main" id="productos">
        <h2 className="mb-3">Nuestros Productos</h2>
        <Catalogo productos={productos} />
      </Container>

      <PiePagina />
    </>
  )
}

export default App
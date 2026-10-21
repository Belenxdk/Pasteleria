import { Container} from 'react-bootstrap'
import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import PiePagina from './components/PiePagina.jsx'

function App() {
  return (
    <>
      <Encabezado/>
      <Portada/>
      <Container as= 'main' id='productos'>
        <h2 className='mb-3'>Nuestros Productos</h2>
        <p className='text-muted'> aqui ira el catalogo</p>
      </Container>
    
    </>

  )
}

export default App
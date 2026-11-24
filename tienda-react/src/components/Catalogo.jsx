import { Row, Col, Alert, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import TarjetaProducto from './TarjetaProducto.jsx'
export default function Catalogo({ productos }) {
  const [params, setParams] = useSearchParams()
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))]
  const categoria = params.get('categoria') || 'Todos'
  const visibles = categoria === 'Todos' ? productos : productos.filter(p => p.categoria === categoria)
  function filtrar(cat) { const siguiente = new URLSearchParams(params); if (cat === 'Todos') siguiente.delete('categoria'); else siguiente.set('categoria', cat); setParams(siguiente) }
  return <>
    <div className="filtros d-flex flex-wrap justify-content-center gap-2 mb-4" aria-label="Categorías">
      {categorias.map(cat => <Button key={cat} aria-pressed={categoria === cat} className={`btn-filtro ${cat === categoria ? 'activo' : ''}`} onClick={() => filtrar(cat)}>{cat}</Button>)}
    </div>
    {!visibles.length ? <Alert variant="warning">No hay productos en esta categoría.</Alert> : <Row xs={1} sm={2} lg={3} className="g-4">{visibles.map(p => <Col key={p.id}><TarjetaProducto producto={p} /></Col>)}</Row>}
  </>
}

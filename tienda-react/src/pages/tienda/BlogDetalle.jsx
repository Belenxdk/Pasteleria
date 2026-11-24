import { Link, useParams } from 'react-router-dom'
import { Alert, Container } from 'react-bootstrap'
import { articulos } from '../../data/articulos.js'
export default function BlogDetalle() {
  const { id } = useParams()
  const a = articulos.find(item => item.id === id)
  return <Container as="main" className="py-4"><Link to="/blog">Volver al blog</Link>{!a ? <Alert variant="warning" className="mt-3">Artículo no encontrado.</Alert> : <article className="blog-articulo mt-3"><small>{a.fecha}</small><h1>{a.titulo}</h1><img className="img-fluid detalle-imagen mb-4" src={a.imagen} alt={a.titulo} /><p>{a.introduccion}</p>{a.secciones.map(([titulo, texto]) => <section key={titulo}><h2>{titulo}</h2><p>{texto}</p></section>)}<p>{a.cierre}</p></article>}</Container>
}

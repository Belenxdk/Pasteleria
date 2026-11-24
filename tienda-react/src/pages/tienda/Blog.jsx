import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { articulos } from '../../data/articulos.js'
export default function Blog() {
  return <Container as="main" className="py-4"><h1 className="text-center">Nuestro Blog</h1><p className="text-center mb-4">Consejos, historias y novedades del mundo de la repostería.</p><Row xs={1} md={2} className="g-4">{articulos.map(a => <Col key={a.id}><Card as="article" className="tarjeta-producto h-100"><Card.Img className="imagen-producto" src={a.imagen} alt={a.titulo} /><Card.Body className="d-flex flex-column"><small>{a.fecha}</small><Card.Title as="h2">{a.titulo}</Card.Title><Card.Text>{a.resumen}</Card.Text><Link to={`/blog/${a.id}`} className="btn btn-primary btn-agregar mt-auto">Leer más</Link></Card.Body></Card></Col>)}</Row></Container>
}


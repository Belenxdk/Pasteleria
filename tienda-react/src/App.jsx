import Encabezado from './components/Encabezado.jsx'
import ProductosAdmin from './pages/admin/ProductosAdmin.jsx'

function App() {
  const tienda = 'Pastelería Mil Sabores'
  const equipo = 'Belén Conalef y Eduardo'
  const anio = 2026

    return (
    <>
      <Encabezado />
      <main className="contenedor">
        <h1>🎂 {tienda}</h1>
        <p>
          Mi primer proyecto con <strong>React + Vite</strong>.
        </p>
        <p className="pie">
          {equipo} · DSY1104 · {anio}
        </p>
      </main>

      <ProductosAdmin />
    </>
  )
}

export default App
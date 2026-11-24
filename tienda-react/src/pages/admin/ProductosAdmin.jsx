import { useEffect, useState } from "react";
import { obtenerSesion } from "../../data/auth.js";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../servicios/productos.js";
import { mensajeDeError } from "../../servicios/errores.js";

function textoDeError(e) {
  const base = mensajeDeError(e);
  const campos = e.response?.data?.campos;
  if (campos && Object.keys(campos).length > 0) {
    return `${base}: ${Object.values(campos).join(". ")}`;
  }
  return base;
}

function ProductosAdmin() {
  const esAdmin = obtenerSesion()?.rol === "ADMIN";

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Tortas");
  const [precio, setPrecio] = useState("");
  const [precioAnterior, setPrecioAnterior] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("/img/productos/tortaChocolate.jpg");

  async function recargar() {
    try {
      const datos = await listarProductos();
      setProductos(datos);
    } catch (e) {
      setError(textoDeError(e));
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    recargar();
  }, []);

  function limpiarFormulario() {
    setEditando(null);
    setNombre("");
    setCategoria("Tortas");
    setPrecio("");
    setPrecioAnterior("");
    setDescripcion("");
    setStock("");
    setImagen("/img/productos/tortaChocolate.jpg");
  }

  function manejarEditar(producto) {
    setEditando(producto);
    setNombre(producto.nombre);
    setCategoria(producto.categoria);
    setPrecio(String(producto.precio));
    setPrecioAnterior(producto.precioAnterior == null ? "" : String(producto.precioAnterior));
    setDescripcion(producto.descripcion ?? "");
    setStock(String(producto.stock));
    setImagen(producto.imagen);
    setMensaje("");
    setError("");
  }

  function cancelarEdicion() {
    limpiarFormulario();
    setMensaje("");
    setError("");
  }

  async function manejarGuardar(evento) {
    evento.preventDefault();
    setMensaje("");
    setError("");

    if (precio.trim() === "" || stock.trim() === "") {
      setError("Completa el precio y el stock.");
      return;
    }

    if (precioAnterior !== "" && (!Number.isInteger(Number(precioAnterior)) || Number(precioAnterior) <= Number(precio))) {
      setError("El precio anterior debe ser mayor que el precio actual.");
      return;
    }

    const datos = {
      nombre: nombre.trim(),
      categoria,
      precio: Number(precio),
      precioAnterior: precioAnterior === "" ? null : Number(precioAnterior),
      descripcion: descripcion.trim(),
      stock: Number(stock),
      imagen: imagen.trim(),
    };

    setGuardando(true);
    try {
      if (editando !== null) {
        await actualizarProducto(editando.id, {
          ...datos,
          activo: editando.activo ?? true,
        });
        setMensaje("Producto actualizado correctamente.");
      } else {
        await crearProducto({ ...datos, activo: true });
        setMensaje("Producto creado correctamente.");
      }
      limpiarFormulario();
      await recargar();
    } catch (e) {
      setError(textoDeError(e));
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(producto) {
    const confirmar = window.confirm(`¿Quieres eliminar "${producto.nombre}"?`);

    if (!confirmar) return;

    setMensaje("");
    setError("");

    try {
      await eliminarProducto(producto.id);

      if (editando !== null && editando.id === producto.id) {
        limpiarFormulario();
      }

      setMensaje("Producto eliminado correctamente.");
      await recargar();
    } catch (e) {
      setError(textoDeError(e));
    }
  }

  return (
    <section className="container py-4">
      <h2>{esAdmin ? "Administración de productos" : "Productos"}</h2>
      <p>Productos registrados: {productos.length}</p>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {esAdmin && (
        <form onSubmit={manejarGuardar} className="card card-body mb-4">
          <h3>{editando !== null ? "Editar producto" : "Agregar producto"}</h3>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="categoria" className="form-label">
                Categoría
              </label>
              <select
                id="categoria"
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="Tortas">Tortas</option>
                <option value="Pastelería Individual">Pastelería Individual</option>
                <option value="Sin Azúcar">Sin Azúcar</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="precio" className="form-label">
                Precio en pesos
              </label>
              <input
                id="precio"
                type="number"
                min="1"
                step="1"
                className="form-control"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="precioAnterior" className="form-label">Precio anterior (opcional, para ofertas)</label>
              <input id="precioAnterior" type="number" min="1" step="1" className="form-control" value={precioAnterior} onChange={e => setPrecioAnterior(e.target.value)} />
              <small>El precio actual es el que paga el cliente. Dejar vacío para quitar la oferta.</small>
            </div>
            <div className="col-12">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <textarea id="descripcion" className="form-control" maxLength={300} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>
            <div className="col-12">
              <label htmlFor="imagen" className="form-label">
                Ruta de la imagen
              </label>
              <input
                id="imagen"
                type="text"
                className="form-control"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="/img/productos/tortaChocolate.jpg"
                required
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-success me-2" disabled={guardando}>
                {guardando
                  ? "Guardando…"
                  : editando !== null
                  ? "Guardar cambios"
                  : "Crear producto"}
              </button>

              {editando !== null && (
                <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                  Cancelar edición
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      {cargando ? (
        <p className="text-center">Cargando productos…</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                {esAdmin && <th scope="col">Acciones</th>}
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      width="70"
                      height="70"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>

                  <td>
                    {producto.precio.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </td>

                  <td>{producto.stock}</td>

                  {esAdmin && (
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => manejarEditar(producto)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => manejarEliminar(producto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}

              {productos.length === 0 && (
                <tr>
                  <td colSpan={esAdmin ? 6 : 5} className="text-center">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ProductosAdmin;
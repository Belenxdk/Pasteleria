import { useState } from "react";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../data/productos.js";

function ProductosAdmin() {
  const [productos, setProductos] = useState(() => listarProductos());
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Tortas");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(
    "/img/productos/tortaChocolate.jpg"
  );

  function limpiarFormulario() {
    setIdEditando(null);
    setNombre("");
    setCategoria("Tortas");
    setPrecio("");
    setStock("");
    setImagen("/img/productos/tortaChocolate.jpg");
  }

  function manejarEditar(producto) {
    setIdEditando(producto.id);
    setNombre(producto.nombre);
    setCategoria(producto.categoria);
    setPrecio(String(producto.precio));
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

  function manejarGuardar(evento) {
    evento.preventDefault();
    setMensaje("");
    setError("");

    const datos = {
      nombre: nombre.trim(),
      categoria,
      precio: Number(precio),
      stock: Number(stock),
      imagen: imagen.trim(),
    };

    try {
      if (precio.trim() === "" || stock.trim() === "") {
        throw new Error("Completa el precio y el stock.");
      }

      if (idEditando !== null) {
        actualizarProducto(idEditando, datos);
      } else {
        crearProducto({
          ...datos,
          descripcion: "",
        });
      }

      setProductos(listarProductos());
      setMensaje(
        idEditando !== null
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente."
      );
      limpiarFormulario();
    } catch (error) {
      setError(error.message);
    }
  }

  function manejarEliminar(producto) {
    const confirmar = window.confirm(
      `¿Quieres eliminar "${producto.nombre}"?`
    );

    if (!confirmar) return;

    setMensaje("");
    setError("");

    try {
      eliminarProducto(producto.id);

      if (idEditando === producto.id) {
        limpiarFormulario();
      }

      setProductos(listarProductos());
      setMensaje("Producto eliminado correctamente.");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="container py-4">
      <h2>Administración de productos</h2>
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

      <form
        onSubmit={manejarGuardar}
        className="card card-body mb-4"
      >
        <h3>
          {idEditando !== null ? "Editar producto" : "Agregar producto"}
        </h3>

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
              <option value="Pastelería Individual">
                Pastelería Individual
              </option>
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
            <button
              type="submit"
              className="btn btn-success me-2"
            >
              {idEditando !== null
                ? "Guardar cambios"
                : "Crear producto"}
            </button>

            {idEditando !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelarEdicion}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
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
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No hay productos registrados. Agrega uno con el
                  formulario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductosAdmin;
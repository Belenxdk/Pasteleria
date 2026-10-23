import { useState } from "react";
import { Link } from "react-router-dom";
import {
  listarOrdenes,
  actualizarEstadoOrden,
  ESTADOS_ORDEN,
} from "../../data/ordenes.js";
import CrearOrdenPrueba from "./CrearOrdenPrueba.jsx";

function formatoPrecio(valor) {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
}

function OrdenesAdmin() {
  const [ordenes, setOrdenes] = useState(() => listarOrdenes());
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const seleccionada = ordenes.find(
    (orden) => orden.id === idSeleccionado
  );

  function manejarCambioEstado(id, nuevoEstado) {
    setMensaje("");
    setError("");

    try {
      actualizarEstadoOrden(id, nuevoEstado);
      setOrdenes(listarOrdenes());
      setMensaje("Estado actualizado correctamente.");
    } catch (error) {
      setError(error.message);
    }
  }

  function actualizarLista() {
    setMensaje("");
    setError("");

    try {
      setOrdenes(listarOrdenes());
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="container py-4">
      <CrearOrdenPrueba />

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2>Administración de órdenes</h2>
          <p className="mb-0">
            Órdenes registradas: {ordenes.length}
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={actualizarLista}
          >
            Actualizar lista
          </button>

          <Link to="/admin" className="btn btn-outline-secondary">
            Volver al panel
          </Link>
        </div>
      </div>

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

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Orden</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Detalle</th>
            </tr>
          </thead>

          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td title={orden.id}>
                  {orden.id.slice(0, 8)}
                </td>

                <td>
                  {new Date(orden.fecha).toLocaleString("es-CL")}
                </td>

                <td>{orden.cliente}</td>

                <td>{formatoPrecio(orden.total)}</td>

                <td>
                  <select
                    className="form-select"
                    value={orden.estado}
                    aria-label={`Estado de la orden ${orden.id}`}
                    onChange={(e) =>
                      manejarCambioEstado(orden.id, e.target.value)
                    }
                  >
                    {ESTADOS_ORDEN.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setIdSeleccionado(orden.id)}
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}

            {ordenes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  Todavía no hay órdenes registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {seleccionada && (
        <div className="card mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
              <h3 className="h4 mb-0">Detalle de la orden</h3>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIdSeleccionado(null)}
              >
                Cerrar detalle
              </button>
            </div>

            <p className="text-break">
              <strong>Identificador:</strong> {seleccionada.id}
            </p>

            <p>
              <strong>Cliente:</strong> {seleccionada.cliente}
            </p>

            <p>
              <strong>Correo:</strong> {seleccionada.email}
            </p>

            <p>
              <strong>Dirección:</strong> {seleccionada.direccion}
            </p>

            <p>
              <strong>Estado:</strong> {seleccionada.estado}
            </p>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {seleccionada.items.map((item) => (
                    <tr key={item.productoId}>
                      <td>{item.nombre}</td>
                      <td>{formatoPrecio(item.precioUnitario)}</td>
                      <td>{item.cantidad}</td>
                      <td>{formatoPrecio(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="fs-5 mb-0">
              <strong>
                Total: {formatoPrecio(seleccionada.total)}
              </strong>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdenesAdmin;
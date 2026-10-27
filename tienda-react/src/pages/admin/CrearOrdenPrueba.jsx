import { useState } from "react";
import { crearOrden } from "../../data/ordenes.js";
import { listarUsuarios } from "../../data/usuarios.js";
import { listarProductos } from "../../data/productos.js";

function CrearOrdenPrueba() {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function crearPrueba() {
    setMensaje("");
    setError("");

    try {
      const cliente = listarUsuarios().find(
        (usuario) => usuario.rol === "cliente"
      );

      const producto = listarProductos().find(
        (producto) => producto.activo !== false && producto.stock >= 2
      );

      if (!cliente) {
        throw new Error("Primero registra un cliente ficticio.");
      }

      if (!producto) {
        throw new Error("Necesitas un producto activo con stock de al menos 2.");
      }

      const orden = crearOrden({
        usuarioId: cliente.id,
        items: [
          {
            productoId: producto.id,
            cantidad: 2,
          },
        ],
      });

      setMensaje(
        `Orden ${orden.id.slice(0, 8)} creada para ${cliente.nombre}. Presiona Actualizar lista.`
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="card card-body mb-3">
      <h3 className="h5">Prueba de desarrollo</h3>

      <p>
        Crea una orden con el primer cliente registrado y dos unidades
        de un producto disponible.
      </p>

      <button
        type="button"
        className="btn btn-outline-primary align-self-start"
        onClick={crearPrueba}
      >
        Crear orden de prueba
      </button>

      {mensaje && (
        <p className="text-success mt-2 mb-0" role="status">
          {mensaje}
        </p>
      )}

      {error && (
        <p className="text-danger mt-2 mb-0" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CrearOrdenPrueba;
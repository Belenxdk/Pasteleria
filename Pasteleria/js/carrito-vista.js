function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const contador = document.getElementById("carrito-contador");
  if (contador) contador.textContent = totalItems;
}

function renderCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("carrito-total");

  if (carrito.length === 0) {
    contenedor.innerHTML =
      '<p>Tu carrito está vacío. <a href="productos.html">Ver productos</a></p>';
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  contenedor.innerHTML = carrito
    .map((item) => {
      const precioNumerico =
        typeof item.precio === "string"
          ? parseInt(item.precio.replace(/\D/g, ""))
          : item.precio;
      const subtotal = precioNumerico * item.cantidad;
      total += subtotal;

      return `
      <div class="item-carrito">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="item-carrito-info">
          <h3>${item.nombre}</h3>
          <p>Cantidad: ${item.cantidad}</p>
          <p>Subtotal: $${subtotal.toLocaleString("es-CL")}</p>
        </div>
        <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
      </div>
    `;
    })
    .join("");

  totalEl.textContent = "$" + total.toLocaleString("es-CL");

  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", function () {
      let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      carritoActual = carritoActual.filter(
        (item) => item.id !== this.dataset.id,
      );
      localStorage.setItem("carrito", JSON.stringify(carritoActual));
      renderCarrito();
      actualizarContadorCarrito();
    });
  });
}

actualizarContadorCarrito();
renderCarrito();

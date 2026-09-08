function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const contador = document.getElementById("carrito-contador");
  if (contador) contador.textContent = totalItems;
}

window.agregarAlCarrito = function (producto) {
  const inputCantidad = document.getElementById("cantidad");
  const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`${cantidad} x ${producto.nombre} agregado(s) al carrito.`);
};

const inputCantidad = document.getElementById("cantidad");
const btnSumar = document.getElementById("sumar");
const btnRestar = document.getElementById("restar");

if (btnSumar && inputCantidad) {
  btnSumar.addEventListener("click", function () {
    let valor = parseInt(inputCantidad.value);
    if (valor < parseInt(inputCantidad.max)) {
      inputCantidad.value = valor + 1;
    }
  });
}

if (btnRestar && inputCantidad) {
  btnRestar.addEventListener("click", function () {
    let valor = parseInt(inputCantidad.value);
    if (valor > parseInt(inputCantidad.min)) {
      inputCantidad.value = valor - 1;
    }
  });
}

actualizarContadorCarrito();

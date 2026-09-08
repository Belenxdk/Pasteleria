const botonesFiltro = document.querySelectorAll('.filtro-btn');
const tarjetasProducto = document.querySelectorAll('.producto-card[data-categoria]');

botonesFiltro.forEach((boton) => {
	boton.addEventListener('click', () => {
		const categoriaSeleccionada = boton.dataset.categoria;

		botonesFiltro.forEach((botonActual) => {
			const estaActivo = botonActual === boton;
			botonActual.classList.toggle('activo', estaActivo);
			botonActual.setAttribute('aria-pressed', String(estaActivo));
		});

		tarjetasProducto.forEach((tarjeta) => {
			const mostrarTarjeta = categoriaSeleccionada === 'todos' ||
				tarjeta.dataset.categoria === categoriaSeleccionada;
			tarjeta.hidden = !mostrarTarjeta;
		});
	});
});

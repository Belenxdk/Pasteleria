const productos = {
	'torta-chocolate': {
		categoria: 'Tortas',
		nombre: 'Torta de Chocolate',
		descripcion: 'Deliciosa torta de chocolate artesanal, elaborada con cacao premium y un suave relleno de manjar. Ideal para cumpleaños y celebraciones especiales. Tamaño para 12 personas.',
		precio: '$25.000',
		imagen: 'img/productos/tortaChocolate.jpg'
	},
	'cheesecake-frutos-rojos': {
		categoria: 'Tortas',
		nombre: 'Cheesecake Frutos Rojos',
		descripcion: 'Cheesecake cremoso con una cubierta de frutos rojos seleccionados, preparado artesanalmente para tus celebraciones.',
		precio: '$22.000',
		imagen: 'img/productos/ChescakedeFrutosRojos.jpg'
	},
	'torta-cumpleanos': {
		categoria: 'Tortas',
		nombre: 'Torta Especial Cumpleaños',
		descripcion: 'Torta especial para celebrar cumpleaños, con una decoración alegre y el sabor artesanal de Mil Sabores.',
		precio: '$30.000',
		imagen: 'img/productos/tortaCumpleanos.jpg'
	},
	'macarons': {
		categoria: 'Pastelería Individual',
		nombre: 'Caja de Macarons',
		descripcion: 'Caja de macarons surtidos, delicados y crujientes por fuera, con un relleno suave y sabroso.',
		precio: '$12.000',
		imagen: 'img/productos/macarron.jpg'
	},
	'cupcakes': {
		categoria: 'Pastelería Individual',
		nombre: 'Cupcakes Surtidos (6 un.)',
		descripcion: 'Seis cupcakes surtidos con sabores y decoraciones ideales para compartir.',
		precio: '$9.000',
		imagen: 'img/productos/cupcakes.jpg'
	},
	'brownies': {
		categoria: 'Pastelería Individual',
		nombre: 'Brownies Artesanales (4 un.)',
		descripcion: 'Cuatro brownies artesanales, húmedos y llenos de sabor a chocolate.',
		precio: '$7.500',
		imagen: 'img/productos/brawnie.jpg'
	},
	'torta-sin-azucar': {
		categoria: 'Sin Azúcar',
		nombre: 'Torta Sin Azúcar de Naranja',
		descripcion: 'Torta suave de naranja, preparada sin azúcar para disfrutar una alternativa deliciosa.',
		precio: '$27.000',
		imagen: 'img/productos/tortasinAzucar.jpg'
	},
	'cheesecake-sin-azucar': {
		categoria: 'Sin Azúcar',
		nombre: 'Cheesecake Sin Azúcar',
		descripcion: 'Cheesecake cremoso y liviano, elaborado sin azúcar y con todo el sabor de nuestra pastelería.',
		precio: '$24.000',
		imagen: 'img/productos/Chescakes.jpg'
	},
	'galletas-sin-azucar': {
		categoria: 'Sin Azúcar',
		nombre: 'Galletas Sin Azúcar (8 un.)',
		descripcion: 'Ocho galletas horneadas sin azúcar, perfectas para acompañar tu café o té.',
		precio: '$6.000',
		imagen: 'img/productos/galletas.jpg'
	},
	'brazo-de-reina':{
		categoria: 'torta',
		nombre: 'Brazo de reina(10 un)',
		descripcion: 'Un clásico a la hora de darse un gusto dulce',
		precio: '$10.000',
		imagen: 'https://www.tipicochileno.cl/wp-content/uploads/2021/05/brazo-de-reina-1080-1080.jpg'

	}

};

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get('id') || 'torta-chocolate';
const producto = productos[idProducto];

const categoriaProducto = document.querySelector('#categoria-producto');
const nombreProducto = document.querySelector('#nombre-producto');
const descripcionProducto = document.querySelector('#descripcion-producto');
const precioProducto = document.querySelector('#precio-producto');
const imagenProducto = document.querySelector('#imagen-producto');
const botonAnadirCarrito = document.querySelector('#boton-anadir-carrito');

if (producto) {
	categoriaProducto.textContent = producto.categoria;
	nombreProducto.textContent = producto.nombre;
	descripcionProducto.textContent = producto.descripcion;
	precioProducto.textContent = producto.precio;
	imagenProducto.src = producto.imagen;
	imagenProducto.alt = producto.nombre;
	botonAnadirCarrito.addEventListener('click', () => {
		window.agregarAlCarrito({ id: idProducto, ...producto });
		botonAnadirCarrito.textContent = 'Añadido al carrito';
	});
} else {
	categoriaProducto.textContent = 'Detalle de producto';
	nombreProducto.textContent = 'Selecciona un producto';
	descripcionProducto.textContent = 'Cuando agreguemos el catálogo, cada producto tendrá aquí su información completa.';
	precioProducto.textContent = '';
	imagenProducto.removeAttribute('src');
	botonAnadirCarrito.disabled = true;
}

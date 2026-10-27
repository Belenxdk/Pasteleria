// Productos iniciales de Pastelería Mil Sabores.
// Es la base de datos simulada: la tienda y el panel de administración leen estos datos
// mediante las funciones de data/productos.js (listar, crear, actualizar, eliminar).
export const productosIniciales = [
  { id: "torta-chocolate", nombre: "Torta de Chocolate", descripcion: "Torta artesanal de chocolate con relleno de manjar. Tamaño para 12 personas.", categoria: "Tortas", precio: 25000, imagen: "/img/productos/tortaChocolate.jpg", stock: 10, activo: true },
  { id: "cheesecake-frutos-rojos", nombre: "Cheesecake Frutos Rojos", descripcion: "Cheesecake cremoso con cubierta de frutos rojos.", categoria: "Tortas", precio: 22000, imagen: "/img/productos/ChescakedeFrutosRojos.jpg", stock: 8, activo: true },
  { id: "torta-cumpleanos", nombre: "Torta Especial Cumpleaños", descripcion: "Torta decorada para celebrar cumpleaños.", categoria: "Tortas", precio: 30000, imagen: "/img/productos/tortaCumpleanos.jpg", stock: 5, activo: true },
  { id: "macarons", nombre: "Caja de Macarons", descripcion: "Caja de macarons surtidos.", categoria: "Pastelería Individual", precio: 12000, imagen: "/img/productos/macarron.jpg", stock: 20, activo: true },
  { id: "cupcakes", nombre: "Cupcakes Surtidos (6 un.)", descripcion: "Seis cupcakes surtidos para compartir.", categoria: "Pastelería Individual", precio: 9000, imagen: "/img/productos/cupcakes.jpg", stock: 15, activo: true },
  { id: "brownies", nombre: "Brownies Artesanales (4 un.)", descripcion: "Cuatro brownies artesanales con mucho chocolate.", categoria: "Pastelería Individual", precio: 7500, imagen: "/img/productos/brawnie.jpg", stock: 18, activo: true },
  { id: "torta-sin-azucar", nombre: "Torta Sin Azúcar de Naranja", descripcion: "Torta suave de naranja, sin azúcar.", categoria: "Sin Azúcar", precio: 27000, imagen: "/img/productos/tortasinAzucar.jpg", stock: 6, activo: true },
  { id: "cheesecake-sin-azucar", nombre: "Cheesecake Sin Azúcar", descripcion: "Cheesecake cremoso y liviano, sin azúcar.", categoria: "Sin Azúcar", precio: 24000, imagen: "/img/productos/Chescakes.jpg", stock: 7, activo: true },
  { id: "galletas-sin-azucar", nombre: "Galletas Sin Azúcar (8 un.)", descripcion: "Ocho galletas horneadas sin azúcar.", categoria: "Sin Azúcar", precio: 6000, imagen: "/img/productos/galletas.jpg", stock: 25, activo: true },
];

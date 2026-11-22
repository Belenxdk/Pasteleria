package cl.duoc.pasteleria.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import cl.duoc.pasteleria.modelo.Producto;
import cl.duoc.pasteleria.repositorio.ProductoRepository;

@Component
public class DatosIniciales implements CommandLineRunner {

    private final ProductoRepository repositorio;

    public DatosIniciales(ProductoRepository repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public void run(String... args) {
        if (repositorio.count() > 0) {
            return;
        }
        repositorio.saveAll(List.of(
                producto("torta-chocolate", "Torta de Chocolate",
                        "Torta artesanal de chocolate con relleno de manjar. Tamaño para 12 personas.",
                        "Tortas", 25000, "/img/productos/tortaChocolate.jpg", 10),
                producto("cheesecake-frutos-rojos", "Cheesecake Frutos Rojos",
                        "Cheesecake cremoso con cubierta de frutos rojos.",
                        "Tortas", 22000, "/img/productos/ChescakedeFrutosRojos.jpg", 8),
                producto("torta-cumpleanos", "Torta Especial Cumpleaños",
                        "Torta decorada para celebrar cumpleaños.",
                        "Tortas", 30000, "/img/productos/tortaCumpleanos.jpg", 5),
                producto("macarons", "Caja de Macarons",
                        "Caja de macarons surtidos.",
                        "Pastelería Individual", 12000, "/img/productos/macarron.jpg", 20),
                producto("cupcakes", "Cupcakes Surtidos (6 un.)",
                        "Seis cupcakes surtidos para compartir.",
                        "Pastelería Individual", 9000, "/img/productos/cupcakes.jpg", 15),
                producto("brownies", "Brownies Artesanales (4 un.)",
                        "Cuatro brownies artesanales con mucho chocolate.",
                        "Pastelería Individual", 7500, "/img/productos/brawnie.jpg", 18),
                producto("torta-sin-azucar", "Torta Sin Azúcar de Naranja",
                        "Torta suave de naranja, sin azúcar.",
                        "Sin Azúcar", 27000, "/img/productos/tortasinAzucar.jpg", 6),
                producto("cheesecake-sin-azucar", "Cheesecake Sin Azúcar",
                        "Cheesecake cremoso y liviano, sin azúcar.",
                        "Sin Azúcar", 24000, "/img/productos/Chescakes.jpg", 7),
                producto("galletas-sin-azucar", "Galletas Sin Azúcar (8 un.)",
                        "Ocho galletas horneadas sin azúcar.",
                        "Sin Azúcar", 6000, "/img/productos/galletas.jpg", 25)));
    }

    private Producto producto(String id, String nombre, String descripcion, String categoria,
                              Integer precio, String imagen, Integer stock) {
        Producto producto = new Producto();
        producto.setId(id);
        producto.setNombre(nombre);
        producto.setDescripcion(descripcion);
        producto.setCategoria(categoria);
        producto.setPrecio(precio);
        producto.setImagen(imagen);
        producto.setStock(stock);
        producto.setActivo(true);
        return producto;
    }
}
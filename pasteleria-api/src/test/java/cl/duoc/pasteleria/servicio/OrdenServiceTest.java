package cl.duoc.pasteleria.servicio;

import cl.duoc.pasteleria.dto.LineaPedido;
import cl.duoc.pasteleria.dto.PedidoRequest;
import cl.duoc.pasteleria.error.CredencialesInvalidasException;
import cl.duoc.pasteleria.error.RecursoNoEncontradoException;
import cl.duoc.pasteleria.error.StockInsuficienteException;
import cl.duoc.pasteleria.modelo.Orden;
import cl.duoc.pasteleria.modelo.Producto;
import cl.duoc.pasteleria.modelo.Rol;
import cl.duoc.pasteleria.modelo.Usuario;
import cl.duoc.pasteleria.repositorio.OrdenRepository;
import cl.duoc.pasteleria.repositorio.ProductoRepository;
import cl.duoc.pasteleria.repositorio.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class OrdenServiceTest {

    private static final String EMAIL = "cliente@milsabores.cl";

    private ProductoRepository productos;
    private OrdenRepository ordenes;
    private UsuarioRepository usuarios;
    private OrdenService servicio;
    private Producto brownies;

    @BeforeEach
    void preparar() {
        productos = mock(ProductoRepository.class);
        ordenes = mock(OrdenRepository.class);
        usuarios = mock(UsuarioRepository.class);
        servicio = new OrdenService(productos, ordenes, usuarios);

        Usuario cliente = new Usuario();
        cliente.setNombre("Cliente");
        cliente.setEmail(EMAIL);
        cliente.setRol(Rol.CLIENTE);

        brownies = new Producto();
        brownies.setId("brownies");
        brownies.setNombre("Brownies Artesanales");
        brownies.setPrecio(7500);
        brownies.setStock(10);
        brownies.setActivo(true);

        when(usuarios.findByEmail(EMAIL)).thenReturn(Optional.of(cliente));
        when(productos.findById("brownies")).thenReturn(Optional.of(brownies));
        when(ordenes.save(any(Orden.class))).thenAnswer(invocacion -> invocacion.getArgument(0));
    }

    private PedidoRequest pedidoDe(String productoId, int cantidad) {
        return new PedidoRequest("Calle 123", List.of(new LineaPedido(productoId, cantidad)));
    }

    @Test
    void compraCorrectaCalculaElTotalYDescuentaElStock() {
        Orden orden = servicio.crear(EMAIL, pedidoDe("brownies", 2));

        assertEquals(15000, orden.getTotal());
        assertEquals("Pendiente", orden.getEstado());
        assertEquals(8, brownies.getStock());
    }

    @Test
    void elCompradorSaleDelUsuarioAutenticado() {
        Orden orden = servicio.crear(EMAIL, pedidoDe("brownies", 1));

        assertEquals("Cliente", orden.getCliente());
        assertEquals(EMAIL, orden.getEmail());
        assertEquals(EMAIL, orden.getUsuarioId());
    }

    @Test
    void conUnUsuarioInexistenteLanzaErrorYNoToqueElStock() {
        assertThrows(CredencialesInvalidasException.class,
                () -> servicio.crear("fantasma@milsabores.cl", pedidoDe("brownies", 1)));

        assertEquals(10, brownies.getStock());
        verify(ordenes, never()).save(any(Orden.class));
    }

    @Test
    void conStockInsuficienteLanzaErrorYNoGuardaLaOrden() {
        assertThrows(StockInsuficienteException.class,
                () -> servicio.crear(EMAIL, pedidoDe("brownies", 11)));

        assertEquals(10, brownies.getStock());
        verify(ordenes, never()).save(any(Orden.class));
    }

    @Test
    void conUnProductoInexistenteLanzaError() {
        assertThrows(RecursoNoEncontradoException.class,
                () -> servicio.crear(EMAIL, pedidoDe("no-existe", 1)));
    }

    @Test
    void obtenerUnaOrdenInexistenteLanzaError() {
        assertThrows(RecursoNoEncontradoException.class,
                () -> servicio.obtener("no-existe"));
    }
}
package cl.duoc.pasteleria.servicio;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cl.duoc.pasteleria.dto.LineaPedido;
import cl.duoc.pasteleria.dto.PedidoRequest;
import cl.duoc.pasteleria.error.CredencialesInvalidasException;
import cl.duoc.pasteleria.error.RecursoNoEncontradoException;
import cl.duoc.pasteleria.error.StockInsuficienteException;
import cl.duoc.pasteleria.modelo.ItemOrden;
import cl.duoc.pasteleria.modelo.Orden;
import cl.duoc.pasteleria.modelo.Producto;
import cl.duoc.pasteleria.modelo.Usuario;
import cl.duoc.pasteleria.repositorio.OrdenRepository;
import cl.duoc.pasteleria.repositorio.ProductoRepository;
import cl.duoc.pasteleria.repositorio.UsuarioRepository;

@Service
public class OrdenService {

    private final ProductoRepository productos;
    private final OrdenRepository ordenes;
    private final UsuarioRepository usuarios;

    public OrdenService(ProductoRepository productos, OrdenRepository ordenes, UsuarioRepository usuarios) {
        this.productos = productos;
        this.ordenes = ordenes;
        this.usuarios = usuarios;
    }

    @Transactional
    public Orden crear(String emailComprador, PedidoRequest solicitud) {
        Usuario comprador = usuarios.findByEmail(emailComprador)
                .orElseThrow(CredencialesInvalidasException::new);

        Map<String, Integer> cantidades = new LinkedHashMap<>();
        for (LineaPedido linea : solicitud.items()) {
            cantidades.merge(linea.productoId(), linea.cantidad(), Integer::sum);
        }

        List<ItemOrden> detalle = new ArrayList<>();
        int total = 0;

        for (Map.Entry<String, Integer> entrada : cantidades.entrySet()) {
            Producto producto = productos.findById(entrada.getKey())
                    .filter(p -> !Boolean.FALSE.equals(p.getActivo()))
                    .orElseThrow(() -> new RecursoNoEncontradoException(
                            "El producto " + entrada.getKey() + " ya no está disponible"));

            int cantidad = entrada.getValue();

            if (cantidad > producto.getStock()) {
                throw new StockInsuficienteException("Stock insuficiente para «" + producto.getNombre()
                        + "»: quedan " + producto.getStock() + " unidades.");
            }

            producto.setStock(producto.getStock() - cantidad);

            int subtotal = producto.getPrecio() * cantidad;
            total += subtotal;
            detalle.add(new ItemOrden(producto.getId(), producto.getNombre(),
                    producto.getPrecio(), cantidad, subtotal));
        }

        Orden orden = new Orden();
        orden.setId(UUID.randomUUID().toString());
        orden.setUsuarioId(comprador.getEmail());
        orden.setCliente(comprador.getNombre());
        orden.setEmail(comprador.getEmail());
        orden.setDireccion(solicitud.direccion());
        orden.setItems(detalle);
        orden.setTotal(total);
        orden.setEstado("Pendiente");
        orden.setFecha(LocalDateTime.now());

        return ordenes.save(orden);
    }

    public List<Orden> listar() {
        return ordenes.findAll(Sort.by(Sort.Direction.DESC, "fecha"));
    }

    public Orden obtener(String id) {
        return ordenes.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("La orden " + id + " no existe"));
    }
}
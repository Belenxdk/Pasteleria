package cl.duoc.pasteleria.controlador;

import cl.duoc.pasteleria.dto.PedidoRequest;
import cl.duoc.pasteleria.modelo.Orden;
import cl.duoc.pasteleria.servicio.OrdenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ordenes")
public class OrdenController {

    private final OrdenService servicio;

    public OrdenController(OrdenService servicio) {
        this.servicio = servicio;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Orden crear(Authentication autenticacion, @Valid @RequestBody PedidoRequest solicitud) {
        return servicio.crear(autenticacion.getName(), solicitud);
    }

    @GetMapping
    public List<Orden> listar() {
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public Orden detalle(@PathVariable String id) {
        return servicio.obtener(id);
    }
}
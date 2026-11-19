package cl.duoc.pasteleria.controlador;


import cl.duoc.pasteleria.dto.PedidoRequest;
import cl.duoc.pasteleria.modelo.Orden;
import cl.duoc.pasteleria.servicio.OrdenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

    private final OrdenService servicio;

    public OrdenController(OrdenService servicio){
        this.servicio = servicio;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Orden crear(@Valid @RequestBody PedidoRequest solicitud){
        return servicio.crear(solicitud);
    }
}

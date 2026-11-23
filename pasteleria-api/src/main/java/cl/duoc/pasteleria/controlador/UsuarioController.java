package cl.duoc.pasteleria.controlador;

import cl.duoc.pasteleria.dto.UsuarioEdicion;
import cl.duoc.pasteleria.dto.UsuarioNuevo;
import cl.duoc.pasteleria.dto.UsuarioRespuesta;
import cl.duoc.pasteleria.servicio.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService servicio;

    public UsuarioController(UsuarioService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<UsuarioRespuesta> listar() {
        return servicio.listar().stream().map(UsuarioRespuesta::de).toList();
    }

    @GetMapping("/{id}")
    public UsuarioRespuesta detalle(@PathVariable Long id) {
        return UsuarioRespuesta.de(servicio.obtener(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioRespuesta crear(@Valid @RequestBody UsuarioNuevo solicitud) {
        return UsuarioRespuesta.de(servicio.crear(solicitud));
    }

    @PutMapping("/{id}")
    public UsuarioRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioEdicion solicitud) {
        return UsuarioRespuesta.de(servicio.actualizar(id, solicitud));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id, Authentication autenticacion) {
        servicio.eliminar(id, autenticacion.getName());
    }
}
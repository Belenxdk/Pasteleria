package cl.duoc.pasteleria.controlador;

import cl.duoc.pasteleria.dto.LoginRequest;
import cl.duoc.pasteleria.dto.LoginResponse;
import cl.duoc.pasteleria.dto.RegistroRequest;
import cl.duoc.pasteleria.servicio.AuthService;
import cl.duoc.pasteleria.servicio.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService servicio;
    private final UsuarioService usuarios;

    public AuthController(AuthService servicio, UsuarioService usuarios) {
        this.servicio = servicio;
        this.usuarios = usuarios;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest solicitud) {
        return servicio.login(solicitud);
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResponse registro(@Valid @RequestBody RegistroRequest solicitud) {
        return usuarios.registrar(solicitud);
    }

    @PostMapping("/renovar")
    public LoginResponse renovar(@RequestHeader(value = "Authorization", required = false) String cabecera) {
        return servicio.renovar(cabecera);
    }
}
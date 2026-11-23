package cl.duoc.pasteleria.controlador;


import cl.duoc.pasteleria.dto.LoginRequest;
import cl.duoc.pasteleria.dto.LoginResponse;
import cl.duoc.pasteleria.servicio.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService servicio;

    public AuthController( AuthService servicio){
        this.servicio = servicio;
    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest solicitud){
        return servicio.login(solicitud);
    }

    @PostMapping("/renovar")
    public LoginResponse renovar(@RequestHeader(value = "Authorization", required = false) String cabecera) {
        return servicio.renovar(cabecera);
    }
}

package cl.duoc.pasteleria.servicio;

import cl.duoc.pasteleria.dto.LoginRequest;
import cl.duoc.pasteleria.dto.LoginResponse;
import cl.duoc.pasteleria.error.CredencialesInvalidasException;
import cl.duoc.pasteleria.modelo.Usuario;
import cl.duoc.pasteleria.repositorio.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UsuarioRepository usuarios, PasswordEncoder encoder, JwtService jwt) {
        this.usuarios = usuarios;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public LoginResponse login(LoginRequest solicitud) {
        Usuario usuario = usuarios.findByEmail(solicitud.email())
                .filter(u -> encoder.matches(solicitud.password(), u.getPassword()))
                .orElseThrow(CredencialesInvalidasException::new);

        String token = jwt.generar(usuario);
        return new LoginResponse(token, usuario.getNombre(), usuario.getEmail(), usuario.getRol().name());
    }
}
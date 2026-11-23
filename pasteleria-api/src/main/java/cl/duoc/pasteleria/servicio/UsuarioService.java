package cl.duoc.pasteleria.servicio;

import cl.duoc.pasteleria.dto.LoginResponse;
import cl.duoc.pasteleria.dto.RegistroRequest;
import cl.duoc.pasteleria.dto.UsuarioEdicion;
import cl.duoc.pasteleria.dto.UsuarioNuevo;
import cl.duoc.pasteleria.error.ConflictoException;
import cl.duoc.pasteleria.error.RecursoNoEncontradoException;
import cl.duoc.pasteleria.modelo.Rol;
import cl.duoc.pasteleria.modelo.Usuario;
import cl.duoc.pasteleria.repositorio.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public UsuarioService(UsuarioRepository usuarios, PasswordEncoder encoder, JwtService jwt) {
        this.usuarios = usuarios;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @Transactional
    public LoginResponse registrar(RegistroRequest r) {
        Usuario usuario = guardarNuevo(r.run(), r.nombre(), r.apellidos(),
                r.email(), r.direccion(), r.password(), Rol.CLIENTE);
        return new LoginResponse(jwt.generar(usuario), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol().name());
    }

    public List<Usuario> listar() { return usuarios.findAll(); }

    public Usuario obtener(Long id) {
        return usuarios.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("El usuario " + id + " no existe"));
    }

    @Transactional
    public Usuario crear(UsuarioNuevo r) {
        return guardarNuevo(r.run(), r.nombre(), r.apellidos(),
                r.email(), r.direccion(), r.password(), r.rol());
    }

    @Transactional
    public Usuario actualizar(Long id, UsuarioEdicion r) {
        Usuario u = obtener(id);
        String email = r.email().trim().toLowerCase(Locale.ROOT);
        usuarios.findByEmail(email)
                .filter(otro -> !otro.getId().equals(id))
                .ifPresent(otro -> { throw new ConflictoException("Ya existe un usuario con ese correo"); });

        if (r.run() != null && !r.run().isBlank()) {
            String run = normalizarYValidarRun(r.run());
            usuarios.findByRun(run)
                    .filter(otro -> !otro.getId().equals(id))
                    .ifPresent(otro -> { throw new ConflictoException("Ya existe un usuario con ese RUN"); });
            u.setRun(run);
        }
        // Conserva los datos antiguos si no se mandan campos adicionales.
        if (r.apellidos() != null && !r.apellidos().isBlank()) u.setApellidos(r.apellidos().trim());
        if (r.direccion() != null && !r.direccion().isBlank()) u.setDireccion(r.direccion().trim());
        u.setNombre(r.nombre().trim());
        u.setEmail(email);
        u.setRol(r.rol());
        if (r.password() != null && !r.password().isBlank()) {
            u.setPassword(encoder.encode(r.password()));
        }
        return usuarios.save(u);
    }

    @Transactional
    public void eliminar(Long id, String emailActual) {
        Usuario u = obtener(id);
        if (u.getEmail().equalsIgnoreCase(emailActual)) {
            throw new ConflictoException("No puedes eliminar tu propia cuenta");
        }
        if (u.getRol() == Rol.ADMIN) {
            throw new ConflictoException("No se pueden eliminar cuentas administradoras");
        }
        usuarios.delete(u);
    }

    private Usuario guardarNuevo(String runSinValidar, String nombre, String apellidos,
                                 String emailSinNormalizar, String direccion, String clave, Rol rol) {
        String run = normalizarYValidarRun(runSinValidar);
        String email = emailSinNormalizar.trim().toLowerCase(Locale.ROOT);
        if (usuarios.existsByEmail(email)) throw new ConflictoException("Ya existe un usuario con ese correo");
        if (usuarios.existsByRun(run)) throw new ConflictoException("Ya existe un usuario con ese RUN");
        Usuario u = new Usuario();
        u.setRun(run);
        u.setNombre(nombre.trim());
        u.setApellidos(apellidos.trim());
        u.setEmail(email);
        u.setDireccion(direccion.trim());
        u.setPassword(encoder.encode(clave));
        u.setRol(rol);
        return usuarios.save(u);
    }

    private String normalizarYValidarRun(String valor) {
        String run = valor == null ? "" : valor.trim().toUpperCase(Locale.ROOT);
        if (!run.matches("[0-9]{7,8}[0-9K]")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "RUN inválido, sin puntos ni guion");
        }
        int suma = 0, multiplicador = 2;
        for (int i = run.length() - 2; i >= 0; i--) {
            suma += (run.charAt(i) - '0') * multiplicador;
            multiplicador = multiplicador == 7 ? 2 : multiplicador + 1;
        }
        int resto = 11 - suma % 11;
        char esperado = resto == 11 ? '0' : resto == 10 ? 'K' : (char) ('0' + resto);
        if (run.charAt(run.length() - 1) != esperado) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "RUN inválido, dígito verificador incorrecto");
        }
        return run;
    }
}

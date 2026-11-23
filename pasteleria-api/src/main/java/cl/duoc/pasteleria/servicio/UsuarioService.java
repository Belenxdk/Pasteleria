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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    /** Registro público: siempre crea un CLIENTE, sin importar lo que mande el cliente. */
    @Transactional
    public LoginResponse registrar(RegistroRequest solicitud) {
        Usuario usuario = guardarNuevo(solicitud.nombre(), solicitud.email(),
                solicitud.password(), Rol.CLIENTE);
        return new LoginResponse(jwt.generar(usuario), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol().name());
    }

    public List<Usuario> listar() {
        return usuarios.findAll();
    }

    public Usuario obtener(Long id) {
        return usuarios.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("El usuario " + id + " no existe"));
    }

    @Transactional
    public Usuario crear(UsuarioNuevo solicitud) {
        return guardarNuevo(solicitud.nombre(), solicitud.email(),
                solicitud.password(), solicitud.rol());
    }

    @Transactional
    public Usuario actualizar(Long id, UsuarioEdicion solicitud) {
        Usuario usuario = obtener(id);

        usuarios.findByEmail(solicitud.email())
                .filter(otro -> !otro.getId().equals(id))
                .ifPresent(otro -> {
                    throw new ConflictoException("Ya existe un usuario con ese correo");
                });

        usuario.setNombre(solicitud.nombre());
        usuario.setEmail(solicitud.email());
        usuario.setRol(solicitud.rol());
        if (solicitud.password() != null && !solicitud.password().isBlank()) {
            usuario.setPassword(encoder.encode(solicitud.password()));
        }
        return usuarios.save(usuario);
    }

    @Transactional
    public void eliminar(Long id, String emailActual) {
        Usuario usuario = obtener(id);
        if (usuario.getEmail().equalsIgnoreCase(emailActual)) {
            throw new ConflictoException("No puedes eliminar tu propia cuenta");
        }
        usuarios.delete(usuario);
    }

    private Usuario guardarNuevo(String nombre, String email, String clave, Rol rol) {
        if (usuarios.existsByEmail(email)) {
            throw new ConflictoException("Ya existe un usuario con ese correo");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(encoder.encode(clave));
        usuario.setRol(rol);
        return usuarios.save(usuario);
    }
}
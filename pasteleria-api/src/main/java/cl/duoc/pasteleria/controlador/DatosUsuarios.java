package cl.duoc.pasteleria.controlador;


import cl.duoc.pasteleria.modelo.Rol;
import cl.duoc.pasteleria.modelo.Usuario;
import cl.duoc.pasteleria.repositorio.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class DatosUsuarios implements CommandLineRunner {

    private final UsuarioRepository repositorio;
    private final PasswordEncoder encoder;

    public DatosUsuarios(UsuarioRepository repositorio, PasswordEncoder encoder){
        this.repositorio = repositorio;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args){
        crear("Administrador", "admin@milsabores.cl", "Admin123", Rol.ADMIN);
        crear("Vendedor", "vendedor@milsabores.cl", "Vendedor123", Rol.VENDEDOR);
        crear("Cliente", "cliente@milsabores.cl", "Cliente123", Rol.CLIENTE);
    }
    private void crear(String nombre, String email, String clave, Rol rol) {
        if (repositorio.existsByEmail(email)) {
            return;
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(encoder.encode(clave));
        usuario.setRol(rol);
        repositorio.save(usuario);
    }
}

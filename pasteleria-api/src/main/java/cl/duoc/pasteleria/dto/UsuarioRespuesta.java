package cl.duoc.pasteleria.dto;

import cl.duoc.pasteleria.modelo.Usuario;

public record UsuarioRespuesta(Long id, String run, String nombre, String apellidos,
                               String email, String direccion, String rol) {
    public static UsuarioRespuesta de(Usuario u) {
        return new UsuarioRespuesta(u.getId(), u.getRun(), u.getNombre(), u.getApellidos(),
                u.getEmail(), u.getDireccion(), u.getRol().name());
    }
}

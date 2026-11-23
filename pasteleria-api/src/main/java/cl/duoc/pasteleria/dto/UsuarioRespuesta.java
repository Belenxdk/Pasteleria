package cl.duoc.pasteleria.dto;

import cl.duoc.pasteleria.modelo.Usuario;

public record UsuarioRespuesta(Long id, String nombre, String email, String rol) {

    public static UsuarioRespuesta de(Usuario u) {
        return new UsuarioRespuesta(u.getId(), u.getNombre(), u.getEmail(), u.getRol().name());
    }
}
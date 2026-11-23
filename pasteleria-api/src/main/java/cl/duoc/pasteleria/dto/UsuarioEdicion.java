package cl.duoc.pasteleria.dto;

import cl.duoc.pasteleria.modelo.Rol;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioEdicion(
        @NotBlank(message = "Falta el nombre") String nombre,
        @NotBlank(message = "Falta el correo") @Email(message = "El correo no es válido") String email,
        @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres") String password,
        @NotNull(message = "Falta el rol") Rol rol
) {
}
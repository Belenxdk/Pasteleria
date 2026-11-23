package cl.duoc.pasteleria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        @NotBlank(message = "Falta el nombre") String nombre,
        @NotBlank(message = "Falta el correo") @Email(message = "El correo no es válido") String email,
        @NotBlank(message = "Falta la contraseña") @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres") String password
) {
}
package cl.duoc.pasteleria.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Falta el correo") String email,
        @NotBlank(message = "Falta la contraseña") String password
) {
}
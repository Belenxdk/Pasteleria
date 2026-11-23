package cl.duoc.pasteleria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        @NotBlank @Size(max = 9) @Pattern(regexp = "(?i)[0-9]{7,8}[0-9K]", message = "RUN inválido") String run,
        @NotBlank @Size(max = 50) String nombre,
        @NotBlank @Size(max = 100) String apellidos,
        @NotBlank @Email @Size(max = 100) String email,
        @NotBlank @Size(max = 300) String direccion,
        @NotBlank @Size(min = 6, max = 50) String password
) {}

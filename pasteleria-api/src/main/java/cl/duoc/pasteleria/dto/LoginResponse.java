package cl.duoc.pasteleria.dto;

public record LoginResponse(String token, String nombre, String email, String rol) {
}

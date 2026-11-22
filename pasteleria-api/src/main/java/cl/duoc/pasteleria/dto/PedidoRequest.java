package cl.duoc.pasteleria.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record PedidoRequest(
        @NotBlank(message = "Falta el Usuario") String usuarioId,
        @NotBlank(message = "Falta el nombre del cliente") String cliente,
        @NotBlank(message = "Falta el correo") String email,
        String direccion,
        @NotEmpty(message = "El pedido no tiene productos") @Valid List<LineaPedido> items
        ) {
}

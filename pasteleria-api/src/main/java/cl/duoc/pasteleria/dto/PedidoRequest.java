package cl.duoc.pasteleria.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record PedidoRequest(
        String direccion,
        @NotEmpty(message = "El pedido no tiene productos") @Valid List<LineaPedido> items
) {
}
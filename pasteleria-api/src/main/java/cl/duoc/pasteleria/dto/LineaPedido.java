package cl.duoc.pasteleria.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LineaPedido (@NotBlank(message = "Falta el Producto") String productoId,
                           @NotNull(message = "Falta la cantidad")@Min(value = 1, message = "La cantidad mínima es 1") Integer cantidad){

}
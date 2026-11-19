package cl.duoc.pasteleria.modelo;

import jakarta.persistence.Embeddable;

@Embeddable
public class ItemOrden {

    private String productoId;
    private String nombre;
    private Integer precioUnitario;
    private Integer cantidad;
    private Integer subtotal;

    public ItemOrden(){
    }
    public ItemOrden(String productoId, String nombre, Integer precioUnitario, Integer cantidad, Integer subtotal) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }

    public String getProductoId() { return productoId; }
    public String getNombre() { return nombre; }
    public Integer getPrecioUnitario() { return precioUnitario; }
    public Integer getCantidad() { return cantidad; }
    public Integer getSubtotal() { return subtotal; }

}

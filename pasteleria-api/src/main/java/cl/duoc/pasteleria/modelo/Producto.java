package cl.duoc.pasteleria.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

@Entity
public class Producto {
    @Id
    private String id;


    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 80, message = "El nombre admite hasta 80 caracteres")
    private String nombre;

    @Size(max = 300, message = "La descripción admite hasta 300 caracteres")
    private String descripcion;

    @NotBlank(message = "La categoria es OBLIGATORIA")
    private String categoria;

    @NotNull(message = "El precio es OBLIGATORIO")
    @Positive(message = "El precio debe ser mayor que cero")
    private Integer precio;

    private String imagen;

    @NotNull(message = "El stock es OBLIGATORIO")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;

    private Boolean activo = true;

    public Producto(){
    }

    public String getId(){return id;}
    public void setId(String id){this.id = id;}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Integer getPrecio() { return precio; }
    public void setPrecio(Integer precio) { this.precio = precio; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Boolean getActivo(){return activo;}
    public void setActivo(Boolean activo) { this.activo = activo;}
}
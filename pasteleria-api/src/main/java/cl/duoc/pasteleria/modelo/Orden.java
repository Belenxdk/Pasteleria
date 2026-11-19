package cl.duoc.pasteleria.modelo;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordenes")
public class Orden {

    @Id
    private String id;

    private String usuarioId;
    private String cliente;
    private String email;
    private String direccion;
    private Integer total;
    private String estado;
    private LocalDateTime fecha;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<ItemOrden> items = new ArrayList<>();

    public Orden(){
    }

    public String getId(){return id;}
    public void setId(String id){this.id = id;}

    public String getUsuarioId(){return usuarioId;}
    public void setUsuarioId(String usuarioId) {this.usuarioId = usuarioId;}

    public String getCliente(){return cliente;}
    public void setCliente(String cliente){this.email = email;}

    public String getEmail(){return email;}
    public void setEmail(String email){this.email = email;}

    public String getDireccion(){return direccion;}
    public void setDireccion(String direccion){this.direccion = direccion;}

    public Integer getTotal(){return total;}
    public void setTotal(Integer total) {this.total = total;}

    public String getEstado(){return estado;}
    public void setEstado(String estado){this.estado = estado;}

    public LocalDateTime getFecha(){return  fecha;}
    public void setFecha(LocalDateTime fecha){this.fecha = fecha;}

    public List<ItemOrden> getItems(){return items;}
    public void setItems(List<ItemOrden> items){this.items = items;}
}

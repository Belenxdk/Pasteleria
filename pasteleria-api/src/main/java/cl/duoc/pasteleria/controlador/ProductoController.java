package cl.duoc.pasteleria.controlador;


import cl.duoc.pasteleria.modelo.Producto;
import cl.duoc.pasteleria.servicio.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService servicio;

    public ProductoController(ProductoService servicio){
        this.servicio = servicio;
    }

    @GetMapping
    public List<Producto> listar(){
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public Producto obtener(@PathVariable String id){
        return servicio.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Producto crear(@Valid @RequestBody Producto producto){
        return servicio.crear(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable String id, @Valid @RequestBody Producto producto){
        return servicio.actualizar(id, producto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable String id){
        servicio.eliminar(id);
    }
}

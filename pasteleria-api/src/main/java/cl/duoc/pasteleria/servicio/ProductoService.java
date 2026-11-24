package cl.duoc.pasteleria.servicio;

import cl.duoc.pasteleria.error.RecursoNoEncontradoException;
import cl.duoc.pasteleria.modelo.Producto;
import cl.duoc.pasteleria.repositorio.ProductoRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductoService {
    private final ProductoRepository repositorio;

    public ProductoService(ProductoRepository repositorio){
        this.repositorio = repositorio;
    }
    public List<Producto> listar(){
        return repositorio.findAll(Sort.by("nombre"));
    }
    public Producto buscar(String id){
        return repositorio.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("No existe el producto"+ id));
    }
    public Producto crear(Producto producto){
        producto.setId(UUID.randomUUID().toString());
        if (producto.getActivo() == null){
            producto.setActivo(true);
        }
        return repositorio.save(producto);
    }

    public Producto actualizar(String id, Producto datos){
        Producto actual = buscar(id);
        actual.setNombre(datos.getNombre());
        actual.setDescripcion(datos.getDescripcion());
        actual.setCategoria(datos.getCategoria());
        actual.setPrecio(datos.getPrecio());
        actual.setPrecioAnterior(datos.getPrecioAnterior());
        actual.setImagen(datos.getImagen());
        actual.setStock(datos.getStock());
        if (datos.getActivo() != null){
            actual.setActivo(datos.getActivo());
        }
        return repositorio.save(actual);

    }

    public void eliminar(String id){
        repositorio.delete(buscar(id));
    }
}

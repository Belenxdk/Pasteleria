package cl.duoc.pasteleria.repositorio;

import cl.duoc.pasteleria.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, String> {
}

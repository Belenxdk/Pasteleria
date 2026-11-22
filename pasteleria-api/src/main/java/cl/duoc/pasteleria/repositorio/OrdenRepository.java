package cl.duoc.pasteleria.repositorio;

import cl.duoc.pasteleria.modelo.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdenRepository extends JpaRepository<Orden,String> {
}

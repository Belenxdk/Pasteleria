package cl.duoc.pasteleria.error;

public class RecursoNoEncontradoException extends RuntimeException {
    public RecursoNoEncontradoException(String mensaje){
        super(mensaje);
    }
}

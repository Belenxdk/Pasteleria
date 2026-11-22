package cl.duoc.pasteleria.error;

public class StockInsuficienteException extends RuntimeException{

    public StockInsuficienteException(String mensaje){
        super(mensaje);
    }

}

package cl.duoc.pasteleria.error;

public class CredencialesInvalidasException extends RuntimeException{
    public CredencialesInvalidasException(){
        super("El correo o la contraseña es INCORRECTA");
    }
}

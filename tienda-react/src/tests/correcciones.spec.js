import { agregarProducto, cambiarCantidad } from '../utils/carrito.js';
import { leerCarrito } from '../utils/almacenamiento.js';
import { guardarContacto } from '../utils/contacto.js';
describe('Carrito y contacto', () => {
  it('limita cantidades y rechaza productos agotados', () => {
    const p = { id: 'p', nombre: 'Torta', precio: 1000, stock: 1, activo: true };
    const carrito = agregarProducto([], p);
    expect(() => agregarProducto(carrito, p)).toThrowError();
    expect(() => cambiarCantidad(carrito, 'p', 2)).toThrowError();
    expect(() => agregarProducto([], { ...p, stock: 0 })).toThrowError();
  });
  it('recupera un carrito vacío si los datos no son una lista', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{}');
    expect(leerCarrito()).toEqual([]);
  });
  it('guarda un mensaje de contacto válido en el almacenamiento simulado', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    const guardar = spyOn(Storage.prototype, 'setItem');
    const mensaje = guardarContacto({ nombre: 'Cliente Prueba', correo: 'prueba@example.com', telefono: '', asunto: 'Pedido especial', mensaje: 'Quiero consultar por una torta.' });
    expect(mensaje.id).toBeTruthy();
    expect(guardar).toHaveBeenCalledWith('milsabores_contactos', JSON.stringify([mensaje]));
  });
});

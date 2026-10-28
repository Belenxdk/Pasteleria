import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../data/productos.js";

import {
  registrarUsuario,
  listarUsuarios,
} from "../data/usuarios.js";

import {
  iniciarSesion,
  obtenerSesion,
  cerrarSesion,
} from "../data/auth.js";

import {
  crearOrden,
  listarOrdenes,
  obtenerOrden,
  actualizarEstadoOrden,
} from "../data/ordenes.js";

describe("Pastelería Mil Sabores: lógica de datos", () => {
  let cliente;
  let producto;
  let datosCliente;

  beforeEach(() => {
    // Cada prueba utiliza almacenamiento falso independiente.
    const localFalso = new Map();
    const sesionFalsa = new Map();

    function seleccionarAlmacenamiento(storage) {
      return storage === window.localStorage
        ? localFalso
        : sesionFalsa;
    }

    spyOn(Storage.prototype, "getItem").and.callFake(function (clave) {
      const almacen = seleccionarAlmacenamiento(this);
      return almacen.has(clave) ? almacen.get(clave) : null;
    });

    spyOn(Storage.prototype, "setItem").and.callFake(function (
      clave,
      valor
    ) {
      seleccionarAlmacenamiento(this).set(clave, String(valor));
    });

    spyOn(Storage.prototype, "removeItem").and.callFake(function (clave) {
      seleccionarAlmacenamiento(this).delete(clave);
    });

    datosCliente = {
      run: "123456785",
      nombre: "Cliente",
      apellidos: "Prueba",
      email: "cliente.prueba@gmail.com",
      direccion: "Calle de Prueba 123",
      password: "Demo123",
      confirmarPassword: "Demo123",
    };

    cliente = registrarUsuario(datosCliente);

    producto = crearProducto({
      nombre: "Torta de prueba",
      descripcion: "Producto ficticio para testing",
      categoria: "Tortas",
      precio: 10000,
      imagen: "/img/productos/tortaChocolate.jpg",
      stock: 5,
    });
  });

  it("01. Crea un producto y permite consultarlo por ID", () => {
    const guardado = obtenerProducto(producto.id);

    expect(producto.id).toBeTruthy();
    expect(guardado.nombre).toBe("Torta de prueba");
    expect(guardado.precio).toBe(10000);
  });

  it("02. Actualiza un producto sin duplicarlo ni cambiar su ID", () => {
    const cantidadAnterior = listarProductos().length;

    actualizarProducto(producto.id, {
      precio: 12500,
      stock: 3,
    });

    const actualizado = obtenerProducto(producto.id);

    expect(actualizado.id).toBe(producto.id);
    expect(actualizado.precio).toBe(12500);
    expect(actualizado.stock).toBe(3);
    expect(listarProductos().length).toBe(cantidadAnterior);
  });

  it("03. Elimina solo el producto seleccionado", () => {
    const otro = crearProducto({
      nombre: "Otro producto",
      categoria: "Tortas",
      precio: 5000,
      stock: 2,
    });

    eliminarProducto(producto.id);

    expect(obtenerProducto(producto.id)).toBeUndefined();
    expect(obtenerProducto(otro.id)).toBeDefined();
  });

  it("04. Rechaza un precio negativo sin guardar el cambio", () => {
    expect(() => {
      actualizarProducto(producto.id, { precio: -1000 });
    }).toThrowError();

    expect(obtenerProducto(producto.id).precio).toBe(10000);
  });

  it("05. Rechaza un correo duplicado sin crear otra cuenta", () => {
    const cantidadAnterior = listarUsuarios().length;

    expect(() => {
      registrarUsuario({
        ...datosCliente,
        email: "CLIENTE.PRUEBA@GMAIL.COM",
      });
    }).toThrowError("Ese correo ya está registrado.");

    expect(listarUsuarios().length).toBe(cantidadAnterior);
  });

  it("06. Inicia y cierra sesión sin incluir la contraseña en la sesión", () => {
    const sesion = iniciarSesion(datosCliente.email, "Demo123");

    expect(sesion.id).toBe(cliente.id);
    expect(obtenerSesion().rol).toBe("cliente");
    expect(obtenerSesion().password).toBeUndefined();

    cerrarSesion();

    expect(obtenerSesion()).toBeNull();
  });

  it("07. Rechaza una contraseña incorrecta sin iniciar sesión", () => {
    expect(() => {
      iniciarSesion(datosCliente.email, "Incorrecta");
    }).toThrowError("Correo o contraseña incorrectos.");

    expect(obtenerSesion()).toBeNull();
  });

  it("08. Calcula el total y conserva el precio original de la compra", () => {
    const orden = crearOrden({
      usuarioId: cliente.id,
      items: [
        {
          productoId: producto.id,
          cantidad: 2,
        },
      ],
    });

    expect(orden.total).toBe(20000);
    expect(orden.items[0].subtotal).toBe(20000);

    actualizarProducto(producto.id, { precio: 15000 });

    const guardada = obtenerOrden(orden.id);

    expect(guardada.items[0].precioUnitario).toBe(10000);
    expect(guardada.total).toBe(20000);
  });

  it("09. Rechaza productos repetidos cuya cantidad total supera el stock", () => {
    expect(() => {
      crearOrden({
        usuarioId: cliente.id,
        items: [
          { productoId: producto.id, cantidad: 3 },
          { productoId: producto.id, cantidad: 3 },
        ],
      });
    }).toThrowError();

    expect(listarOrdenes().length).toBe(0);
  });

  it("10. Guarda un estado válido y rechaza uno desconocido", () => {
    const orden = crearOrden({
      usuarioId: cliente.id,
      items: [
        {
          productoId: producto.id,
          cantidad: 1,
        },
      ],
    });

    actualizarEstadoOrden(orden.id, "En preparación");

    expect(obtenerOrden(orden.id).estado).toBe("En preparación");

    expect(() => {
      actualizarEstadoOrden(orden.id, "Estado inventado");
    }).toThrowError("El estado seleccionado no es válido.");

    expect(obtenerOrden(orden.id).estado).toBe("En preparación");
  });

  it("11. Reserva stock y rechaza una segunda compra sin existencias", () => {
    crearOrden({ usuarioId: cliente.id, items: [{ productoId: producto.id, cantidad: 5 }] });
    expect(obtenerProducto(producto.id).stock).toBe(0);
    expect(() => crearOrden({ usuarioId: cliente.id, items: [{ productoId: producto.id, cantidad: 1 }] })).toThrowError();
    expect(listarOrdenes().length).toBe(1);
  });
  it("12. Rechaza un total cambiado sin descontar stock ni guardar orden", () => {
    actualizarProducto(producto.id, { precio: 12000 });
    expect(() => crearOrden({ usuarioId: cliente.id, items: [{ productoId: producto.id, cantidad: 1 }], totalEsperado: 10000 })).toThrowError();
    expect(obtenerProducto(producto.id).stock).toBe(5);
    expect(listarOrdenes().length).toBe(0);
  });
  it("13. Cancelar devuelve stock una sola vez y no permite reactivar", () => {
    const orden = crearOrden({ usuarioId: cliente.id, items: [{ productoId: producto.id, cantidad: 2 }] });
    actualizarEstadoOrden(orden.id, 'Cancelada');
    actualizarEstadoOrden(orden.id, 'Cancelada');
    expect(obtenerProducto(producto.id).stock).toBe(5);
    expect(() => actualizarEstadoOrden(orden.id, 'Pendiente')).toThrowError();
  });
});
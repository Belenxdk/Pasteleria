import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../data/productos.js";
import { registrarUsuario, listarUsuarios } from "../data/usuarios.js";
import { iniciarSesion, registrarse, obtenerSesion, cerrarSesion } from "../data/auth.js";
import {
  crearOrden,
  listarOrdenes,
  obtenerOrden,
  actualizarEstadoOrden,
} from "../data/ordenes.js";
import {
  listarUsuarios as listarUsuariosApi,
  crearUsuario as crearUsuarioApi,
  actualizarUsuario as actualizarUsuarioApi,
  eliminarUsuario as eliminarUsuarioApi,
} from "../servicios/usuarios.js";
import api from "../servicios/api.js";

describe("Pastelería Mil Sabores: lógica y servicios", () => {
  let cliente;
  let producto;
  let datosCliente;

  beforeEach(() => {
    // Las pruebas antiguas de datos locales usan almacenamiento simulado.
    const localFalso = new Map();
    const sesionFalsa = new Map();

    function seleccionarAlmacenamiento(storage) {
      return storage === window.localStorage ? localFalso : sesionFalsa;
    }

    spyOn(Storage.prototype, "getItem").and.callFake(function (clave) {
      const almacen = seleccionarAlmacenamiento(this);
      return almacen.has(clave) ? almacen.get(clave) : null;
    });

    spyOn(Storage.prototype, "setItem").and.callFake(function (clave, valor) {
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

  it("01. Crea un producto y permite consultarlo por ID (datos locales)", () => {
    const guardado = obtenerProducto(producto.id);
    expect(producto.id).toBeTruthy();
    expect(guardado.nombre).toBe("Torta de prueba");
    expect(guardado.precio).toBe(10000);
  });

  it("02. Actualiza un producto sin duplicarlo (datos locales)", () => {
    const cantidadAnterior = listarProductos().length;
    actualizarProducto(producto.id, { precio: 12500, stock: 3 });
    const actualizado = obtenerProducto(producto.id);
    expect(actualizado.id).toBe(producto.id);
    expect(actualizado.precio).toBe(12500);
    expect(actualizado.stock).toBe(3);
    expect(listarProductos().length).toBe(cantidadAnterior);
  });

  it("03. Elimina solo el producto seleccionado (datos locales)", () => {
    const otro = crearProducto({ nombre: "Otro producto", categoria: "Tortas", precio: 5000, stock: 2 });
    eliminarProducto(producto.id);
    expect(obtenerProducto(producto.id)).toBeUndefined();
    expect(obtenerProducto(otro.id)).toBeDefined();
  });

  it("04. Rechaza un precio negativo (datos locales)", () => {
    expect(() => actualizarProducto(producto.id, { precio: -1000 })).toThrowError();
    expect(obtenerProducto(producto.id).precio).toBe(10000);
  });

  it("05. Rechaza un correo duplicado (datos locales)", () => {
    const cantidadAnterior = listarUsuarios().length;
    expect(() => registrarUsuario({
      ...datosCliente,
      email: "CLIENTE.PRUEBA@GMAIL.COM",
    })).toThrowError("Ese correo ya está registrado.");
    expect(listarUsuarios().length).toBe(cantidadAnterior);
  });

  it("06. Inicia sesión con la API y guarda el JWT sin la contraseña", async () => {
    const post = spyOn(api, "post").and.resolveTo({ data: {
      token: "jwt-prueba",
      nombre: "Cliente",
      email: datosCliente.email,
      rol: "CLIENTE",
    } });

    const sesion = await iniciarSesion(datosCliente.email, datosCliente.password);
    expect(post).toHaveBeenCalledWith("/auth/login", {
      email: datosCliente.email,
      password: datosCliente.password,
    });
    expect(sesion.id).toBe(datosCliente.email);
    expect(obtenerSesion().rol).toBe("CLIENTE");
    expect(obtenerSesion().token).toBe("jwt-prueba");
    expect(obtenerSesion().password).toBeUndefined();

    cerrarSesion();
    expect(obtenerSesion()).toBeNull();
  });

  it("07. Rechaza un inicio de sesión incorrecto desde la API", async () => {
    spyOn(api, "post").and.returnValue(Promise.reject({ response: { status: 401 } }));
    await expectAsync(iniciarSesion(datosCliente.email, "Incorrecta"))
      .toBeRejectedWithError("Correo o contraseña incorrectos.");
    expect(obtenerSesion()).toBeNull();
  });

  it("08. Calcula y conserva el precio original de una compra (datos locales)", () => {
    const orden = crearOrden({
      usuarioId: cliente.id,
      items: [{ productoId: producto.id, cantidad: 2 }],
    });
    expect(orden.total).toBe(20000);
    expect(orden.items[0].subtotal).toBe(20000);
    actualizarProducto(producto.id, { precio: 15000 });
    const guardada = obtenerOrden(orden.id);
    expect(guardada.items[0].precioUnitario).toBe(10000);
    expect(guardada.total).toBe(20000);
  });

  it("09. Rechaza cantidades que superan el stock (datos locales)", () => {
    expect(() => crearOrden({
      usuarioId: cliente.id,
      items: [
        { productoId: producto.id, cantidad: 3 },
        { productoId: producto.id, cantidad: 3 },
      ],
    })).toThrowError();
    expect(listarOrdenes().length).toBe(0);
  });

  it("10. Acepta un estado válido y rechaza uno desconocido (datos locales)", () => {
    const orden = crearOrden({
      usuarioId: cliente.id,
      items: [{ productoId: producto.id, cantidad: 1 }],
    });
    actualizarEstadoOrden(orden.id, "En preparación");
    expect(obtenerOrden(orden.id).estado).toBe("En preparación");
    expect(() => actualizarEstadoOrden(orden.id, "Estado inventado"))
      .toThrowError("El estado seleccionado no es válido.");
    expect(obtenerOrden(orden.id).estado).toBe("En preparación");
  });

  it("11. Registra una cuenta mediante la API y guarda la sesión", async () => {
    const post = spyOn(api, "post").and.resolveTo({ data: {
      token: "jwt-nuevo",
      nombre: "Persona nueva",
      email: "nuevo@gmail.com",
      rol: "CLIENTE",
    } });
    const sesion = await registrarse(" Persona nueva ", " NUEVO@gmail.com ", "Clave123");
    expect(post).toHaveBeenCalledWith("/auth/registro", {
      nombre: "Persona nueva",
      email: "nuevo@gmail.com",
      password: "Clave123",
    });
    expect(sesion.rol).toBe("CLIENTE");
    expect(obtenerSesion().token).toBe("jwt-nuevo");
    expect(obtenerSesion().password).toBeUndefined();
  });

  it("12. El CRUD de usuarios usa los endpoints de la API", async () => {
    const usuariosApi = [{ id: 4, nombre: "Ana", email: "ana@gmail.com", rol: "CLIENTE" }];
    const get = spyOn(api, "get").and.resolveTo({ data: usuariosApi });
    const post = spyOn(api, "post").and.resolveTo({ data: usuariosApi[0] });
    const put = spyOn(api, "put").and.resolveTo({ data: usuariosApi[0] });
    const borrar = spyOn(api, "delete").and.resolveTo({});
    const datos = { nombre: "Ana", email: "ana@gmail.com", password: "Clave123", rol: "CLIENTE" };

    expect(await listarUsuariosApi()).toEqual(usuariosApi);
    expect(get).toHaveBeenCalledWith("/usuarios");
    await crearUsuarioApi(datos);
    expect(post).toHaveBeenCalledWith("/usuarios", datos);
    await actualizarUsuarioApi(4, { nombre: "Ana", email: "ana@gmail.com", rol: "CLIENTE" });
    expect(put).toHaveBeenCalledWith("/usuarios/4", { nombre: "Ana", email: "ana@gmail.com", rol: "CLIENTE" });
    await eliminarUsuarioApi(4);
    expect(borrar).toHaveBeenCalledWith("/usuarios/4");
  });

  it("13. Muestra el error de correo duplicado enviado por el backend", async () => {
    spyOn(api, "post").and.returnValue(Promise.reject({
      response: { status: 409, data: { mensaje: "Ya existe un usuario con ese correo" } },
    }));
    await expectAsync(registrarse("Ana", "ana@gmail.com", "Clave123"))
      .toBeRejectedWithError("Ya existe un usuario con ese correo");
    expect(obtenerSesion()).toBeNull();
  });
});

import {
  agregarProducto,
  cambiarCantidad,
  eliminarItem,
  calcularTotal,
  cantidadTotal,
  armarItemsOrden,
} from "../utils/carrito.js";
import { leerCarrito, guardarCarrito } from "../utils/almacenamiento.js";

describe("Carrito: lógica de utils/carrito.js", () => {
  const brownies = { id: "brownies", nombre: "Brownies", precio: 7500 };
  const cupcakes = { id: "cupcakes", nombre: "Cupcakes", precio: 9000 };

  it("agrega un producto nuevo con cantidad 1", () => {
    const resultado = agregarProducto([], brownies);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(1);
  });

  it("suma la cantidad si el producto ya estaba y no modifica el carrito original", () => {
    const inicial = [{ ...brownies, cantidad: 1 }];
    const resultado = agregarProducto(inicial, brownies);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(2);
    expect(inicial[0].cantidad).toBe(1);
  });

  it("cambiarCantidad actualiza la cantidad y elimina el producto si llega a 0", () => {
    const carrito = [{ ...brownies, cantidad: 2 }];

    expect(cambiarCantidad(carrito, "brownies", 5)[0].cantidad).toBe(5);
    expect(cambiarCantidad(carrito, "brownies", 0).length).toBe(0);
  });

  it("eliminarItem quita solo el producto indicado", () => {
    const carrito = [
      { ...brownies, cantidad: 1 },
      { ...cupcakes, cantidad: 1 },
    ];
    const resultado = eliminarItem(carrito, "brownies");

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe("cupcakes");
  });

  it("calcula el total a pagar y la cantidad de unidades", () => {
    const carrito = [
      { ...brownies, cantidad: 2 },
      { ...cupcakes, cantidad: 1 },
    ];

    expect(calcularTotal(carrito)).toBe(24000);
    expect(cantidadTotal(carrito)).toBe(3);
  });

  it("armarItemsOrden convierte el carrito al formato que pide crearOrden", () => {
    const carrito = [{ ...brownies, cantidad: 2 }];

    expect(armarItemsOrden(carrito)).toEqual([{ productoId: "brownies", cantidad: 2 }]);
  });
});

describe("Carrito: almacenamiento con mocks", () => {
  it("leerCarrito devuelve el carrito guardado (getItem simulado)", () => {
    const guardado = [{ id: "brownies", precio: 7500, cantidad: 2 }];
    spyOn(Storage.prototype, "getItem").and.returnValue(JSON.stringify(guardado));

    expect(leerCarrito()).toEqual(guardado);
  });

  it("leerCarrito devuelve un carrito vacío si lo guardado está dañado", () => {
    spyOn(Storage.prototype, "getItem").and.returnValue("esto-no-es-json");

    expect(leerCarrito()).toEqual([]);
  });

  it("guardarCarrito guarda el carrito como texto JSON (setItem simulado)", () => {
    const carrito = [{ id: "brownies", precio: 7500, cantidad: 1 }];
    const setItem = spyOn(Storage.prototype, "setItem");

    guardarCarrito(carrito);

    expect(setItem).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(carrito));
  });
});
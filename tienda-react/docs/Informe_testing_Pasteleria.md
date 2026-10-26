# Informe de cobertura de testing
## Pastelería Mil Sabores

**Nombre:** Eduardo Aguirre  
**Asignatura:** DSY1104 — Desarrollo Fullstack II  
**Fecha de las pruebas:** 25 de octubre de 2026  
**Rama:** edu  
**Commit con las pruebas:** 5a2449c

## 1. Objetivo

En este informe explico las pruebas que realicé para revisar parte del funcionamiento de Pastelería Mil Sabores. Mi parte del proyecto incluye los datos simulados, el registro e inicio de sesión, la administración y las pruebas.

El objetivo fue comprobar que las funciones respondieran correctamente al crear, modificar y eliminar datos, y que rechazaran algunos datos inválidos. También revisé la cobertura para saber qué parte del código se ejecutó durante las pruebas.

## 2. Herramientas utilizadas

Utilicé Jasmine para escribir las pruebas y Karma para ejecutarlas en el navegador. Las pruebas están en `src/tests/sistema.spec.js` y la configuración está en `karma.conf.cjs`.

Al principio no pude ejecutarlas porque Karma no encontraba Google Chrome. Lo solucioné usando Microsoft Edge e indicando la ubicación de su ejecutable en la variable `CHROME_BIN` de PowerShell. Después ejecuté:

```powershell
npm test
```

La ejecución se realizó con Karma 6.4.4 y Microsoft Edge 156.0.0.0. Si abro una terminal nueva, debo volver a configurar esa variable cuando sea necesario.

## 3. Pruebas realizadas

La suite contiene diez pruebas enfocadas en productos, usuarios, sesiones y órdenes.

| N.º | Prueba | Qué se comprueba |
| --- | --- | --- |
| 1 | Crear un producto | Que se guarden sus datos y se le asigne un identificador. |
| 2 | Actualizar un producto | Que cambien el precio y el stock sin crear otro registro. |
| 3 | Eliminar un producto | Que se elimine el producto elegido y se conserve otro. |
| 4 | Rechazar un precio negativo | Que se muestre un error y se mantenga el precio anterior. |
| 5 | Rechazar un correo repetido | Que no se registre nuevamente el mismo correo, aunque esté escrito con mayúsculas. |
| 6 | Iniciar y cerrar sesión | Que el usuario pueda ingresar y salir, y que la sesión no incluya su contraseña. |
| 7 | Rechazar una contraseña incorrecta | Que no se cree una sesión cuando la contraseña sea incorrecta. |
| 8 | Calcular y conservar el total de una orden | Que el total sea correcto y que editar el precio del producto no cambie una orden ya creada. |
| 9 | Rechazar una orden que supera el stock | Que se sumen las cantidades del mismo producto y no se guarde la orden si falta stock. |
| 10 | Cambiar el estado de una orden | Que se acepte un estado permitido y se rechace uno inválido. |

El resultado de la ejecución fue **10 pruebas aprobadas de 10**, sin fallos.

## 4. Uso de mocks

Para las pruebas utilicé almacenamiento simulado en lugar de depender de los datos guardados en el navegador.

Con los spies de Jasmine reemplacé las operaciones `getItem`, `setItem` y `removeItem`. Usé mapas separados para simular localStorage y sessionStorage. Estos datos se reinician antes de cada prueba, para que el resultado de una no afecte a las demás.

Esto permite trabajar con usuarios y productos ficticios, y repetir las pruebas con las mismas condiciones.

## 5. Resultados de cobertura

El reporte mostró los siguientes resultados:

| Métrica | Porcentaje | Cantidad cubierta |
| --- | ---: | ---: |
| Sentencias | 67.17 % | 133 de 198 |
| Ramas de decisión | 56.25 % | 81 de 144 |
| Funciones | 75 % | 30 de 40 |
| Líneas | 67.93 % | 125 de 184 |

La cobertura indica cuánto código se ejecutó durante las pruebas. Por ejemplo, se ejecutaron 30 de las 40 funciones contabilizadas.

Estos resultados corresponden a los archivos de datos incluidos en la medición, no a toda la aplicación. Aunque las diez pruebas pasaron, todavía existen funciones y caminos de decisión que no fueron cubiertos.

La terminal mostró:

```text
Edge 156.0.0.0 (Windows 10): Executed 10 of 10 SUCCESS
TOTAL: 10 SUCCESS

Statements : 67.17% (133/198)
Branches   : 56.25% (81/144)
Functions  : 75% (30/40)
Lines      : 67.93% (125/184)
```

## 6. Comprobación de la compilación

Después de las pruebas ejecuté:

```powershell
npm run build
```

La compilación con Vite 8.3.4 terminó sin errores. Se transformaron 346 módulos y el proceso demoró 2.63 segundos.

Esto confirma que se pudieron generar los archivos de producción. De todas formas, también es necesario revisar el funcionamiento de la página y sus recorridos desde el navegador.

## 7. Aspectos pendientes

Estas pruebas se enfocan en la lógica de datos. No comprueban por sí solas los componentes visuales, la navegación ni el recorrido completo desde el carrito hasta el checkout y la creación de la orden.

También quedan caminos de error y operaciones que se pueden cubrir con más pruebas. Una mejora sería ampliar estos casos y revisar la integración de mi parte con la tienda pública.

## 8. Conclusión

Con estas pruebas pude comprobar los casos seleccionados de productos, usuarios, sesiones y órdenes. Las diez pruebas pasaron y la compilación terminó correctamente.

La cobertura me permitió ver que todavía hay código sin probar. Por eso, estos resultados sirven como una verificación de las funciones revisadas, pero no significan que toda la aplicación esté completamente probada.

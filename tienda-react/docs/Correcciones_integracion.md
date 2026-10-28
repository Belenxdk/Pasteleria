# Correcciones de integración

Base: rama belen-checkout, commit 1d85dcb.

- Stock visible en tarjetas; agotados sin botón habilitado.
- Reserva de stock al comprar y devolución una sola vez al cancelar nuevas órdenes. Las órdenes históricas sin reserva no aumentan el stock al cancelarse.
- Carrito con límites y revisión de precios/disponibilidad antes de confirmar. Si cambia el pedido, requiere otra confirmación.
- Favoritos ocultan productos inactivos.
- Navegación adaptable, sesión visible y cierre de sesión que protege inmediatamente administración.
- Contacto guardado en el navegador como simulación explícita, sin prometer envío real.
- Enlace Blog retirado temporalmente porque no existe página. No se creó contenido ficticio.
- Título e idioma del documento corregidos. Colores originales conservados.

## Validación

Build y lint correctos. Karma/Jasmine: 16 pruebas aprobadas.
Cobertura instrumentada de src/data: sentencias 68.60%, ramas 58.64%, funciones 77.27%, líneas 69.11%.
Comprobación en navegador: sin desbordamiento horizontal en 320, 390, 768, 1024 y 1440 px; compra tras cambio de precio; stock; sesión; contacto.

## Ejecución

En tienda-react ejecutar npm ci y npm run dev.
Para npm test hace falta Chrome; también se puede configurar CHROME_BIN con la ruta de Edge, como en el equipo de Eduardo.

Este proyecto sigue siendo una simulación local: no tiene servidor, envío de correos ni cobro real. Los datos de cada navegador son independientes. Las operaciones de stock usan almacenamiento local; no son un inventario compartido entre computadores.

El ZIP contiene código fuente, no .git ni node_modules. Para conservar el historial, incorporar las correcciones al repositorio clonado. No se publicaron cambios en GitHub.

## Validación después de integrar las pruebas de Belén

- 25 de 25 pruebas aprobadas en Edge.
- Compilación de producción correcta.
- Lint: 0 errores y 0 advertencias.
- Cobertura de src/data y src/utils:
  - Sentencias: 73,17 %.
  - Ramas: 62,73 %.
  - Funciones: 84,37 %.
  - Líneas: 73,12 %.
- Estos resultados actualizan la validación anterior de 16 pruebas.

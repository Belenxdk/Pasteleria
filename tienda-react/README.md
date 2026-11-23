# Pastelería Mil Sabores - Frontend

Frontend en React 19 y Vite 8 para la Evaluación Parcial 3 de DSY1104.
La tienda consume la API Spring Boot que está en la carpeta `pasteleria-api` del mismo repositorio.

## Requisitos

- Node.js (recomendado: 22 o superior)
- Backend encendido y conectado a MySQL o MariaDB

## Iniciar

1. Abrir una terminal en `tienda-react`.
2. Instalar dependencias: `npm ci`.
3. Si el backend está en el puerto 8080, usar el valor de `VITE_API_URL` que trae `.env.development`.
4. Si el backend está en el puerto 8081, crear un archivo `.env.local` con esta línea:

   ```env
   VITE_API_URL=http://localhost:8081/api/v1
   ```

5. Ejecutar `npm run dev` y abrir `http://localhost:5173`.

`npm run build` compila el frontend. En despliegues se debe configurar la URL de la API o un proxy para `/api/v1`; el modo producción no incluye por sí solo un servidor backend.

## Cuentas de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| ADMIN | admin@milsabores.cl | Admin123 |
| VENDEDOR | vendedor@milsabores.cl | Vendedor123 |
| CLIENTE | cliente@milsabores.cl | Cliente123 |

Son cuentas de prueba creadas por el backend.

## Funciones

- Catálogo y carrito de compra.
- Registro e inicio de sesión conectados al backend, con JWT guardado en `sessionStorage`.
- Checkout que registra una orden en la API.
- Panel de administración con permisos según rol.
- CRUD de productos desde la API.
- CRUD de usuarios desde la API, solo para ADMIN.
- Consulta de órdenes según permisos.

La API tiene que estar encendida para registrar cuentas, iniciar sesión y trabajar con los datos reales.

## Pruebas

```powershell
npm run build
npm test
```

El comando `npm test` usa Karma y ChromeHeadless. Si la prueba no encuentra Chrome en Windows, se puede definir `CHROME_BIN` con la ubicación de Chrome o Edge.

Las pruebas del archivo `src/tests/sistema.spec.js` incluyen casos antiguos de lógica local como pruebas unitarias aisladas. Las pruebas nuevas del login, registro y servicio de usuarios simulan respuestas HTTP (mocks), por lo que **no reemplazan** las pruebas manuales con Spring Boot y MySQL.

## Backend

Consultar `../pasteleria-api/README.MD`. El backend necesita Java 21, MySQL/MariaDB y la variable `JWT_SECRET`.

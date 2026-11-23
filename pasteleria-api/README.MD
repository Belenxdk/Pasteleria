# API Pastelería Mil Sabores

Backend de la tienda Pastelería Mil Sabores (DSY1104, Evaluación Parcial 3).
Spring Boot 4.1.2, Java 21, Spring Data JPA, MySQL, Spring Security con JWT y documentación en Swagger.

## Requisitos

- Java 21
- MySQL 8 en el puerto 3306 (también se probó con la MariaDB de XAMPP)

## Base de datos

Crear la base vacía. Las tablas se generan solas al iniciar la API.

```sql
CREATE DATABASE pasteleria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Variables de entorno

| Variable | Uso |
|---|---|
| `JWT_SECRET` | Obligatoria. Clave para firmar los tokens, de al menos 32 caracteres. |
| `DB_PASSWORD` | Opcional. Contraseña del usuario root de MySQL. Si no se define, se usa una contraseña vacía. |
| `SERVER_PORT` | Opcional. Puerto de la API. Por defecto 8080. |

## Cómo ejecutar

En PowerShell, dentro de esta carpeta:

```powershell
$env:JWT_SECRET="una-frase-de-prueba-de-mas-de-32-caracteres"
$env:DB_PASSWORD="la_clave_de_mysql"
.\mvnw spring-boot:run
```

También se puede ejecutar desde IntelliJ, definiendo las variables en Run > Edit Configurations > Environment variables.

## Documentación de la API

Swagger: http://localhost:8080/swagger-ui.html

Para probar rutas protegidas: ejecutar `POST /api/v1/auth/login`, copiar el token, pulsar **Authorize** y pegarlo sin la palabra `Bearer`.

## Usuarios de prueba

Se crean al iniciar la API. Son solo para desarrollo.

| Rol | Correo | Contraseña |
|---|---|---|
| ADMIN | admin@milsabores.cl | Admin123 |
| VENDEDOR | vendedor@milsabores.cl | Vendedor123 |
| CLIENTE | cliente@milsabores.cl | Cliente123 |

## Endpoints y permisos

| Método | Ruta | Acceso |
|---|---|---|
| POST | /api/v1/auth/login | Público |
| POST | /api/v1/auth/renovar | Token vigente |
| GET | /api/v1/productos, /api/v1/productos/{id} | Público |
| POST, PUT, DELETE | /api/v1/productos | ADMIN |
| POST | /api/v1/ordenes | CLIENTE y ADMIN |
| GET | /api/v1/ordenes, /api/v1/ordenes/{id} | ADMIN y VENDEDOR |

El comprador de una orden se toma del token, no del cuerpo de la solicitud. Al crear una orden se valida el stock y se descuenta en una transacción.

## Pruebas

```powershell
.\mvnw test
```

## Estructura

`config` (seguridad, CORS, Swagger), `controlador`, `dto`, `error`, `modelo`, `repositorio` y `servicio`.
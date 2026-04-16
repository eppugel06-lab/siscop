# API Documentation — [Nombre del Proyecto]

## Base URL
```
Producción:  https://api.ejemplo.com/v1
Staging:     https://staging-api.ejemplo.com/v1
Local:       http://localhost:8000/v1
```

## Autenticación
```
Todos los endpoints (excepto los marcados como públicos) requieren:
Header: Authorization: Bearer {token}

Obtener token: POST /auth/login
Refrescar token: POST /auth/refresh
```

## Endpoints

### [Módulo 1]

#### `GET /recurso` — Listar
```
Auth: Requerido
Permisos: recurso:read
Query params: page, limit, sort, order, search, status
Response: 200 OK con paginación
```

#### `GET /recurso/:id` — Obtener uno
```
Auth: Requerido
Permisos: recurso:read
Response: 200 OK | 404 Not Found
```

#### `POST /recurso` — Crear
```
Auth: Requerido
Permisos: recurso:create
Body: { ... }
Response: 201 Created | 400 Validation Error
```

#### `PUT /recurso/:id` — Actualizar
```
Auth: Requerido
Permisos: recurso:update
Body: { ... }
Response: 200 OK | 404 Not Found
```

#### `DELETE /recurso/:id` — Eliminar
```
Auth: Requerido
Permisos: recurso:delete
Response: 204 No Content | 404 Not Found
```

---

## Respuestas Estándar

### Éxito
```json
{
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 42 }
}
```

### Error
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descripción del error",
    "details": [{ "field": "email", "message": "No es válido" }]
  }
}
```

## Status Codes
| Code | Uso |
|------|-----|
| 200 | OK |
| 201 | Creado |
| 204 | Eliminado (sin body) |
| 400 | Error de validación |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | No encontrado |
| 429 | Rate limit |
| 500 | Error del servidor |

## Rate Limiting
- Autenticado: 100 req/min
- Público: 20 req/min
- Header de respuesta: `X-RateLimit-Remaining`

## Swagger UI
Disponible en: `[URL]/docs`

---
id: API-XXX
title: "[Nombre del endpoint]"
method: "GET | POST | PUT | PATCH | DELETE"
path: "/api/v1/[recurso]"
uc: UC-XXX
auth: "Bearer JWT | Public | API Key"
---

## Descripción
[Qué hace este endpoint — 1 línea]

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | UUID | Sí | ID del recurso |

### Query Parameters
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Página actual |
| `limit` | integer | 20 | Items por página (max: 100) |
| `sort` | string | created_at | Campo de ordenamiento |
| `order` | string | desc | Dirección: asc, desc |

### Body (para POST/PUT/PATCH)
```json
{
  "campo_requerido": "valor",
  "campo_opcional": "valor"
}
```

### Validaciones
| Campo | Regla | Mensaje de Error |
|-------|-------|-----------------|
| `campo_requerido` | required, string, max:200 | "El campo es obligatorio" |

## Response

### 200 OK / 201 Created
```json
{
  "data": {
    "id": "uuid",
    "campo": "valor"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3
  }
}
```

### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos",
    "details": [
      { "field": "campo", "message": "Es obligatorio" }
    ]
  }
}
```

### 401 Unauthorized / 403 Forbidden / 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Recurso no encontrado"
  }
}
```

## Permisos
| Rol | Acceso |
|-----|--------|
| Superadmin | ✅ |
| Admin | ✅ |
| User | ⚠️ Solo propios |
| Guest | ❌ |

## Rate Limiting
- Autenticado: 100 req/min
- Público: 20 req/min

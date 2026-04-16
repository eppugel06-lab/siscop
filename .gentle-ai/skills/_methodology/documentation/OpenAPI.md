# 📖 OpenAPI / Swagger — Documentación de APIs

> **Referencia:** OpenAPI Specification 3.1  
> **Principio:** Toda API tiene un contrato documentado antes de implementarse.  
> El contrato es la fuente de verdad — no el código.

---

## 🎯 ¿Qué es OpenAPI?

OpenAPI (antes Swagger) es el estándar para describir APIs REST de manera formal y machine-readable. Un archivo OpenAPI genera automáticamente documentación interactiva, SDKs, mocks y tests.

---

## 📋 Estructura de un OpenAPI Spec

```yaml
openapi: 3.1.0
info:
  title: API de Presupuestos
  version: 1.0.0
  description: API REST para gestión de presupuestos y cotizaciones
  contact:
    name: Equipo de Desarrollo
    email: dev@empresa.com

servers:
  - url: https://api.empresa.com/v1
    description: Producción
  - url: https://staging-api.empresa.com/v1
    description: Staging
  - url: http://localhost:8000/v1
    description: Desarrollo local

paths:
  /budgets:
    get:
      summary: Listar presupuestos
      operationId: listBudgets
      tags: [Presupuestos]
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [draft, sent, approved, rejected]
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: Lista paginada de presupuestos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BudgetList'
        '401':
          $ref: '#/components/responses/Unauthorized'

    post:
      summary: Crear presupuesto
      operationId: createBudget
      tags: [Presupuestos]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBudgetRequest'
      responses:
        '201':
          description: Presupuesto creado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Budget'
        '400':
          $ref: '#/components/responses/ValidationError'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    Budget:
      type: object
      required: [id, clientId, items, total, status]
      properties:
        id:
          type: string
          format: uuid
        clientId:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: '#/components/schemas/BudgetItem'
          minItems: 1
        total:
          type: number
          format: decimal
          minimum: 0
        status:
          type: string
          enum: [draft, sent, approved, rejected]
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    BudgetItem:
      type: object
      required: [description, quantity, unitPrice]
      properties:
        description:
          type: string
          maxLength: 500
        quantity:
          type: integer
          minimum: 1
        unitPrice:
          type: number
          format: decimal
          minimum: 0.01

    CreateBudgetRequest:
      type: object
      required: [clientId, items]
      properties:
        clientId:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: '#/components/schemas/BudgetItem'
          minItems: 1
        notes:
          type: string
          maxLength: 2000

  responses:
    Unauthorized:
      description: Token de autenticación faltante o inválido
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ValidationError:
      description: Error de validación en los datos enviados
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
        details:
          type: array
          items:
            type: object

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

---

## 📋 Reglas para APIs del Sistema

### Nomenclatura de Endpoints
```
GET    /resources         → Listar (paginado)
GET    /resources/:id     → Obtener uno
POST   /resources         → Crear
PUT    /resources/:id     → Reemplazar completo
PATCH  /resources/:id     → Actualización parcial
DELETE /resources/:id     → Eliminar

Siempre plural: /budgets, /users, /orders
Nunca verbos: /getBudgets ❌, /createUser ❌
Recursos anidados: /budgets/:id/items (máximo 2 niveles)
```

### Respuestas Estándar
```json
// Éxito con datos
{ "data": { ... }, "meta": { "page": 1, "total": 42 } }

// Error
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }

// Paginación
{ "data": [...], "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 } }
```

### Status Codes
| Code | Significado | Cuándo |
|------|------------|--------|
| `200` | OK | GET exitoso, PUT/PATCH exitoso |
| `201` | Created | POST exitoso |
| `204` | No Content | DELETE exitoso |
| `400` | Bad Request | Validación falló |
| `401` | Unauthorized | Token faltante/inválido |
| `403` | Forbidden | Sin permisos para este recurso |
| `404` | Not Found | Recurso no existe |
| `409` | Conflict | Duplicado, estado inválido |
| `422` | Unprocessable | Datos válidos pero lógica de negocio rechaza |
| `429` | Too Many Requests | Rate limit excedido |
| `500` | Internal Error | Error del servidor (nunca exponer detalles) |

---

## 🛠️ Herramientas de Documentación

| Herramienta | Tipo | Uso |
|------------|------|-----|
| **Swagger UI** | Interactivo | Try it out desde el navegador |
| **Scalar** | Interactivo | Alternativa moderna a Swagger UI |
| **Redoc** | Estático | Documentación bonita de solo lectura |
| **Stoplight** | Editor | Editor visual de OpenAPI |

---

## ✅ Checklist API Documentation

- [ ] OpenAPI spec en `openapi.yaml` o `openapi.json`
- [ ] Todos los endpoints documentados con request/response
- [ ] Schemas con validaciones (required, min, max, enum)
- [ ] Ejemplos funcionales en cada endpoint
- [ ] Errores documentados (401, 403, 404, 422)
- [ ] Autenticación documentada en securitySchemes
- [ ] Versionado en la URL: `/api/v1/...`
- [ ] Swagger UI o Scalar accesible en `/docs`

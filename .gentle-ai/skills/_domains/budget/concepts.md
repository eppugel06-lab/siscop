# 📚 Conceptos del Dominio — Presupuestos (Budget)

> **Bounded Context:** Sistema de Presupuestos y Cotizaciones  
> **Ubiquitous Language:** Los términos aquí definidos son la única forma válida  
> de referirse a estos conceptos en código, documentación y conversación.

---

## 🏗️ Entidades Principales (Aggregates)

### Presupuesto (Budget) — Aggregate Root
```
El documento comercial central del sistema. Representa una propuesta económica
formal enviada a un cliente, detallando servicios/productos con precios.

Atributos:
  - id: UUID (inmutable)
  - código: string (auto-generado, formato: PRES-YYYY-NNNN)
  - cliente: referencia a Client (obligatorio)
  - fecha_emisión: date
  - fecha_vencimiento: date (default: emisión + 30 días)
  - estado: BudgetStatus (enum)
  - partidas: BudgetItem[] (mínimo 1)
  - subtotal: Money (calculado)
  - impuestos: Money (calculado)
  - descuento_global: Percentage (opcional)
  - total: Money (calculado: subtotal + impuestos - descuento)
  - notas: string (opcional)
  - condiciones_pago: string
  - moneda: Currency
  - created_by: referencia a User
  - versión: integer (para control de cambios)
```

### Partida (BudgetItem) — Entity dentro de Budget
```
Línea individual dentro del presupuesto que detalla un servicio o producto.

Atributos:
  - id: UUID
  - descripción: string (1-500 chars)
  - cantidad: integer (≥ 1)
  - unidad: string ("hora", "unidad", "mes", "proyecto")
  - precio_unitario: Money (> 0)
  - descuento: Percentage (0-100, opcional)
  - subtotal: Money (calculado: cantidad × precio_unitario × (1 - descuento))
  - orden: integer (posición en el presupuesto)
  - categoría: string (opcional, para agrupar)
```

### Cliente (Client) — Aggregate Root separado
```
La entidad comercial a quien se dirige el presupuesto.

Atributos:
  - id: UUID
  - nombre_comercial: string (obligatorio)
  - razón_social: string (para facturación)
  - RFC/NIT/RUT: string (identificador fiscal)
  - email: Email
  - teléfono: string
  - dirección: Address (value object)
  - contacto_principal: string
  - notas: string
  - activo: boolean
```

---

## 💎 Value Objects (Inmutables)

### Money
```
Representa un valor monetario con precisión.
  - amount: decimal (2 decimales)
  - currency: Currency enum (MXN, USD, EUR, COP)

Operaciones: sumar, restar, multiplicar por escalar, redondear
Regla: Nunca operar Money de diferentes monedas sin conversión explícita
```

### Percentage
```
Representa un porcentaje.
  - value: decimal (0.00 - 100.00)

Regla: Siempre almacenar como porcentaje (15.00), no como decimal (0.15)
```

### Address
```
Dirección postal completa.
  - calle: string
  - número: string
  - colonia: string
  - ciudad: string
  - estado: string
  - código_postal: string
  - país: string
```

### DateRange
```
Rango de fechas para vigencia.
  - desde: date
  - hasta: date

Invariante: hasta > desde
```

---

## 🔄 Estados del Presupuesto (BudgetStatus)

```
                    ┌──────────┐
                    │ Borrador │ (estado inicial)
                    │  DRAFT   │
                    └────┬─────┘
                         │ enviar()
                         ▼
                    ┌──────────┐
            ┌───── │ Enviado  │ ─────┐
            │      │   SENT   │      │
            │      └──────────┘      │
            │                        │
      aprobar()                rechazar()
            │                        │
            ▼                        ▼
     ┌──────────┐           ┌──────────────┐
     │ Aprobado │           │  Rechazado   │
     │ APPROVED │           │  REJECTED    │
     └────┬─────┘           └──────┬───────┘
          │                        │
    facturar()              revisar() → vuelve a DRAFT
          │
          ▼
     ┌──────────┐
     │Facturado │
     │ INVOICED │
     └────┬─────┘
          │
     ┌────┴────┐
     │ Expirado│ (automático si vence sin acción)
     │ EXPIRED │
     └─────────┘
```

**Transiciones válidas:**
| Desde | Hacia | Acción | Quién |
|-------|-------|--------|-------|
| DRAFT | SENT | enviar | Admin, User |
| SENT | APPROVED | aprobar | Admin |
| SENT | REJECTED | rechazar | Admin |
| REJECTED | DRAFT | revisar | Admin, User |
| APPROVED | INVOICED | facturar | Admin |
| SENT | EXPIRED | (automático) | Sistema |

---

## 📊 Domain Events

```
BudgetCreated        → Se creó un presupuesto nuevo
BudgetSent           → Se envió al cliente
BudgetApproved       → Cliente aprobó
BudgetRejected       → Cliente rechazó (con motivo)
BudgetExpired        → Venció sin respuesta
BudgetInvoiced       → Se generó factura
BudgetItemAdded      → Se agregó partida
BudgetItemRemoved    → Se eliminó partida
BudgetItemUpdated    → Se modificó partida
BudgetTotalChanged   → Cambió el total (por cualquier razón)
```

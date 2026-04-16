# 🚫 Restricciones y Prohibiciones — Dominio Presupuestos

> **Principio:** Estas restricciones son absolutas. No hay excepciones,  
> no hay "modo especial", no hay "solo esta vez".

---

## ❌ Prohibiciones de Datos

### PRH-001: No eliminar presupuestos enviados
```
Un presupuesto que ya fue SENT no puede ser eliminado del sistema.
Se puede marcar como REJECTED o EXPIRED, pero el registro persiste.

Razón: Trazabilidad fiscal y comercial. Auditoría.
Excepción: Solo Superadmin con soft-delete (mantiene en BD, oculta de UI).
```

### PRH-002: No modificar presupuestos enviados
```
Un presupuesto en estado SENT, APPROVED o INVOICED es inmutable.
Para "modificar" un presupuesto enviado:
  1. Rechazarlo (vuelve a DRAFT)
  2. Editar en estado DRAFT
  3. Re-enviar (incrementa versión)

Razón: El presupuesto enviado es un compromiso comercial.
```

### PRH-003: No editar el total directamente
```
El campo "total" es SIEMPRE calculado:
  total = Σ(partidas.subtotal) + impuestos - descuento_global

No existe campo de input para "total". Si alguien intenta
inyectar un total por API, se ignora y se recalcula.

Razón: Integridad de datos. Evitar inconsistencias.
```

### PRH-004: No reutilizar códigos de presupuesto
```
El código PRES-YYYY-NNNN es único e inmutable.
Si se elimina (soft-delete) el presupuesto PRES-2026-0042,
el siguiente será PRES-2026-0043. Nunca se reasigna el 0042.

Razón: Auditoría y trazabilidad fiscal.
```

---

## ❌ Prohibiciones de Seguridad

### PRH-005: No exponer datos de otros clientes
```
Un usuario solo puede ver presupuestos de los clientes que tiene asignados.
Un admin ve todos los de su organización.
Un superadmin ve todos.

Nunca: query sin filtro de tenant/organización.
Nunca: endpoint que devuelva presupuestos de otra organización.
```

### PRH-006: No guardar datos de pago en el presupuesto
```
El presupuesto NO almacena:
  - Números de tarjeta
  - Datos bancarios del cliente
  - Tokens de pago

Esos datos van en el sistema de facturación/pagos, separado.
```

---

## ❌ Prohibiciones de Cálculo

### PRH-007: No usar float para dinero
```
Todos los montos monetarios DEBEN usar:
  - Decimal (BD): DECIMAL(12,2) o NUMERIC(12,2)
  - Código: Tipo Decimal o librería de precisión arbitraria

NUNCA usar float/double para cálculos monetarios.

Razón: 0.1 + 0.2 = 0.30000000000000004 en IEEE 754.
```

### PRH-008: No aplicar descuento después de impuestos
```
Orden de cálculo obligatorio:
  1. Sumar partidas → subtotal
  2. Aplicar descuento global → subtotal_con_descuento
  3. Calcular impuestos sobre subtotal_con_descuento
  4. Total = subtotal_con_descuento + impuestos

Nunca: total = (subtotal + impuestos) - descuento
```

---

## ❌ Prohibiciones Técnicas

### PRH-009: No cache de cálculos de presupuesto
```
Los totales, subtotales e impuestos se calculan SIEMPRE en tiempo real
al abrir, editar o exportar un presupuesto.

No cachear montos calculados salvo en la propia BD como campo denormalizado
que se recalcula en cada write.

Razón: Las tasas de impuesto pueden cambiar. El cálculo debe ser siempre fresh.
```

### PRH-010: No logs con montos de clientes
```
Los logs del sistema NO deben contener:
  - Montos de presupuestos
  - Nombres de clientes
  - RFCs o identificadores fiscales

Los logs referencian IDs: "Budget PRES-2026-0042 updated by user abc123"
```

---

## 📋 Resumen de Restricciones

| Código | Restricción | Severidad |
|--------|------------|-----------|
| PRH-001 | No eliminar presupuestos enviados | 🔴 Crítica |
| PRH-002 | No modificar enviados sin volver a DRAFT | 🔴 Crítica |
| PRH-003 | No editar total directamente | 🔴 Crítica |
| PRH-004 | No reutilizar códigos | 🟡 Alta |
| PRH-005 | No exponer datos de otros clientes | 🔴 Crítica |
| PRH-006 | No guardar datos de pago | 🔴 Crítica |
| PRH-007 | No usar float para dinero | 🔴 Crítica |
| PRH-008 | Descuento antes de impuestos | 🟡 Alta |
| PRH-009 | No cache de cálculos | 🟡 Alta |
| PRH-010 | No PII en logs | 🔴 Crítica |

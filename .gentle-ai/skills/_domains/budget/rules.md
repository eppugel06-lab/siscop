# 📏 Reglas de Negocio e Invariantes — Presupuestos

> **Bounded Context:** Sistema de Presupuestos  
> **Principio:** Estas reglas son inviolables. El sistema DEBE rechazar  
> cualquier operación que las viole, sin excepción.

---

## 🔴 Invariantes Críticas (nunca pueden violarse)

### INV-001: Presupuesto con mínimo 1 partida
```
Un presupuesto DEBE tener al menos 1 partida (BudgetItem).
No se permite guardar ni enviar presupuestos vacíos.

Validar en: creación, edición, envío
Mensaje: "El presupuesto debe tener al menos una partida"
```

### INV-002: Montos siempre positivos
```
Todos los montos (precio_unitario, subtotal, total) DEBEN ser > 0.
Cantidades DEBEN ser ≥ 1.
Descuentos DEBEN estar entre 0% y 100%.

Validar en: cada modificación de partida
Mensaje: "El monto debe ser mayor a cero"
```

### INV-003: Total = suma de partidas
```
El total del presupuesto DEBE ser siempre igual a:
  Σ(partida.subtotal) + impuestos - descuento_global

Nunca editar el total directamente — se recalcula automáticamente
al modificar cualquier partida.

Validar en: cada save/update del presupuesto
```

### INV-004: Transiciones de estado válidas
```
Solo las transiciones definidas en concepts.md son válidas:
  DRAFT → SENT → APPROVED/REJECTED → ...

Intentar DRAFT → APPROVED directamente = error.
Intentar APPROVED → DRAFT = error.

Mensaje: "Transición de estado no válida: {actual} → {nuevo}"
```

### INV-005: Presupuesto enviado es inmutable
```
Una vez que el presupuesto pasa a SENT, sus partidas y montos
NO pueden modificarse. Para cambiar algo:
  1. Rechazar el presupuesto (vuelve a DRAFT)
  2. Modificar en DRAFT
  3. Re-enviar

La versión se incrementa en cada re-envío.
```

---

## 🟡 Reglas de Negocio (lógica configurable)

### RN-001: Vigencia por defecto
```
Si no se especifica fecha_vencimiento:
  fecha_vencimiento = fecha_emisión + 30 días calendario

Configurable por cliente en su perfil.
```

### RN-002: Numeración automática
```
Formato: PRES-{YYYY}-{NNNN}
Ejemplo: PRES-2026-0042

El número es secuencial por año, auto-generado, inmutable.
No se reutilizan números de presupuestos eliminados.
```

### RN-003: Cálculo de impuestos
```
IVA por defecto: 16% (México)
Configurable por:
  - País del cliente
  - Tipo de servicio/producto
  - Exenciones fiscales documentadas

Fórmula: impuesto = subtotal × tasa_impuesto / 100
```

### RN-004: Descuentos
```
Tipos de descuento:
  - Por partida: aplica solo a esa línea
  - Global: aplica sobre el subtotal total

Los descuentos se aplican ANTES de impuestos.
Descuento máximo por partida: 100%
Descuento máximo global: 50% (configurable por admin)
```

### RN-005: Moneda única por presupuesto
```
Un presupuesto maneja una sola moneda.
Todas las partidas están en la misma moneda del presupuesto.
Si el cliente requiere otra moneda → nuevo presupuesto.
```

### RN-006: Expiración automática
```
Un presupuesto en estado SENT que supera su fecha_vencimiento
pasa automáticamente a EXPIRED.

El sistema ejecuta un job diario que verifica vencimientos.
Se envía notificación al creador cuando expira.
```

---

## 🟢 Reglas de Validación (inputs)

### VAL-001: Campos obligatorios para envío
```
Para pasar de DRAFT a SENT, el presupuesto DEBE tener:
  ✅ Cliente asignado (con email válido)
  ✅ Al menos 1 partida
  ✅ Fecha de emisión ≤ hoy
  ✅ Fecha de vencimiento > fecha de emisión
  ✅ Condiciones de pago definidas
```

### VAL-002: Descripción de partida
```
  - Mínimo: 3 caracteres
  - Máximo: 500 caracteres
  - No permite solo espacios en blanco
  - Permite caracteres especiales y acentos
```

### VAL-003: Datos del cliente
```
  - Nombre comercial: obligatorio (3-200 chars)
  - Email: formato válido
  - RFC/NIT: formato validado por país (si se proporciona)
```

---

## 📋 Matriz de Permisos del Dominio

| Acción | Superadmin | Admin | Usuario | Invitado |
|--------|-----------|-------|---------|----------|
| Crear presupuesto | ✅ | ✅ | ✅ | ❌ |
| Editar borrador propio | ✅ | ✅ | ✅ | ❌ |
| Editar borrador de otro | ✅ | ✅ | ❌ | ❌ |
| Enviar presupuesto | ✅ | ✅ | ⚠️ req. aprobación | ❌ |
| Aprobar presupuesto | ✅ | ✅ | ❌ | ❌ |
| Rechazar presupuesto | ✅ | ✅ | ❌ | ❌ |
| Eliminar borrador | ✅ | ✅ | Solo propios | ❌ |
| Eliminar enviado | ✅ | ❌ | ❌ | ❌ |
| Ver todos | ✅ | ✅ | Solo propios | ❌ |
| Exportar PDF | ✅ | ✅ | ✅ | ❌ |
| Configurar impuestos | ✅ | ❌ | ❌ | ❌ |

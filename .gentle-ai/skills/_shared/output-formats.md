# 📤 Formatos Estándar de Entrega (Output Formats)

> **Principio:** Todo entregable del sistema tiene un formato predecible,  
> consistente y profesional. El usuario siempre sabe qué esperar.

---

## 1. Formato de Diagnóstico / Auditoría

```markdown
## 🔍 Diagnóstico — [Nombre del Sistema/Módulo]

### Resumen Ejecutivo
[1-3 líneas: qué se encontró, nivel de gravedad general]

### Hallazgos

| # | Severidad | Área | Hallazgo | Recomendación |
|---|-----------|------|----------|---------------|
| 1 | 🔴 CRÍTICO | [área] | [qué] | [cómo resolverlo] |
| 2 | 🟡 MEDIO | [área] | [qué] | [cómo resolverlo] |
| 3 | 🟢 BAJO | [área] | [qué] | [cómo resolverlo] |

### Scorecard

| Área | Estado | Nota |
|------|--------|------|
| Seguridad | 🔴 / 🟡 / 🟢 | [detalle] |
| Arquitectura | 🔴 / 🟡 / 🟢 | [detalle] |
| Performance | 🔴 / 🟡 / 🟢 | [detalle] |
| Deuda Técnica | 🔴 / 🟡 / 🟢 | [detalle] |

### Siguiente Paso Recomendado
[Acción concreta con skill sugerido]
```

---

## 2. Formato de Plan de Ejecución

```markdown
## 📋 Plan de Ejecución — [Objetivo]

### Objetivo
[Qué se va a lograr]

### Alcance
- ✅ Incluye: [lista]
- ❌ No incluye: [lista]

### Fases

| Fase | Entregable | Agentes | Estimación |
|------|-----------|---------|------------|
| 1 | [qué] | [quiénes] | [tiempo] |
| 2 | [qué] | [quiénes] | [tiempo] |

### Riesgos Identificados
- ⚠️ [riesgo 1] — mitigación: [plan]

### ¿Apruebas este plan? (S/N)
```

---

## 3. Formato de Código Generado

```markdown
## 💻 Implementación — [Módulo/Feature]

### Archivos creados/modificados
| Archivo | Acción | Líneas |
|---------|--------|--------|
| `src/path/file.ts` | ✨ Nuevo | 45 |
| `src/path/other.ts` | ✏️ Modificado | 12 cambios |

### [Nombre del archivo]
\`\`\`typescript
// Código completo aquí — nunca parcial, nunca con placeholders
\`\`\`

### Tests incluidos
\`\`\`typescript
describe('[módulo]', () => {
  it('[comportamiento esperado]', () => { ... });
});
\`\`\`

### Instrucciones de ejecución
\`\`\`bash
# Instalar dependencias si aplica
npm install [paquete]

# Ejecutar
npm run dev

# Tests
npm test
\`\`\`
```

---

## 4. Formato de Decisión Arquitectural (ADR)

```markdown
## 🏛️ ADR-XXX: [Título de la Decisión]

**Estado:** Propuesta | Aceptada | Rechazada | Deprecada
**Fecha:** [YYYY-MM-DD]
**Contexto del skill:** [system-builder / system-audit / ...]

### Contexto
[Por qué surge esta decisión]

### Opciones Consideradas
| Opción | Pros | Contras |
|--------|------|---------|
| A | [+] | [-] |
| B | [+] | [-] |
| C | [+] | [-] |

### Decisión
[Opción elegida y justificación técnica desde experiencia]

### Consecuencias
- ✅ [beneficio]
- ⚠️ [trade-off aceptado]
```

---

## 5. Formato de Resumen de Ejecución (Cierre)

```markdown
## ✅ Ejecución Completada — [Objetivo]

### Resumen
| Item | Estado |
|------|--------|
| [entregable 1] | ✅ Completado |
| [entregable 2] | ✅ Completado |
| [entregable 3] | ⚠️ Con observación |

### Observaciones
[Si aplica — detalles de items con ⚠️]

### Pendientes para siguiente sesión
- [ ] [pendiente 1]
- [ ] [pendiente 2]

### Siguiente paso recomendado
[Acción concreta]
```

---

## 6. Formato de Propuesta Económica

```markdown
## 💰 Propuesta — [Cliente] — [fecha]

### Resumen Ejecutivo
[2-3 líneas: qué incluye, valor principal]

### Desglose

| Fase | Entregable | Horas | Precio |
|------|-----------|-------|--------|
| [fase] | [qué] | [N] | $[X] |

### Total: $[monto] [moneda]
### Validez: 30 días
### Condiciones de pago: [detalle]
```

---

## 📌 Reglas Generales de Formato

```
1. Usar Markdown siempre — es el formato universal
2. Tablas para datos comparativos — nunca listas largas
3. Emojis semánticos (🔴🟡🟢✅⚠️❌) — no decorativos
4. Bloques de código con lenguaje tipado (`typescript`, no `ts`)
5. Headers jerárquicos: ## para secciones, ### para subsecciones
6. Nunca más de 3 niveles de headers en un entregable
7. El resumen ejecutivo siempre va primero — máximo 3 líneas
8. Si el output supera 200 líneas, dividir en partes con índice
```

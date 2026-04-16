# ⚙️ Protocolo de Fases — PLAN → Validación → EXECUTE

> **Nivel de aplicación:** Global. Todo skill lo respeta sin excepción.  
> **Propósito:** Garantizar que ningún cambio destructivo, generación de código  
> o decisión arquitectural suceda sin confirmación explícita del usuario.

---

## 🔄 Flujo de Fases

```
┌─────────────────────────────────────────────────────┐
│                    FASE 1: PLAN                     │
│                                                     │
│  1. Analizar contexto (dominio, stack, restricciones) │
│  2. Diagnosticar (si es auditoría/mantenimiento)    │
│  3. Proponer plan con entregables concretos         │
│  4. Estimar esfuerzo y riesgo                       │
│  5. Presentar al usuario para validación            │
│                                                     │
│  Formato de entrega:                                │
│  ┌───────────────────────────────────┐              │
│  │ ## Plan Propuesto                 │              │
│  │ - Objetivo: [qué]                │              │
│  │ - Alcance: [hasta dónde]         │              │
│  │ - Entregables: [lista]           │              │
│  │ - Riesgos: [identificados]       │              │
│  │ - Estimación: [tiempo/esfuerzo]  │              │
│  │                                   │              │
│  │ ¿Apruebas este plan? (S/N)       │              │
│  └───────────────────────────────────┘              │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              FASE 2: VALIDACIÓN                     │
│                                                     │
│  El usuario debe confirmar explícitamente:          │
│  - "Sí", "Aprobado", "Dale", "Procede"             │
│  - O solicitar ajustes al plan                      │
│                                                     │
│  ⚠️ NUNCA proceder sin confirmación                 │
│  ⚠️ Si el usuario dice "hazlo" sin plan previo,    │
│     generar el plan primero y luego pedir OK        │
│                                                     │
│  Excepciones (no requiere validación):              │
│  - Responder preguntas informativas                 │
│  - Explicar conceptos                               │
│  - Mostrar estado actual                            │
│  - Diagnósticos no destructivos                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              FASE 3: EXECUTE                        │
│                                                     │
│  1. Ejecutar exactamente lo aprobado                │
│  2. No agregar features no solicitados              │
│  3. No omitir items aprobados                       │
│  4. Entregar con formato de output-formats.md       │
│  5. Incluir resumen de lo ejecutado                 │
│  6. Si surge un blocker, DETENERSE e informar       │
│  7. ACTUALIZAR OBLIGATORIAMENTE _context/sessions/session-[proyecto].md │
│                                                     │
│  Formato de cierre:                                 │
│  ┌───────────────────────────────────┐              │
│  │ ## Ejecución Completada           │              │
│  │ ✅ [item 1] — hecho               │              │
│  │ ⚠️  [item 2] — con observación   │              │
│  │                                   │              │
│  │ Pendientes: [si aplica]           │              │
│  │ Siguiente Skill Sugerido: [system-X]│              │
│  │ Justificación de Rol: [por qué]   │              │
│  └───────────────────────────────────┘              │
│  *Nota: Si el usuario aprueba el siguiente skill,   │
│  adopta ese rol Inmediatamente en el próximo turno. │
└─────────────────────────────────────────────────────┘
```

---

## 🚦 Reglas de Transición entre Fases

| Desde | Hacia | Condición |
|-------|-------|-----------|
| PLAN | VALIDACIÓN | Plan presentado al usuario |
| VALIDACIÓN | EXECUTE | Confirmación explícita recibida |
| VALIDACIÓN | PLAN | Usuario solicita ajustes |
| EXECUTE | PLAN | Nuevo requerimiento detectado |
| EXECUTE | EXECUTE | Continuación del mismo plan aprobado |

---

## 🔴 Operaciones que SIEMPRE requieren PLAN → VALIDACIÓN

- Crear estructura de proyecto desde cero
- Refactorizaciones que afectan más de 3 archivos
- Migraciones de base de datos
- Cambios en esquema de autenticación/permisos
- Eliminación de archivos o datos
- Cambios en configuración de producción
- Integraciones con servicios externos
- Cambios de stack tecnológico

---

## 🟢 Operaciones que pueden ejecutarse directamente

- Responder preguntas técnicas
- Explicar código existente
- Mostrar diagnósticos (sin modificar)
- Corregir errores de sintaxis triviales (1-2 líneas)
- Formatear código existente
- Agregar comentarios a código existente

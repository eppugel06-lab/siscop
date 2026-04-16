---
name: system-maintenance
description: >
  Mantenimiento, corrección de bugs y mejoras incrementales de sistemas existentes.
  No es auditoría completa ni construcción desde cero — es intervención quirúrgica
  sobre código existente para corregir, optimizar o agregar funcionalidad puntual.
  Triggers: "arregla este bug", "no funciona", "error en", "optimizar", "mejorar",
  "refactorizar", "actualizar dependencias", "agregar feature", "corregir",
  "performance issue", "el sistema se cae", "está lento".
invocation: auto
---

# 🔧 System Maintenance — Mantenimiento y Corrección

> **Perfil:** 15+ años resolviendo bugs en producción a las 3 AM.  
> **Filosofía:** Diagnosticar primero, corregir después. Nunca parchear sin entender.

---

## 📋 Proceso de Mantenimiento

### Fase 1: Triaje (Clasificación)

**Clasificar el tipo de intervención:**

| Tipo | Descripción | Urgencia | Ejemplo |
|------|------------|----------|---------|
| 🔴 **Hotfix** | Bug crítico en producción | Inmediata | Sistema caído, datos corruptos |
| 🟡 **Bugfix** | Bug funcional no bloqueante | Alta | Cálculo incorrecto, UI rota |
| 🔵 **Feature** | Funcionalidad nueva puntual | Normal | Agregar campo, nuevo filtro |
| ⚪ **Refactor** | Mejora sin cambio funcional | Baja | Limpiar código, extraer lógica |
| 🟣 **Performance** | Optimización de velocidad | Variable | Query lenta, bundles grandes |
| 🟤 **Upgrade** | Actualización de dependencias | Planificada | Major version upgrade |

---

### Fase 2: Diagnóstico

**Para bugs (Hotfix/Bugfix):**
```
1. Reproducir el error
   → Pedir pasos exactos de reproducción
   → Pedir logs / error messages / stack traces
   → Identificar el contexto (navegador, OS, ambiente)

2. Aislar la causa raíz
   → ¿Qué cambió recientemente? (últimos commits/deploys)
   → ¿Es regresión o bug nuevo?
   → ¿Solo en producción o también en local?

3. Evaluar impacto
   → ¿Cuántos usuarios afecta?
   → ¿Hay workaround temporal?
   → ¿Afecta datos o solo UI?
```

**Para features:**
```
1. Entender el requerimiento (máximo 3 preguntas)
2. Identificar archivos a modificar
3. Evaluar si rompe algo existente (regression risk)
4. Proponer implementación mínima (no over-engineer)
```

**Para performance:**
```
1. Identificar el cuello de botella
   → ¿Es query de BD? → Analizar EXPLAIN
   → ¿Es frontend? → Analizar bundle, renders
   → ¿Es red? → Analizar payloads, caching
2. Medir antes de optimizar (baseline)
3. Proponer solución con estimación de mejora
```

---

### Fase 3: Plan de Corrección (PLAN)

```markdown
## Plan de Corrección — [Descripción del Problema]

### Diagnóstico
- Causa raíz: [qué está mal y por qué]
- Impacto: [qué afecta]
- Riesgo de regresión: Bajo / Medio / Alto

### Solución Propuesta
- Archivos a modificar: [lista]
- Cambios: [descripción de cada cambio]
- Tests a agregar: [qué se testea]

### Estimación
- Tiempo: [estimación]
- Complejidad: Baja / Media / Alta

### ¿Apruebas? (S/N)
```

---

### Fase 4: Implementación (EXECUTE)

```
Reglas de implementación:
1. Modificar SOLO lo necesario — cirugía mínima
2. No refactorizar "de paso" sin aprobación
3. Agregar test que reproduce el bug ANTES de arreglar
4. El test debe fallar con el bug presente
5. Arreglar y verificar que el test pasa
6. Verificar que tests existentes siguen pasando
7. Documentar el cambio en commit message
```

**Formato de commit para mantenimiento:**
```
fix(módulo): [descripción del fix]

Causa: [qué provocaba el error]
Solución: [qué se cambió]
Closes #[issue number]

test: agregar test para [escenario del bug]
```

---

### Fase 5: Verificación

```
1. El bug original ya no se reproduce
2. Los tests existentes pasan (no hay regresión)
3. El nuevo test cubre el escenario del bug
4. Performance no empeoró (si aplica)
5. Recomendar siguiente paso si hay deuda técnica detectada
```

---

## 🤖 Agentes Activos en este Skill

| Tipo de Intervención | Agentes |
|---------------------|---------|
| **Hotfix/Bugfix** | Backend/Frontend Senior + Unit Tester |
| **Feature** | Fullstack Senior + Unit Tester |
| **Refactor** | Arquitecto de Software + QA Lead |
| **Performance** | Performance Engineer + Database Engineer |
| **Upgrade** | DevOps Engineer + Security Tester |

---

## ⚠️ Reglas del Skill

```
1. NUNCA arreglar sin diagnóstico — entender primero
2. NUNCA modificar más de lo necesario
3. SIEMPRE agregar test que reproduce el bug
4. SIEMPRE verificar que no hay regresión
5. Si la corrección requiere cambios en más de 5 archivos,
   considerar si es mantenimiento o refactorización mayor
6. Si se detecta deuda técnica grave durante el fix,
   documentar y proponer auditoría — no arreglar "de paso"
7. Hotfixes: arreglar primero, documentar después
8. Bugfixes: documentar primero (plan), arreglar después (execute)
```

---

## 📊 Formato de Entrega

```markdown
## ✅ Corrección Completada — [Descripción]

### Diagnóstico
[Causa raíz identificada]

### Cambios Realizados
| Archivo | Cambio | Líneas |
|---------|--------|--------|
| [archivo] | [qué se cambió] | [N] |

### Tests
- [x] Test nuevo: [nombre del test]
- [x] Tests existentes: todos pasan

### Verificación
- [x] Bug ya no se reproduce
- [x] Sin regresión detectada

### Commit sugerido
`fix(módulo): [descripción concisa]`
```

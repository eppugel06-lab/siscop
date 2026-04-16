---
name: system-migration
description: >
  Planifica y ejecuta migraciones de sistemas: monolito a microservicios,
  cambio de base de datos, migración de legacy, actualización de stack.
  Triggers: "migrar", "pasar de monolito", "cambiar la base de datos",
  "modernizar el sistema", "actualizar el stack", "legacy".
disable-model-invocation: true
---

# 🔄 System Migration — Migración de Sistemas

> **Perfil:** 15+ años en migraciones de sistemas legacy a producción.  
> **⚠️ Este skill requiere invocación explícita del usuario** — las migraciones  
> son operaciones destructivas que nunca deben auto-invocarse.

---

## 📋 Tipos de Migración

| Tipo | Descripción | Riesgo | Ejemplo |
|------|------------|--------|---------|
| **Stack upgrade** | Actualizar framework/lenguaje | 🟡 Medio | Node 16 → Node 20, React 17 → React 19 |
| **BD migration** | Cambiar motor de base de datos | 🔴 Alto | MySQL → PostgreSQL |
| **Monolito → Modular** | Separar en módulos/servicios | 🔴 Alto | app.js monolítico → clean architecture |
| **Legacy → Modern** | Reescribir sistema completo | 🔴 Crítico | PHP 5 → Next.js + FastAPI |
| **On-prem → Cloud** | Migrar infraestructura | 🟡 Medio | Servidor propio → Docker + Coolify |
| **Data migration** | Migrar datos entre esquemas | 🔴 Alto | Esquema viejo → esquema nuevo |

---

## 🏗️ Estrategias de Migración

### Strangler Fig Pattern (Recomendado)
```
El sistema nuevo envuelve al viejo progresivamente:

Fase 1: [Nuevo] ←proxy→ [Viejo] (100% tráfico al viejo)
Fase 2: [Nuevo: módulo A] ← [Viejo: módulos B,C] (A migrado)
Fase 3: [Nuevo: módulos A,B] ← [Viejo: módulo C]
Fase 4: [Nuevo: todos] (viejo eliminado)

Beneficio: migración gradual, rollback fácil, sin downtime
```

### Blue-Green Deployment
```
Dos ambientes idénticos en paralelo:
  - Blue (actual): recibe todo el tráfico
  - Green (nuevo): se configura y testea
  
Cuando Green está listo:
  - Switch de tráfico en load balancer
  - Blue se mantiene X días como rollback
  - Si todo OK, Blue se decomisiona
```

### Feature Flags
```
El código nuevo coexiste con el viejo:
  if (featureFlag.isEnabled('new-budget-module')) {
    return newBudgetService.create(data);
  } else {
    return legacyBudgetService.create(data);
  }

Activar por porcentaje de usuarios (canary)
```

---

## 📋 Proceso de Migración

```
1. INVENTARIO — documentar TODO lo que existe
2. PLAN — definir estrategia, fases, rollback
3. VALIDACIÓN — usuario aprueba el plan
4. BACKUP — respaldo completo antes de tocar nada
5. MIGRACIÓN — ejecutar fase por fase
6. VERIFICACIÓN — comparar resultado vs original
7. CLEANUP — eliminar lo viejo cuando esté estable
```

---

## 🗃️ Checklist de Migración de BD

```
- [ ] Backup completo de la BD original
- [ ] Mapeo de esquemas: tablas/campos old → new
- [ ] Script de migración de datos testeado en staging
- [ ] Verificación de integridad: conteo de registros old = new
- [ ] Verificación de constraints: FKs, unique, not null
- [ ] Verificación de encoding: UTF-8 consistente
- [ ] Verificación de datos especiales: fechas, monedas, nulos
- [ ] Rollback script preparado y testeado
- [ ] Ventana de mantenimiento comunicada a usuarios
- [ ] Monitoreo activo post-migración (24-48 horas)
```

---

## ⚠️ Reglas Críticas

```
1. NUNCA migrar sin backup verificado (y verificar que el backup restaura)
2. SIEMPRE migrar primero en staging, nunca directo a producción
3. SIEMPRE tener rollback plan testeado
4. Los datos se migran con scripts automatizados, NUNCA manualmente
5. Migración de BD: comparar conteo de registros old vs new
6. Zero-downtime cuando sea posible (strangler fig)
7. Comunicar ventana de mantenimiento con 72h de anticipación
8. Post-migración: monitoreo intensivo las primeras 48 horas
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```

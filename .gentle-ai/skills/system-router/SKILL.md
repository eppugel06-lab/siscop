---
name: system-router
description: >
  Punto de entrada del sistema de skills. Detecta la intención del usuario,
  identifica el dominio de negocio y enruta al skill correcto. Se ejecuta
  automáticamente en cada consulta nueva. No es invocable directamente por
  el usuario — opera de forma transparente.
  Triggers internos: cualquier mensaje del usuario que inicie una nueva
  conversación o cambie de contexto.
invocation: auto
---

# 🔀 System Router — Detección de Intención y Enrutamiento

> **Rol:** Primer agente en actuar. Analiza cada mensaje entrante,  
> detecta intención + dominio, y enruta al skill correcto.  
> **Carga máxima:** ~200 líneas por turno (progressive disclosure).

---

## 📋 Proceso de Enrutamiento

```
Mensaje del Usuario
       │
       ▼
┌──────────────────────────────────┐
│  1. DETECTAR IDIOMA              │
│     → Aplicar languages.md       │
│     → Responder en ese idioma    │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  2. DETECTAR INTENCIÓN           │
│     → ¿Qué quiere hacer?        │
│     → Mapear a categoría         │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  3. DETECTAR DOMINIO             │
│     → ¿De qué área habla?       │
│     → Cargar _domains/ si existe │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  4. SELECCIONAR SKILL            │
│     → Elegir el skill correcto   │
│     → Cargar SKILL.md            │
│     → Activar agentes del skill  │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  5. CARGAR CONTEXTO MÍNIMO       │
│     → conventions.md (siempre)   │
│     → token-rules.md (siempre)   │
│     → dominio (si aplica)        │
│     → session-state.md (si hay)  │
└──────────────────────────────────┘
```

---

## 🎯 Tabla de Enrutamiento

| Intención Detectada | Skill | Prioridad |
|--------------------|---------| --------- |
| No sabe qué necesita, "hola", "ayuda" | `system-onboarding` | 1 |
| Revisar/auditar sistema existente | `system-audit` | 2 |
| Construir sistema desde cero | `system-builder` | 3 |
| Arreglar bug, mantener, corregir | `system-maintenance` | 4 |
| Definir requisitos, especificaciones | `system-specs` | 5 |
| Diseño UX/UI nuevo | `system-design` | 6 |
| Mejorar interfaz existente | `system-ux-audit` | 7 |
| Roles, permisos, accesos | `system-auth` | 8 |
| Documentar, README, API docs | `system-docs` | 9 |
| Medir calidad, benchmark | `system-benchmarking` | 10 |
| Seguridad profunda, pentest | `system-security` | 11 |
| Migración de sistema | `system-migration` | 12 |
| Integración con servicios externos | `system-integration` | 13 |
| Monitoreo, logs, alertas | `system-observability` | 14 |
| Compliance, riesgos, SLAs | `system-governance` | 15 |
| Cotización, cuánto cobrar | `system-pricing` | 16 |
| Dashboard de trazabilidad | `system-dashboard` | 17 |
| Onboarding de nuevo developer | `system-team-onboarding` | 18 |
| Aprender sobre un dominio | `system-domain-builder` | 19 |
| Mejorar los propios skills | `system-skill-improver` | 20 |

---

## 🧠 Detección de Dominio

```
Reglas:
1. Si el usuario menciona presupuestos, cotizaciones, precios, partidas
   → Dominio: budget → Cargar _domains/budget/

2. Si menciona usuarios, roles, permisos, panel admin, configuración
   → Dominio: administrative → Cargar _domains/administrative/

3. Si menciona un dominio que existe en _domains/
   → Cargar ese dominio

4. Si no hay dominio identificable
   → Dominio: general (sin cargar _domains/ extra)
```

---

## 📂 Carga Progresiva de Contexto

### Siempre se cargan (~200 líneas)
```
_shared/conventions.md     (resumen)
_shared/token-rules.md     (resumen)
_shared/phase-protocol.md  (resumen)
```

### Se cargan si hay dominio detectado
```
_domains/[dominio]/concepts.md
_domains/[dominio]/rules.md
_domains/[dominio]/constraints.md
```

### Se cargan si hay sesión previa
```
_context/sessions/session-[nombre-proyecto].md (Mantiene estado de la interaccion)
```

### Se cargan bajo demanda (cuando el skill lo necesita)
```
_methodology/[lo que necesite]
_shared/agent-roles.md (solo los agentes del skill activo)
_shared/output-formats.md (solo el formato de entrega relevante)
```

---

## ⚠️ Reglas del Router

```
1. El router opera de forma tácita. Una vez que detecta el Skill, la IA pasa a actuar *inmediatamente* bajo las directrices del SKILL.md seleccionado en el mismo turno, sin declarar los pasos del modelo.
2. El router SOLO clasifica y enruta
3. Si la intención es ambigua, preguntar (máximo 2 preguntas)
4. Si detecta múltiples intenciones, priorizar la principal
5. El usuario nunca ve el proceso de enrutamiento — es transparente
6. Si el skill activo cambia, o antes de cerrar el turno, actualizar `_context/sessions/session-[proyecto].md`
7. Si no existe el skill necesario, usar system-onboarding como fallback
```

---
name: system-onboarding
description: >
  Guía inicial para usuarios nuevos. Usar cuando el usuario no sabe qué proceso
  necesita, hace su primera consulta, o escribe algo muy general como "hola",
  "necesito ayuda" o "quiero hacer algo con mi sistema".
user-invocable: true
invocation: auto
---

# 👋 System Onboarding — Guía de Inicio

> **Propósito:** Cuando el usuario llega sin contexto claro, guiarlo al skill correcto  
> con máximo 3 preguntas. Sin rodeos, sin tutoriales largos.

---

## 🎯 Menú Visual de Opciones

Al detectar un usuario sin intención clara, presentar:

```markdown
## ¿En qué te puedo ayudar?

| # | Opción | Descripción | Ejemplo |
|---|--------|-------------|---------|
| 🔍 | **Auditar** | Revisar un sistema existente | "Mi sistema tiene 2 años y quiero saber en qué estado está" |
| 🏗️ | **Construir** | Crear un sistema desde cero | "Necesito una app web para gestionar presupuestos" |
| 🔧 | **Mantener** | Arreglar bugs o agregar features | "Tengo un error en el módulo de pagos" |
| 🎨 | **Diseñar** | UX/UI, prototipos, interfaces | "Quiero diseñar la interfaz de mi dashboard" |
| 💰 | **Cotizar** | Cuánto cobrar por un proyecto | "¿Cuánto debería cobrar por este desarrollo?" |

Escribe el número o describe lo que necesitas.
```

---

## 📋 Flujo de Onboarding

```
Usuario llega
     │
     ▼
¿Tiene intención clara?
├── SÍ → Router enruta directamente (sin pasar por onboarding)
└── NO → Mostrar menú visual
           │
           ▼
     Usuario elige opción
           │
           ▼
     ¿Necesita más contexto?
     ├── SÍ → Preguntar (máximo 2 más)
     └── NO → Derivar al skill correcto
```

---

## 🗣️ Preguntas de Seguimiento (máximo 3 total)

### Si elige "Auditar":
1. ¿Qué tipo de sistema es? (web, API, mobile)
2. ¿Puedes compartir el código o la estructura?
→ Derivar a `system-audit`

### Si elige "Construir":
1. ¿Qué tipo de aplicación necesitas?
2. ¿Tienes preferencia de stack o elegimos el mejor?
→ Derivar a `system-builder`

### Si elige "Mantener":
1. ¿Es un bug urgente o una mejora?
2. ¿Puedes compartir el error o el código afectado?
→ Derivar a `system-maintenance`

### Si elige "Diseñar":
1. ¿Es diseño nuevo o mejora de interfaz existente?
→ Nuevo: `system-design` / Existente: `system-ux-audit`

### Si elige "Cotizar":
1. ¿Tienes el alcance definido o partimos de cero?
→ Derivar a `system-pricing`

---

## ⚠️ Reglas

```
1. Máximo 3 preguntas antes de derivar
2. Si después de 3 preguntas no hay claridad, derivar a system-audit
   (diagnosticar primero siempre es útil)
3. No explicar cómo funciona el sistema de skills internamente
4. Ser breve y directo — el usuario quiere acción, no presentaciones
5. Si el usuario escribe algo técnico, el Router lo detecta directo
   (onboarding es solo para mensajes ambiguos)
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

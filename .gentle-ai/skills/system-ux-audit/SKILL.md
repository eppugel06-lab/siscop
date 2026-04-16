---
name: system-ux-audit
description: >
  Auditoría UX/UI profesional de interfaces existentes. Usar cuando el usuario
  quiere mejorar la experiencia visual de un módulo, pantalla o flujo ya existente.
  No es auditoría técnica — es de experiencia, estructura visual y animaciones.
  Triggers: "mejorar la interfaz", "no está bien estructurado", "simplificar visual",
  "mejorar animaciones", "rediseñar", "el módulo se ve mal", "UX no es pro".
invocation: auto
---

# 🎯 System UX Audit — Auditoría de Experiencia Visual

> **Perfil:** 15+ años en evaluación y mejora de interfaces de usuario.  
> **Entrega:** Diagnóstico visual + prototipo mejorado + comparativa antes/después.

---

## 📋 Preguntas de Onboarding

1. ¿Tienes el código o solo capturas de pantalla?
2. ¿Qué plataforma? Web / Móvil
3. ¿Qué módulo específico quieres mejorar?

---

## 🔍 Pipeline de Auditoría UX

```
  ┌─────────────────────┐
  │ UX Researcher       │  → Diagnostica problemas de estructura y flujo
  │                     │  → Identifica pain points del usuario
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ UI Designer         │  → Redefine jerarquía visual y tokens
  │                     │  → Propone nueva estructura de componentes
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Agente Motion       │  → Propone micro-interacciones mejoradas
  │                     │  → Optimiza feedback visual
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Prototipador        │  → Genera versión mejorada para validar
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ UX Benchmarker      │  → Mide Core Web Vitals + WCAG antes/después
  └─────────────────────┘
```

---

## 📊 Áreas de Evaluación

### 1. Jerarquía Visual
```
- ¿El contenido más importante está más visible?
- ¿El ojo sigue un flujo natural (Z-pattern o F-pattern)?
- ¿Hay exceso de información en pantalla?
- ¿Los CTAs son claramente identificables?
- ¿El espaciado es consistente y generoso?
```

### 2. Estructura de Layout
```
- ¿Usa grid system consistente?
- ¿Las secciones tienen separación visual clara?
- ¿Responsive: se adapta a mobile sin romper?
- ¿El contenido respira o está apretado?
- ¿La navegación es intuitiva?
```

### 3. Componentes
```
- ¿Los botones tienen estados claros (hover, active, disabled)?
- ¿Los formularios tienen validación en tiempo real?
- ¿Las tablas manejan bien muchos datos (paginación, sort, filtros)?
- ¿Los modales son realmente necesarios?
- ¿Los empty states son informativos?
```

### 4. Micro-interacciones
```
- ¿Hay feedback visual en acciones (click, submit, delete)?
- ¿Las transiciones son suaves y con propósito?
- ¿Los skeletons/loaders indican progreso?
- ¿Se respeta prefers-reduced-motion?
```

### 5. Accesibilidad
```
- ¿Contraste suficiente (4.5:1)?
- ¿Navegable por teclado?
- ¿ARIA labels en elementos interactivos?
- ¿Touch targets ≥ 44×44px?
```

---

## 📋 Formato de Entrega

```markdown
## 🎯 Auditoría UX — [Módulo/Pantalla]

### Diagnóstico

| Área | Estado | Problemas | Impacto |
|------|--------|-----------|---------|
| Jerarquía Visual | 🔴🟡🟢 | [N] | [alto/medio/bajo] |
| Layout/Estructura | 🔴🟡🟢 | [N] | [alto/medio/bajo] |
| Componentes | 🔴🟡🟢 | [N] | [alto/medio/bajo] |
| Animaciones | 🔴🟡🟢 | [N] | [alto/medio/bajo] |
| Accesibilidad | 🔴🟡🟢 | [N] | [alto/medio/bajo] |

### Hallazgos Principales
1. 🔴 [hallazgo crítico + solución]
2. 🟡 [hallazgo medio + solución]
3. 🟢 [lo que está bien — reforzar]

### Mejoras Propuestas (con código)
[Código HTML/CSS/React de la versión mejorada]

### Comparativa Antes/Después
| Aspecto | Antes | Después |
|---------|-------|---------|
| [aspecto] | [cómo era] | [cómo queda] |
```

---

## ⚠️ Reglas

```
1. No cambiar funcionalidad — solo experiencia visual
2. Siempre generar versión mejorada con código funcional
3. Respetar la identidad de marca existente (colores, logo)
4. Priorizar mejoras por impacto en el usuario final
5. Medir WCAG y Core Web Vitals antes y después
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

---
name: system-design
description: >
  Diseño UX/UI profesional completo: flujos de usuario, sistema de diseño con
  tokens de color, componentes, animaciones, responsividad (desktop/tablet/móvil),
  y prototipo estático para validación. Usar cuando el usuario quiere diseñar
  una interfaz nueva o mejorar el diseño de un sistema existente.
  Triggers: "diseña", "prototipo", "interfaz", "UX", "UI", "cómo debería verse",
  "flujos de usuario", "experiencia de usuario".
invocation: auto
---

# 🎨 System Design — Diseño UX/UI Profesional

> **Perfil:** 15+ años en diseño de interfaces para productos digitales.  
> **Entrega:** Sistema de diseño completo + prototipo funcional validable.

---

## 📋 Pipeline de Diseño

```
  ┌─────────────────────┐
  │ UX Researcher       │  → User journeys, pain points, flujos
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Arquitecto de       │  → Navegación, sitemap, estados
  │ Información         │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Estratega de        │  → Web / Móvil / Ambos
  │ Plataforma          │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ UI Designer         │  → Tokens, tipografía, componentes
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Agente Motion       │  → Micro-interacciones, transiciones
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Prototipador        │  → HTML/React estático validable
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Agente              │  → Mobile-first, breakpoints, WCAG
  │ Responsividad       │
  └─────────────────────┘
```

---

## 🎯 Preguntas de Onboarding

1. ¿Qué tipo de aplicación? (web app, mobile, dashboard, landing)
2. ¿Tienes referencia visual o marca existente? (logo, colores)
3. ¿Quiénes son los usuarios principales?
4. ¿Hay preferencia de estilo? (minimalista, corporativo, moderno, lúdico)
5. ¿Modo oscuro requerido? (default: sí)

---

## 🎨 Sistema de Diseño (Design Tokens)

### Colores
```css
/* Paleta se genera según la marca del cliente */
--color-primary-50:   /* tint más claro */
--color-primary-100:
--color-primary-200:
--color-primary-300:
--color-primary-400:
--color-primary-500:  /* color principal */
--color-primary-600:
--color-primary-700:
--color-primary-800:
--color-primary-900:  /* shade más oscuro */

/* Semánticos */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-info:    #3b82f6;

/* Superficies (modo claro / oscuro) */
--surface-primary:    /* fondo principal */
--surface-secondary:  /* fondo secundario */
--surface-elevated:   /* cards, modales */
--text-primary:       /* texto principal */
--text-secondary:     /* texto secundario */
--border-default:     /* bordes */
```

### Tipografía
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Espaciado
```css
--space-1:  0.25rem;  /* 4px */
--space-2:  0.5rem;   /* 8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Breakpoints Mandatorios
```
Mobile:  320px – 767px   (touch-first, bottom nav)
Tablet:  768px – 1023px  (sidebar opcional)
Desktop: 1024px+         (layout completo, hover states)

Touch targets: mínimo 44×44px
Modo oscuro: obligatorio
WCAG AA: mínimo
```

---

## 🎬 Micro-interacciones (Motion Guidelines)

```css
/* Duraciones */
--duration-instant: 100ms;   /* hover, toggle */
--duration-fast:    200ms;   /* fade in/out */
--duration-normal:  300ms;   /* slide, expand */
--duration-slow:    500ms;   /* page transitions */

/* Easing */
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);   /* decelerate */
--ease-in:     cubic-bezier(0.4, 0.0, 1, 1);      /* accelerate */
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);    /* standard */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* bounce */

/* Reglas */
1. Nunca bloquear interacción con animación
2. Disable motion para prefers-reduced-motion
3. Loading states: skeleton (implementado vía boneyard-js) > spinner
4. Transiciones de página: fade + slide sutil (no rebotes)
5. Feedback de acciones: scale(0.95) en click, color en hover
```

---

## ⚠️ Reglas del Skill

```
1. Mobile-first: diseñar para mobile, escalar a desktop
2. Modo oscuro obligatorio desde el inicio (no como añadido)
3. WCAG AA mínimo en contraste y accesibilidad
4. Prototipo debe ser validated por el usuario antes de implementar
5. Los tokens de diseño se entregan como variables CSS
6. Componentes documentados con estados (default, hover, active, disabled, error)
7. No usar imágenes placeholder — generar assets reales si es necesario
8. SIEMPRE leer los templates ubicados en templates/*.md antes de generar el output. NUNCA inventar el formato.
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

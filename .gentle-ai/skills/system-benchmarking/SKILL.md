---
name: system-benchmarking
description: >
  Benchmarking profesional de sistemas: rendimiento, calidad de código, seguridad,
  UX, y comparación contra estándares del mercado por sector. Genera scorecard
  ejecutivo con semáforo por categoría.
  Triggers: "qué tan bueno es mi sistema", "benchmark", "comparar con el mercado",
  "scorecard", "métricas de calidad", "mide el rendimiento".
invocation: auto
---

# 📊 System Benchmarking — Medición contra Estándares del Mercado

> **Perfil:** 15+ años midiendo y comparando sistemas en producción real.  
> **Entrega:** Scorecard ejecutivo con comparativa de mercado por sector.

---

## 🤖 Agentes Activos

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Benchmark Planner | Estrategia y baseline |
| 2 | Performance Benchmarker | Lighthouse, server profiling |
| 3 | Quality Benchmarker | Métricas de código, deuda técnica |
| 4 | Security Benchmarker | OWASP compliance score |
| 5 | UX Benchmarker | Core Web Vitals, WCAG |
| 6 | Comparador de Mercado | Análisis por sector/industria |
| 7 | Score Reporter | Scorecard ejecutivo |

---

## 📋 Áreas de Benchmarking

### 1. Rendimiento (Performance)
```
Métricas:
  - LCP (Largest Contentful Paint): target ≤ 2.5s
  - INP (Interaction to Next Paint): target ≤ 200ms
  - CLS (Cumulative Layout Shift): target ≤ 0.1
  - TTFB (Time to First Byte): target ≤ 800ms
  - Lighthouse Performance Score: target ≥ 90
  - API Response Time p95: target ≤ 500ms
  - Database Query Time p95: target ≤ 100ms
```

### 2. Calidad de Código
```
Métricas:
  - Test Coverage: target ≥ 80%
  - Complejidad Ciclomática promedio: target ≤ 10
  - Código duplicado: target ≤ 3%
  - Archivos > 300 líneas: target = 0
  - TODO/FIXME pendientes: target ≤ 5
  - Dependencies outdated (major): target = 0
```

### 3. Seguridad
```
Métricas:
  - OWASP Top 10 compliance: target = 10/10
  - CVEs en dependencias: target = 0 críticos
  - Security Headers score: target = A+
  - SSL/TLS grade: target = A+
```

### 4. UX/Accesibilidad
```
Métricas:
  - WCAG AA compliance: target = 100%
  - Lighthouse Accessibility: target ≥ 90
  - Mobile Usability (Google): target = 0 errores
  - Touch target size compliance: target = 100%
```

### 5. DORA Metrics
```
  - Deployment Frequency: target según tier
  - Lead Time for Changes: target según tier
  - Change Failure Rate: target ≤ 10%
  - Mean Time to Recovery: target ≤ 1 hora
```

---

## 📊 Formato de Scorecard

```markdown
## 📊 Scorecard — [Sistema] — [Fecha]

### Resumen Ejecutivo
Score Total: X/100 — Nivel: [Elite / High / Medium / Low]

### Desglose por Área

| Área | Score | Nivel | vs Mercado |
|------|-------|-------|-----------|
| Rendimiento | X/20 | 🔴🟡🟢 | ↑↓ promedio del sector |
| Calidad de Código | X/20 | 🔴🟡🟢 | ↑↓ promedio del sector |
| Seguridad | X/20 | 🔴🟡🟢 | ↑↓ promedio del sector |
| UX/Accesibilidad | X/20 | 🔴🟡🟢 | ↑↓ promedio del sector |
| DORA Metrics | X/20 | 🔴🟡🟢 | ↑↓ promedio del sector |

### Top 3 Fortalezas
1. [fortaleza con evidencia]

### Top 3 Oportunidades de Mejora
1. [oportunidad con acción concreta]

### Comparativa de Mercado
[Cómo se posiciona el sistema vs el promedio del sector]
```

---

## ⚠️ Reglas

```
1. Medir con datos reales, no aproximaciones
2. Siempre comparar con benchmarks del mercado por sector
3. El scorecard es para toma de decisiones, no para decorar
4. Priorizar las 3 métricas más impactantes para mejorar
5. No inflar scores — ser honesto incluso si los números son malos
```

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```

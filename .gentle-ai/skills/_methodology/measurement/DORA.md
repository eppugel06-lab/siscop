# 📊 DORA Metrics — Métricas de Rendimiento de Ingeniería

> **Referencia:** DORA (DevOps Research and Assessment) — Google Cloud  
> **Principio:** Lo que no se mide, no se mejora. DORA mide la efectividad  
> del equipo de ingeniería con 4 métricas clave.

---

## 🎯 Las 4 Métricas DORA

### 1. Deployment Frequency (Frecuencia de Deploy)
**Pregunta:** ¿Con qué frecuencia hacemos deploy a producción?

| Nivel | Frecuencia | Clasificación |
|-------|-----------|---------------|
| 🟢 Elite | Múltiples veces al día | On-demand |
| 🟢 High | Entre una vez al día y una vez a la semana | Semanal |
| 🟡 Medium | Entre una vez a la semana y una vez al mes | Bi-semanal |
| 🔴 Low | Menos de una vez al mes | Mensual+ |

**Cómo mejorar:**
- CI/CD automatizado con zero-downtime deploys
- Feature flags para deploy sin activar features
- Trunk-based development (PRs cortos, merge rápido)

---

### 2. Lead Time for Changes (Tiempo de Entrega)
**Pregunta:** ¿Cuánto tiempo pasa desde un commit hasta producción?

| Nivel | Tiempo | Clasificación |
|-------|--------|---------------|
| 🟢 Elite | Menos de 1 hora | Automático |
| 🟢 High | Entre 1 día y 1 semana | Ágil |
| 🟡 Medium | Entre 1 semana y 1 mes | Proceso |
| 🔴 Low | Más de 1 mes | Burocrático |

**Cómo mejorar:**
- Pipelines de CI que corren en < 10 minutos
- Code review en < 24 horas
- Automated testing gate (no manual QA blocking)
- PRs pequeños (< 400 líneas de cambio)

---

### 3. Change Failure Rate (Tasa de Fallos en Cambios)
**Pregunta:** ¿Qué porcentaje de deploys causa un incidente?

| Nivel | Tasa | Clasificación |
|-------|------|---------------|
| 🟢 Elite | 0-5% | Excelente |
| 🟢 High | 5-10% | Bueno |
| 🟡 Medium | 10-15% | Aceptable |
| 🔴 Low | 15%+ | Problemático |

**Cómo mejorar:**
- Testing exhaustivo (unit + integration + E2E)
- Canary deployments (1% tráfico primero)
- Feature flags con kill-switch
- Staging environment idéntico a producción

---

### 4. Mean Time to Recovery (Tiempo Medio de Recuperación)
**Pregunta:** ¿Cuánto tardamos en restaurar servicio después de un incidente?

| Nivel | Tiempo | Clasificación |
|-------|--------|---------------|
| 🟢 Elite | Menos de 1 hora | Automatizado |
| 🟢 High | Menos de 1 día | Rápido |
| 🟡 Medium | Entre 1 día y 1 semana | Manual |
| 🔴 Low | Más de 1 semana | Caótico |

**Cómo mejorar:**
- Runbooks documentados para incidentes comunes
- Rollback automatizado (1 comando)
- Monitoreo con alertas proactivas
- On-call rotation con escalamiento claro

---

## 📋 Scorecard DORA del Proyecto

```markdown
## DORA Scorecard — [Proyecto] — [Fecha]

| Métrica | Valor Actual | Nivel | Target |
|---------|-------------|-------|--------|
| Deployment Frequency | [valor] | 🔴🟡🟢 | [target] |
| Lead Time for Changes | [valor] | 🔴🟡🟢 | [target] |
| Change Failure Rate | [valor] | 🔴🟡🟢 | [target] |
| Mean Time to Recovery | [valor] | 🔴🟡🟢 | [target] |

### Plan de Mejora
1. [acción para mejorar métrica más débil]
2. [siguiente acción]
3. [siguiente acción]
```

---

## 🔗 Relación con el Sistema de Skills

| Skill | Métricas DORA que evalúa |
|-------|--------------------------|
| `system-audit` | Las 4 métricas como parte del diagnóstico |
| `system-benchmarking` | Comparación DORA vs mercado por sector |
| `system-observability` | Herramientas para medir las métricas |
| `system-governance` | SLAs basados en targets DORA |

---

## 🎯 Targets Recomendados por Tipo de Proyecto

| Tipo | DF | LT | CFR | MTTR |
|------|----|----|-----|------|
| **Startup/MVP** | Semanal | < 1 semana | < 15% | < 1 día |
| **SaaS B2B** | Diario | < 1 día | < 10% | < 4 horas |
| **Enterprise** | Semanal | < 1 semana | < 5% | < 1 hora |
| **Fintech/Salud** | Bi-semanal | < 1 semana | < 2% | < 30 min |

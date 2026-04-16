---
name: system-audit
description: >
  Auditoría técnica profesional de sistemas existentes. Analiza arquitectura,
  seguridad, rendimiento, deuda técnica, calidad de código y estándares.
  Genera scorecard con diagnóstico por área y plan de acción priorizado.
  Triggers: "revisa mi sistema", "audita", "qué tan bien está mi código",
  "analiza mi proyecto", "tiene problemas de rendimiento", "revisar seguridad",
  "evalúa la calidad", "code review completo".
invocation: auto
---

# 🔍 System Audit — Auditoría Técnica Profesional

> **Perfil del equipo:** 15+ años de experiencia en auditoría de sistemas en producción.  
> **Entrega:** Scorecard ejecutivo + hallazgos priorizados + plan de acción.

---

## 📋 Proceso de Auditoría

### Fase 1: Intake (Recolección de Información)

**Preguntas obligatorias al usuario:**
1. ¿Qué tipo de sistema es? (web app, API, mobile, monolito, microservicios)
2. ¿Cuál es el stack tecnológico? (o compartir `package.json` / `requirements.txt`)
3. ¿Cuánto tiempo tiene el sistema en producción?
4. ¿Cuál es el problema principal o la motivación de la auditoría?
5. ¿Tienes tests automatizados? ¿Qué cobertura?

**Si el usuario comparte código, analizar automáticamente:**
- Estructura de carpetas
- Dependencias y versiones
- Patrones de código
- Archivos de configuración

---

### Fase 2: Análisis por Área

#### 🔒 Seguridad (peso: 25%)
```
Checklist basado en _methodology/security/OWASP.md:
- [ ] A01: Control de acceso
- [ ] A02: Criptografía (contraseñas, HTTPS)
- [ ] A03: Inyección (SQL, XSS, CSRF)
- [ ] A05: Configuración segura (headers, debug mode)
- [ ] A06: Dependencias vulnerables (npm audit / pip-audit)
- [ ] A07: Autenticación (rate limiting, MFA, session)
- [ ] Secrets en código fuente (hardcoded passwords, API keys)
- [ ] CORS configurado correctamente
```

#### 🏗️ Arquitectura (peso: 25%)
```
Checklist basado en _methodology/quality/:
- [ ] Separación de capas (Clean Architecture / al menos MVC)
- [ ] Principios SOLID respetados
- [ ] Dependencias apuntan hacia adentro (no se importa infra en dominio)
- [ ] Patrones de diseño apropiados (no over/under-engineering)
- [ ] Manejo de errores consistente y centralizado
- [ ] Configuración externalizada (env vars, no hardcoded)
- [ ] Naming conventions consistentes
- [ ] Tamaño de archivos razonable (< 300 líneas idealmente)
```

#### ⚡ Rendimiento (peso: 20%)
```
Checklist basado en _methodology/measurement/core-web-vitals.md:
- [ ] Queries N+1 detectados
- [ ] Índices de BD apropiados
- [ ] Cache strategy implementada
- [ ] Lazy loading de recursos pesados
- [ ] Bundle size razonable (frontend)
- [ ] Paginación en listas
- [ ] Connection pooling (BD)
- [ ] Compresión (gzip/brotli)
```

#### 🧹 Deuda Técnica (peso: 15%)
```
- [ ] Código duplicado (DRY violations)
- [ ] TODO/FIXME/HACK comments pendientes
- [ ] Dependencias desactualizadas (major versions atrás)
- [ ] Código muerto (funciones no usadas)
- [ ] Archivos gigantes (> 500 líneas)
- [ ] Complejidad ciclomática alta
- [ ] Tests: cobertura actual vs ideal
```

#### 📏 Estándares (peso: 15%)
```
- [ ] Linter configurado y sin warnings ignorados
- [ ] Formatter consistente (Prettier o equivalente)
- [ ] Conventional Commits (o al menos commits descriptivos)
- [ ] README actualizado y útil
- [ ] Documentación de API (si tiene API)
- [ ] Gitignore correcto (.env no expuesto)
- [ ] CI/CD configurado
```

---

### Fase 3: Scorecard y Diagnóstico

**Formato de entrega (output-formats.md → Diagnóstico):**

```markdown
## 🔍 Auditoría Técnica — [Nombre del Sistema]

### Resumen Ejecutivo
[1-3 líneas con hallazgo principal y nivel de riesgo]

### Scorecard

| Área | Estado | Score | Hallazgos Críticos |
|------|--------|-------|--------------------|
| Seguridad | 🔴🟡🟢 | X/10 | [N] críticos |
| Arquitectura | 🔴🟡🟢 | X/10 | [N] críticos |
| Rendimiento | 🔴🟡🟢 | X/10 | [N] críticos |
| Deuda Técnica | 🔴🟡🟢 | X/10 | [N] críticos |
| Estándares | 🔴🟡🟢 | X/10 | [N] críticos |
| **TOTAL** | 🔴🟡🟢 | **X/50** | |

### Hallazgos Priorizados

| # | Severidad | Área | Hallazgo | Impacto | Solución |
|---|-----------|------|----------|---------|----------|
| 1 | 🔴 CRÍTICO | [área] | [qué] | [riesgo] | [cómo] |
| 2 | 🟡 MEDIO | [área] | [qué] | [riesgo] | [cómo] |

### Plan de Acción Recomendado

| Prioridad | Acción | Esfuerzo | Skill sugerido |
|-----------|--------|----------|----------------|
| P0 (inmediato) | [acción] | [horas/días] | [skill] |
| P1 (esta semana) | [acción] | [horas/días] | [skill] |
| P2 (este mes) | [acción] | [horas/días] | [skill] |
```

---

### Fase 4: Recomendaciones

Después del scorecard, ofrecer:
1. **Quick wins** — cosas que se pueden arreglar en < 1 hora
2. **Plan de refactorización** — si la deuda es grande
3. **Derivación a skills** — `system-security` si hay 🔴 en seguridad, etc.

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | OWASP Auditor | Revisa los 10 riesgos de seguridad |
| 2 | Arquitecto de Software | Evalúa estructura y patrones |
| 3 | Performance Engineer | Detecta cuellos de botella |
| 4 | QA Lead | Evalúa cobertura de tests |
| 5 | Documentador Técnico | Verifica docs y README |
| 6 | Score Reporter | Genera scorecard ejecutivo |

---

## ⚠️ Reglas del Skill

```
1. NUNCA modificar código durante la auditoría — es solo diagnóstico
2. Si se encuentra algo CRÍTICO en seguridad, alertar inmediatamente
3. El usuario elige si proceder con correcciones (fase PLAN → EXECUTE)
4. Comparar contra estándares del mercado, no contra perfección teórica
5. Priorizar hallazgos por impacto real, no por cantidad
6. Si el sistema es MVP/startup, ajustar expectativas (no exigir enterprise)
```

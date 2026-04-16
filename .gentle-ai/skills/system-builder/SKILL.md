---
name: system-builder
description: >
  Construcción profesional de sistemas desde cero. Genera estructura de proyecto,
  arquitectura, código base, configuración, tests y documentación siguiendo
  estándares enterprise. Cada proyecto incluye su propio AGENTS.md.
  Triggers: "construye", "crea un sistema", "nuevo proyecto", "hacer desde cero",
  "scaffolding", "generar la base", "crear la aplicación", "iniciar proyecto".
invocation: auto
---

# 🏗️ System Builder — Construcción de Sistemas desde Cero

> **Perfil del equipo:** 15+ años construyendo sistemas en producción.  
> **Entrega:** Proyecto funcionando con estructura profesional, tests y docs.

---

## 📋 Proceso de Construcción

### Fase 1: Discovery (Entendimiento)

**Preguntas al usuario (máximo 5):**
1. ¿Qué tipo de sistema necesitas? (web app, API, mobile, fullstack)
2. ¿Tienes stack preferido o elegimos el óptimo? (ver `stack-decision-guide.md`)
3. ¿Cuáles son las 3-5 funcionalidades principales del MVP?
4. ¿Habrá múltiples tipos de usuarios/roles?
5. ¿Hay sistema existente con el que deba integrarse?

**Si el usuario tiene specs (system-specs generó artefactos):**
- Leer `spec/requirements/` y usar como base
- Respetar contratos de API existentes
- Implementar invariantes de `spec/domain/INVARIANTS.md`

---

### Fase 2: Arquitectura (PLAN)

**El Arquitecto propone:**

```markdown
## Plan de Construcción — [Nombre del Proyecto]

### Stack Seleccionado (Evaluado vs free-for.dev)
| Capa | Tecnología | Justificación | Límites de Capa Gratuita / Warning de Costo |
|------|-----------|---------------|---------------------------------------------|
| Frontend | [X] | [por qué] | [ej: límites de bandwidth en Vercel] |
| Backend | [X] | [por qué] | [ej: Render inactiva apps en free tier] |
| BD | [X] | [por qué] | [ej: Supabase Pausing o límites de GB] |
| Auth | [X] | [por qué] | [ej: Clerk MAUs limits] |
| Infra | [X] | [por qué] | [ej: límites o costo fijo self-hosted] |

### Estructura del Proyecto
[Árbol de carpetas propuesto]

### Módulos a Crear (orden de implementación)
1. [módulo 1] — [descripción] — [estimación]
2. [módulo 2] — [descripción] — [estimación]

### ¿Apruebas este plan? (S/N)
```

---

### Fase 3: Scaffolding (Estructura Base)

Una vez aprobado el plan, generar en orden:

```
1. Configuración del proyecto
   ├── package.json / pyproject.toml
   ├── tsconfig.json / eslint config
   ├── .env.example
   ├── .gitignore
   ├── docker-compose.yml (si aplica)
   └── README.md (inicial)

2. Estructura de carpetas (Clean Architecture)
   ├── src/domain/
   ├── src/application/
   ├── src/infrastructure/
   └── src/presentation/

3. Código base
   ├── Entry point (main.ts / app.py)
   ├── Configuración de BD
   ├── Middleware base (auth, error handling, CORS)
   ├── Health check endpoint
   └── Logger configurado

4. Testing scaffold
   ├── Configuración de test runner
   ├── Test de health check
   └── Fixtures / factories base

5. AGENTS.md del proyecto
   └── Stack, comandos, convenciones, prohibiciones
```

---

### Fase 4: Implementación por Módulo

Cada módulo se construye en orden de dependencias:

```
Para cada módulo:
  1. Modelo de dominio (entities, value objects)
  2. Caso de uso (application service)
  3. Repository interface (port)
  4. Repository implementation (adapter)
  5. Controller / Route
  6. Validación de input (schemas)
  7. Tests (unit → integration)
  8. Documentación de API (OpenAPI)
```

---

### Fase 5: Hardening y Entrega

```
1. Security checklist (OWASP básico)
   - [ ] Inputs sanitizados
   - [ ] Auth en todos los endpoints protegidos
   - [ ] Rate limiting configurado
   - [ ] CORS restrictivo
   - [ ] Secrets en env vars

2. Performance baseline
   - [ ] Índices de BD creados
   - [ ] Paginación implementada
   - [ ] Cache donde aplique

3. Documentación completa
   - [ ] README con setup instructions
   - [ ] AGENTS.md del proyecto
   - [ ] API docs (Swagger/Scalar)
   - [ ] Comandos de dev, test, build

4. CI/CD (si aplica)
   - [ ] Lint + Tests en CI
   - [ ] Build verificado
   - [ ] Deploy script
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Arquitecto de Software | Diseño de estructura y patrones |
| 2 | Estratega de Plataforma | Web vs Mobile vs Fullstack |
| 3 | Frontend/Backend Senior | Implementación de código |
| 4 | Database Engineer | Modelo de datos y migraciones |
| 5 | Auth Engineer | Sistema de autenticación |
| 6 | QA Lead + Unit Tester | Tests del proyecto |
| 7 | Documentador Técnico | README + AGENTS.md |
| 8 | DevOps Engineer | Docker + CI/CD |

---

## 📂 Estructura de Entrega

```
proyecto/
├── src/
│   ├── domain/          ← Entidades y reglas de negocio
│   ├── application/     ← Casos de uso
│   ├── infrastructure/  ← BD, APIs externas, cache
│   └── presentation/    ← Routes, controllers, UI
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   └── api/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
└── AGENTS.md            ← Generado para el proyecto
```

---

## ⚠️ Reglas del Skill

```
1. SIEMPRE generar AGENTS.md del proyecto
2. SIEMPRE incluir tests (mínimo unit tests de módulos críticos)
3. SIEMPRE separar configuración en .env (nunca hardcoded)
4. NUNCA generar código con placeholders ("// tu código aquí")
5. NUNCA elegir stack sin justificar (ver stack-decision-guide.md)
6. El código generado debe funcionar al ejecutar npm run dev / python main.py
7. Si hay specs existentes, respetarlas al 100%
8. Progressive: no entregar todo de golpe — módulo por módulo
9. SIEMPRE leer los templates ubicados en templates/*.md antes de generar el output. NUNCA inventar el formato.
```

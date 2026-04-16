---
name: system-specs
description: >
  Genera especificaciones completas: requisitos, casos de uso, contratos API,
  escenarios BDD, invariantes de negocio y ADRs. Usar cuando el usuario quiere
  definir qué debe hacer un sistema antes de construirlo.
  Triggers: "define los requisitos", "especificaciones", "casos de uso",
  "qué debe hacer el sistema", "documenta los requerimientos".
invocation: auto
---

# 📐 System Specs — Especificación Completa de Sistemas

> **Perfil:** 15+ años en ingeniería de requisitos y especificación formal.  
> **Metodología:** SDD (Specification Driven Development) — ver `_methodology/specification/SDD.md`

---

## 📋 Pipeline de Especificación

```
  Usuario describe el sistema
         │
         ▼
  ┌─────────────────────┐
  │ Requirements        │  → REQ-F-XXX.md (requisitos funcionales)
  │ Engineer            │  → REQ-NF-XXX.md (no funcionales, si aplica)
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Specifications      │  → UC-XXX.md (casos de uso)
  │ Engineer            │  → Flujos principales y alternativos
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ DDD Modeler         │  → Entidades, Aggregates, Value Objects
  │                     │  → INVARIANTS.md (reglas de negocio)
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ API Designer        │  → API-XXX.md (contratos API)
  │                     │  → OpenAPI spec
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BDD Writer          │  → BDD-UC-XXX.md (escenarios Gherkin)
  │                     │  → Acceptance criteria
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ ADR Recorder        │  → ADR-XXX.md (decisiones arquitecturales)
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ Spec Auditor        │  → Verificación de trazabilidad
  │                     │  → Cobertura: REQ→UC→API→BDD→INV
  │                     │  → 0 artefactos huérfanos
  └─────────────────────┘
```

---

## 📂 Estructura de Output

```
spec/
├── requirements/
│   ├── REQ-F-001.md
│   ├── REQ-F-002.md
│   └── ...
├── use-cases/
│   ├── UC-001.md
│   └── ...
├── contracts/
│   ├── API-001.md
│   └── openapi.yaml
├── tests/
│   ├── BDD-UC-001.md
│   └── ...
├── domain/
│   └── INVARIANTS.md
├── decisions/
│   ├── ADR-001.md
│   └── ...
└── TRACEABILITY.md      ← Matriz de trazabilidad completa
```

---

## 🎯 Preguntas de Onboarding

1. ¿Qué problema resuelve el sistema? (1-2 párrafos)
2. ¿Quiénes son los usuarios/actores principales?
3. ¿Cuáles son las 5 funcionalidades más importantes?
4. ¿Hay restricciones de negocio conocidas?
5. ¿Ya hay sistema existente o es desde cero?

---

## 📊 Matriz de Trazabilidad

```markdown
## Trazabilidad — [Sistema]

| REQ | Título | Prioridad | UC | API | BDD | INV | Estado |
|-----|--------|-----------|-----|-----|-----|-----|--------|
| REQ-F-001 | [título] | Must | UC-001 | API-001 | BDD-UC-001 | INV-001 | ✅ Completo |
| REQ-F-002 | [título] | Should | UC-002 | API-002 | BDD-UC-002 | — | ✅ Completo |
| REQ-F-003 | [título] | Must | — | — | — | — | ❌ Sin spec |

### Métricas de Cobertura
- REQs con UC: X/Y (Z%)
- REQs con API: X/Y (Z%)
- REQs con BDD: X/Y (Z%)
- Artefactos huérfanos: N
- Referencias rotas: N
```

---

## ⚠️ Reglas del Skill

```
1. SIEMPRE usar priorización MoSCoW
2. SIEMPRE generar trazabilidad completa (TRACEABILITY.md)
3. Cada requisito Must Have DEBE tener UC + BDD mínimo
4. Los contratos de API usan formato OpenAPI
5. Los escenarios BDD están en Gherkin válido
6. El Spec Auditor verifica todo antes de entregar
7. Si el usuario no sabe sus requisitos, ayudar a descubrirlos
   (no esperar que venga con la lista hecha)
8. SIEMPRE leer los templates ubicados en templates/*.md antes de generar cualquier especificación. NUNCA inventar el formato.
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

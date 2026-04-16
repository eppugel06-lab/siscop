# 📐 SDD — Specification Driven Development

> **Principio:** El código es la consecuencia de una especificación bien definida.  
> Nunca al revés. Especificar primero, implementar después.

---

## 🎯 ¿Qué es SDD?

SDD es la disciplina de definir **completamente** qué debe hacer un sistema antes de escribir una sola línea de código. Cada funcionalidad tiene:

1. **Requisito** (REQ) — qué necesita el negocio
2. **Caso de uso** (UC) — cómo interactúa el usuario
3. **Contrato de API** (API) — qué expone el sistema
4. **Escenario BDD** (BDD) — cómo se verifica
5. **Invariante** (INV) — qué nunca debe violarse
6. **Decisión** (ADR) — por qué se eligió así

---

## 📊 Pipeline de Especificación

```
Requisito → Caso de Uso → Contrato API → Escenario BDD → Invariante → ADR
   REQ          UC            API            BDD            INV         ADR
    │            │              │              │              │           │
    └────────────┴──────────────┴──────────────┴──────────────┴───────────┘
                            TRAZABILIDAD COMPLETA
```

---

## 📋 Reglas del Pipeline

### R1: Todo requisito debe ser trazable
```
REQ-F-001 → UC-001 → API-001 → BDD-UC-001 → INV-001
```
Si un requisito no tiene caso de uso, no está especificado.  
Si un caso de uso no tiene test BDD, no está verificado.

### R2: Priorización MoSCoW obligatoria
| Nivel | Significado | Acción |
|-------|-------------|--------|
| **Must Have** | Sin esto el sistema no funciona | Implementar en MVP |
| **Should Have** | Importante pero no bloqueante | Implementar en v1.1 |
| **Could Have** | Deseable si hay tiempo | Backlog priorizado |
| **Won't Have** | Descartado para este scope | Documentar por qué |

### R3: Ningún artefacto huérfano
- Un API contract sin UC referenciado = error
- Un BDD scenario sin REQ = error
- Un ADR sin contexto de decisión = error

### R4: Versionado de especificaciones
```
Estado: Draft → Review → Approved → Implemented → Tested → Deprecated
```
Cada cambio en un artefacto aprobado requiere ADR explicando por qué.

---

## 🔍 Métricas de Cobertura SDD

| Métrica | Fórmula | Target |
|---------|---------|--------|
| Cobertura de Requisitos | REQs con UC / Total REQs | 100% |
| Cobertura de API | UCs con API contract / Total UCs | 100% |
| Cobertura de Tests | REQs con BDD / Total REQs | ≥90% |
| Artefactos Huérfanos | Items sin trazabilidad | 0 |
| Referencias Rotas | Links a artefactos inexistentes | 0 |

---

## ✅ Checklist antes de Implementar

- [ ] Todos los REQs tienen prioridad MoSCoW
- [ ] Todos los Must Have tienen UC definido
- [ ] Todos los UCs tienen al menos 1 flujo alternativo
- [ ] Todos los API contracts están en formato OpenAPI
- [ ] Todos los BDD están en formato Gherkin válido
- [ ] Las invariantes del dominio están documentadas
- [ ] Las decisiones arquitecturales tienen ADR
- [ ] No existen artefactos huérfanos
- [ ] El usuario ha aprobado la especificación

---

## 🚫 Anti-patterns

```
❌ "Ya sé lo que quiere el cliente, empecemos a codear"
   → Ningún proyecto real funciona sin especificación escrita

❌ "Los tests los escribimos después"
   → Los escenarios BDD son parte de la especificación, no del testing

❌ "El API ya lo definimos conforme avanzamos"
   → Los contratos de API se definen antes para evitar re-trabajo

❌ "Este requisito es obvio, no necesita documentación"
   → Lo obvio para uno es ambiguo para otro. Documentar siempre.
```

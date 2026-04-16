# 🏛️ ADR — Architecture Decision Records

> **Principio:** Toda decisión arquitectural importante se documenta con contexto,  
> alternativas evaluadas y justificación. Las decisiones no se pierden en Slack ni en la memoria.

---

## 🎯 ¿Qué es un ADR?

Un Architecture Decision Record es un documento corto que captura UNA decisión técnica significativa: por qué se tomó, qué alternativas se consideraron, y cuáles son las consecuencias aceptadas.

---

## 📋 Template Estándar

```markdown
# ADR-XXX: [Título de la Decisión]

## Estado
Propuesta | Aceptada | Rechazada | Deprecada | Reemplazada por ADR-YYY

## Fecha
YYYY-MM-DD

## Contexto
[Situación que obligó a tomar esta decisión.
¿Qué problema se está resolviendo?
¿Qué restricciones existen?]

## Opciones Consideradas

### Opción A: [nombre]
- ✅ Pro: [ventaja]
- ✅ Pro: [ventaja]
- ❌ Contra: [desventaja]

### Opción B: [nombre]
- ✅ Pro: [ventaja]
- ❌ Contra: [desventaja]
- ❌ Contra: [desventaja]

### Opción C: [nombre]
- ✅ Pro: [ventaja]
- ❌ Contra: [desventaja]

## Decisión
Se elige la **Opción [X]** porque [justificación basada en el contexto y restricciones].

## Consecuencias

### Positivas
- [beneficio 1]
- [beneficio 2]

### Negativas (trade-offs aceptados)
- [limitación aceptada 1]
- [limitación aceptada 2]

### Riesgos
- [riesgo identificado] → mitigación: [plan]
```

---

## 🔍 ¿Cuándo crear un ADR?

| Situación | ¿ADR? | Ejemplo |
|-----------|-------|---------|
| Elegir framework/librería | ✅ Sí | "Usamos Next.js en vez de Nuxt" |
| Decidir arquitectura | ✅ Sí | "Monolito modular en vez de microservicios" |
| Elegir base de datos | ✅ Sí | "PostgreSQL en vez de MongoDB" |
| Definir patrón de auth | ✅ Sí | "JWT con refresh token rotation" |
| Cambiar convención de código | ✅ Sí | "Adoptamos Conventional Commits" |
| Renombrar una variable | ❌ No | Demasiado granular |
| Arreglar un bug | ❌ No | No es decisión arquitectural |
| Actualizar una dependencia minor | ❌ No | No cambia la arquitectura |

---

## 📊 Ciclo de Vida de un ADR

```
Draft → Propuesta → Revisión → Aceptada → [Vigente]
                                              │
                                              ├── Deprecada (ya no aplica)
                                              └── Reemplazada por ADR-YYY
```

**Regla clave:** Los ADRs nunca se eliminan. Se marcan como `Deprecada` o `Reemplazada`.  
Esto preserva el historial de decisiones del proyecto.

---

## 📂 Ubicación

```
spec/decisions/
├── ADR-001-framework-frontend.md
├── ADR-002-base-de-datos.md
├── ADR-003-patron-autenticacion.md
├── ADR-004-estrategia-deploy.md
└── ADR-005-monolito-vs-microservicios.md
```

Nomenclatura: `ADR-[número]-[slug-descriptivo].md`

---

## 🎯 Criterios de Calidad de un ADR

| Criterio | Cumple | No Cumple |
|----------|--------|-----------|
| Contexto claro | "Necesitamos auth stateless para 3 microservicios" | "Hay que implementar auth" |
| Alternativas reales | 3 opciones con pros/contras concretos | "Era JWT o nada" |
| Justificación técnica | "JWT permite verificación sin consultar BD" | "Porque es lo que se usa" |
| Consecuencias explícitas | "Trade-off: tokens no revocables sin blacklist" | Sin mención de trade-offs |
| Independiente | Se entiende sin leer otros documentos | Requiere contexto externo |

---

## 🚫 Anti-patterns

```
❌ "ADR retroactivo" — Documentar una decisión meses después de tomarla
   → Crear ADRs en el momento de la decisión, no como burocracia posterior

❌ "ADR sin alternativas" — "Decidimos usar X"
   → Si no hubo alternativas, no es una decisión — es un requerimiento

❌ "ADR político" — Justificar una decisión ya tomada por alguien más
   → El ADR debe reflejar un análisis técnico honesto

❌ "ADR infinito" — Documento de 5 páginas
   → Un ADR debe leerse en 2 minutos máximo
```

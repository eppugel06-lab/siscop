---
name: system-skill-improver
description: >
  Audita y mejora el propio sistema de skills. Detecta instrucciones ambiguas,
  redundancias entre skills, gaps de cobertura, inconsistencias y sugiere mejoras.
  Triggers: "mejora el skill", "audita los skills", "el skill no funciona bien",
  "actualiza las instrucciones", "optimiza el sistema de skills".
disable-model-invocation: true
---

# 🔄 System Skill Improver — Meta-Auditoría del Sistema

> **Perfil:** Meta-Auditor con 15+ años diseñando sistemas de IA.  
> **⚠️ Solo invocable explícitamente** — no se auto-ejecuta.  
> **Entrega:** Reporte de salud del sistema de skills con mejoras concretas.

---

## 🔍 Qué Revisa

### 1. Estructura de cada SKILL.md
```
- [ ] Frontmatter YAML correcto (name, description, invocation)
- [ ] Description incluye triggers suficientes
- [ ] Description es menor a 500 caracteres
- [ ] El archivo no supera 500 líneas
- [ ] Tiene sección de agentes con orden definido
- [ ] Tiene sección de reglas
- [ ] Tiene formato de entrega definido
```

### 2. Consistencia entre Skills
```
- [ ] No hay instrucciones contradictorias entre skills
- [ ] No hay responsabilidades duplicadas
- [ ] El router cubre todos los skills existentes
- [ ] Cada skill referenciado en el router tiene su SKILL.md
- [ ] Los agentes referenciados existen en agent-roles.md
```

### 3. Archivos Referenciados
```
- [ ] Todos los templates referenciados en skills existen
- [ ] Todos los archivos _shared/ referenciados existen
- [ ] Todos los archivos _methodology/ referenciados existen
- [ ] No hay archivos huérfanos (existen pero no se referencian)
```

### 4. Cobertura
```
- [ ] ¿Hay un skill para cada tipo de consulta común?
- [ ] ¿Hay gaps? (consultas que no se mapean a ningún skill)
- [ ] ¿Hay solapamiento excesivo entre skills?
```

### 5. Calidad de Instrucciones
```
- [ ] ¿Las instrucciones son claras y sin ambigüedad?
- [ ] ¿Los formatos de entrega son consistentes?
- [ ] ¿Las prohibiciones están explícitas?
- [ ] ¿Hay ejemplos concretos vs instrucciones abstractas?
```

---

## 📊 Formato de Reporte

```markdown
## 🔄 Auditoría del Sistema de Skills — [Fecha]

### Salud General
Score: X/100

### Hallazgos

| # | Tipo | Archivo | Problema | Solución |
|---|------|---------|----------|---------|
| 1 | 🔴 Error | [file] | [qué] | [cómo] |
| 2 | 🟡 Warning | [file] | [qué] | [cómo] |
| 3 | 🟢 Sugerencia | [file] | [qué] | [cómo] |

### Métricas
- Skills totales: N
- Skills con frontmatter correcto: N/N
- Templates referenciados vs existentes: N/N
- Agentes definidos: 103
- Líneas promedio por skill: N

### Gaps Detectados
- [tipo de consulta sin skill]

### Recomendaciones de Mejora
1. [mejora prioritaria]
2. [siguiente mejora]
```

---

## ⚠️ Reglas

```
1. Solo se invoca cuando el usuario lo pide explícitamente
2. No modifica archivos — solo reporta y sugiere
3. Las mejoras se implementan con aprobación del usuario
4. Priorizar: errores → warnings → sugerencias
```

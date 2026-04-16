---
name: system-docs
description: >
  Genera documentación técnica completa: README, comentarios de código,
  documentación de API (OpenAPI), diagramas de arquitectura (C4), guías
  de instalación y AGENTS.md del proyecto.
  Triggers: "documenta", "README", "comenta el código", "documenta la API",
  "genera el AGENTS.md", "diagrama de arquitectura".
invocation: auto
---

# 📖 System Docs — Documentación Técnica Completa

> **Perfil:** 15+ años escribiendo documentación que la gente realmente lee.  
> **Principio:** La documentación no leída es documentación muerta.  
> Escribir solo lo que aporta valor y se mantiene actualizado.

---

## 🤖 Agentes Activos

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Comentador de Código | JSDoc, docstrings, inline comments |
| 2 | Documentador Técnico | README, guías, troubleshooting |
| 3 | Documentador de API | OpenAPI/Swagger |
| 4 | C4 Diagrammer | Diagramas de arquitectura |
| 5 | Generador de Flujos | Diagramas de secuencia/actividad |

---

## 📂 Documentos que Genera

### 1. README.md
```markdown
# [Nombre del Proyecto]

[Descripción en 1-2 líneas]

## 🚀 Quick Start
[3-5 comandos para tener el proyecto corriendo]

## 📋 Requisitos
[Node 20+, PostgreSQL 15+, etc.]

## 🛠️ Instalación
[Paso a paso]

## 🔧 Variables de Entorno
[Tabla con cada variable, descripción y ejemplo]

## 📂 Estructura del Proyecto
[Árbol de carpetas con descripción de cada una]

## 🧪 Tests
[Cómo ejecutar tests]

## 🚀 Deploy
[Cómo deployar]

## 📝 Convenciones
[Commits, branches, code style]

## 📄 Licencia
[Tipo de licencia]
```

### 2. AGENTS.md del Proyecto
```markdown
# AGENTS.md

## Stack tecnológico
- Frontend: [framework + versión]
- Backend: [framework + versión]
- Base de datos: [BD]
- Cache: [solución]
- Auth: [solución]
- Deploy: [plataforma]

## Comandos de desarrollo
- Instalar: `[comando]`
- Dev server: `[comando]`
- Tests: `[comando]`
- Build: `[comando]`
- Lint: `[comando]`

## Convenciones de código
- [convención 1]
- [convención 2]

## Estructura de directorios
[descripción de cada capa]

## Flujo de trabajo
- Commits: Conventional Commits
- Branches: feature/*, fix/*, chore/*
- PRs: requieren al menos 1 review

## Prohibiciones para agentes IA
- No modificar archivos de configuración de producción
- No actualizar dependencias major sin revisar breaking changes
- No hacer migraciones de BD sin backup
- No eliminar archivos sin confirmación explícita
```

### 3. API Documentation (OpenAPI)
→ Ver `_methodology/documentation/OpenAPI.md` para formato completo

### 4. Changelog
```markdown
# Changelog

## [1.0.0] — YYYY-MM-DD
### Added
- [feature nueva]
### Changed
- [cambio en feature existente]
### Fixed
- [bug corregido]
### Removed
- [feature eliminada]
```

---

## 📊 Comentarios de Código

### Cuándo comentar
```
✅ Comentar: lógica de negocio no obvia, decisiones técnicas, workarounds
❌ No comentar: código auto-explicativo, getters/setters, imports
```

### Formato JSDoc (TypeScript)
```typescript
/**
 * Calcula el total del presupuesto incluyendo impuestos y descuentos.
 * 
 * El descuento se aplica ANTES de impuestos (regla de negocio RN-004).
 * 
 * @param items - Partidas del presupuesto
 * @param taxRate - Tasa de impuesto (default: 16%)
 * @param globalDiscount - Descuento global en porcentaje (0-50)
 * @returns Total calculado con 2 decimales
 * @throws {ValidationError} Si items está vacío o taxRate es negativo
 * 
 * @example
 * calculateTotal([{ subtotal: 1000 }], 16, 10)
 * // → 1044 (1000 - 10% = 900, + 16% IVA = 1044)
 */
```

### Formato Docstring (Python)
```python
def calculate_total(
    items: list[BudgetItem],
    tax_rate: Decimal = Decimal("16"),
    global_discount: Decimal = Decimal("0"),
) -> Decimal:
    """Calcula el total del presupuesto incluyendo impuestos y descuentos.
    
    El descuento se aplica ANTES de impuestos (regla de negocio RN-004).
    
    Args:
        items: Partidas del presupuesto (mínimo 1).
        tax_rate: Tasa de impuesto en porcentaje. Default: 16%.
        global_discount: Descuento global en porcentaje (0-50).
    
    Returns:
        Total calculado con 2 decimales.
    
    Raises:
        ValidationError: Si items está vacío o tax_rate es negativo.
    """
```

---

## ⚠️ Reglas del Skill

```
1. README es obligatorio — todo proyecto lo tiene
2. AGENTS.md es obligatorio — para que cualquier IA entienda el proyecto
3. Documentar el POR QUÉ, no el QUÉ (el código muestra el qué)
4. API docs en formato OpenAPI 3.x — siempre
5. Diagramas C4 mínimo nivel 1 y 2
6. Changelog actualizado con cada release
7. Documentación que no se actualiza se elimina
8. SIEMPRE leer los templates ubicados en templates/*.md antes de generar el output. NUNCA inventar el formato.
```

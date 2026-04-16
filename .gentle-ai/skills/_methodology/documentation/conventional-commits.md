# 📝 Conventional Commits — Formato de Commits

> **Referencia:** conventionalcommits.org v1.0.0  
> **Principio:** Cada commit cuenta una historia clara: qué cambió, por qué,  
> y si rompe algo. Sin commits genéricos como "fix stuff" o "update".

---

## 🎯 Formato del Commit

```
<tipo>(<alcance opcional>): <descripción>

[cuerpo opcional]

[pie opcional]
```

### Ejemplo Completo
```
feat(budget): agregar cálculo automático de IVA

- Se calcula IVA del 16% sobre el subtotal de cada partida
- El total del presupuesto ahora incluye subtotal + IVA
- Se agrega campo `taxRate` configurable por cliente

Closes #142
BREAKING CHANGE: el campo `total` ahora incluye IVA
```

---

## 📋 Tipos de Commit

| Tipo | Cuándo Usar | Ejemplo |
|------|------------|---------|
| **feat** | Nueva funcionalidad | `feat(auth): agregar login con Google` |
| **fix** | Corrección de bug | `fix(budget): corregir cálculo de descuento` |
| **docs** | Solo documentación | `docs: actualizar README con instrucciones de deploy` |
| **style** | Formato, no lógica | `style: aplicar prettier a componentes` |
| **refactor** | Ni feat ni fix | `refactor(api): extraer validaciones a middleware` |
| **perf** | Mejora de rendimiento | `perf(queries): agregar índice a búsqueda de clientes` |
| **test** | Agregar/modificar tests | `test(budget): agregar tests de cálculo de IVA` |
| **build** | Sistema de build | `build: actualizar Node a v20 LTS` |
| **ci** | Configuración CI/CD | `ci: agregar step de lint a GitHub Actions` |
| **chore** | Mantenimiento | `chore: actualizar dependencias menores` |
| **revert** | Revertir commit | `revert: revertir "feat(auth): login con Google"` |

---

## 📏 Reglas Obligatorias

### 1. Descripción
```
✅ Imperativo, presente, minúsculas (sin punto final)
   feat(budget): agregar campo de descuento por partida

❌ Pasado
   feat(budget): agregó campo de descuento

❌ Con punto
   feat(budget): agregar campo de descuento.

❌ Capitalizado
   feat(budget): Agregar campo de descuento

❌ Genérica
   fix: arreglar cosas
   chore: actualizar
```

### 2. Alcance (Scope)
```
Opcional pero RECOMENDADO. Indica el módulo afectado.

Scopes comunes:
  auth, budget, api, ui, db, config, deps, docs, test

Regla: el scope debe coincidir con módulos reales del proyecto.
No inventar scopes — usar los existentes.
```

### 3. Breaking Changes
```
Si un commit rompe compatibilidad, marcarlo explícitamente:

Opción A: BREAKING CHANGE en el pie
  feat(api): cambiar formato de respuesta de paginación

  BREAKING CHANGE: el campo `totalItems` se renombra a `total`

Opción B: ! después del tipo
  feat(api)!: cambiar formato de respuesta de paginación
```

### 4. Longitud
```
- Primera línea: máximo 72 caracteres
- Cuerpo: líneas de máximo 100 caracteres
- Si no cabe en 72 chars, el commit es demasiado grande → dividir
```

---

## 🔗 Relación con Semantic Versioning

Los conventional commits se mapean directamente a versionado semántico:

| Tipo de Commit | Versión que Incrementa | Ejemplo |
|---------------|----------------------|---------|
| `fix` | PATCH (0.0.X) | 1.2.3 → 1.2.4 |
| `feat` | MINOR (0.X.0) | 1.2.3 → 1.3.0 |
| `BREAKING CHANGE` | MAJOR (X.0.0) | 1.2.3 → 2.0.0 |
| `docs`, `style`, `refactor`, `test`, `chore` | Ninguno | Sin release |

---

## 📊 Ejemplos por Escenario Real

```bash
# Nueva feature
feat(budget): agregar exportación a PDF

# Bug fix con referencia a issue
fix(auth): corregir expiración prematura de refresh token

Closes #87

# Refactor sin cambio funcional
refactor(api): migrar controladores a patrón use-case

Se extraen los handlers de las rutas a use-cases independientes
siguiendo clean architecture. Sin cambio en el comportamiento
de los endpoints.

# Performance improvement
perf(db): agregar índice compuesto en búsqueda de presupuestos

CREATE INDEX idx_budgets_client_status ON budgets(client_id, status);
Mejora query de listado de 850ms a 12ms.

# Breaking change
feat(api)!: migrar autenticación de cookies a JWT

BREAKING CHANGE: los endpoints ahora requieren header
Authorization: Bearer <token> en lugar de cookie de sesión.
Los clientes deben actualizar su implementación de auth.

# Revert
revert: revert "feat(budget): agregar exportación a PDF"

This reverts commit abc1234. La librería de PDF tiene
memory leak en producción con archivos > 50 páginas.
```

---

## ✅ Checklist de Commit

- [ ] Tipo correcto (feat/fix/docs/etc.)
- [ ] Scope que coincide con módulo real
- [ ] Descripción en imperativo, presente, minúsculas
- [ ] Máximo 72 caracteres en primera línea
- [ ] Breaking changes marcados con `!` o `BREAKING CHANGE`
- [ ] Un commit = un cambio lógico (no "fix multiple things")
- [ ] Referencia a issue si aplica (`Closes #XX`)

---

## 🛠️ Herramientas

| Herramienta | Función |
|------------|---------|
| **commitlint** | Valida formato de commits en CI |
| **husky** | Git hooks para validar antes de commit |
| **commitizen** | CLI interactivo para escribir commits |
| **semantic-release** | Release automático basado en commits |
| **standard-version** | Changelog automático |

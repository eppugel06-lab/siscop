---
name: system-dashboard
description: >
  Genera dashboard HTML interactivo que muestra el proceso completo del sistema:
  pipeline de agentes, trazabilidad de requisitos, métricas de cobertura, estado
  de cada artefacto. Inspirado en el SDD Verification Dashboard.
  Triggers: "dashboard", "ver el estado", "trazabilidad completa", "métricas del proyecto",
  "estado del sistema", "ver el proceso".
invocation: auto
---

# 📊 System Dashboard — Dashboard de Trazabilidad Interactivo

> **Perfil:** 15+ años en data visualization y dashboards ejecutivos.  
> **Entrega:** Dashboard HTML responsive, modo oscuro, filtros interactivos.

---

## 📋 Qué Muestra el Dashboard

### 1. Pipeline de Agentes
```
Visualización del flujo de agentes con contadores:

  [Router] → [Specs: 12 REQs] → [Builder: 8 módulos] → [Tester: 45 tests]
                   │                     │                      │
              ✅ 12/12            ✅ 6/8 ⚠️ 2          ✅ 42/45 ❌ 3
```

### 2. Métricas de Cobertura
```
| Métrica | Valor | Target | Estado |
|---------|-------|--------|--------|
| REQs con código | 85% | 100% | 🟡 |
| REQs con tests | 78% | ≥90% | 🟡 |
| Artefactos huérfanos | 2 | 0 | 🔴 |
| Referencias rotas | 0 | 0 | 🟢 |
```

### 3. Tabla de Requisitos
```
| ID | Título | Prioridad | UC | API | BDD | INV | CODE | TEST | STATUS |
|----|--------|-----------|----|----|-----|-----|------|------|--------|
| REQ-F-001 | [título] | Must | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟢 |
| REQ-F-002 | [título] | Should | ✅ | ✅ | ❌ | — | ✅ | ❌ | 🟡 |

Filtros: por estado, por prioridad, por completitud
Click en fila: ver detalle del requisito
```

### 4. Scorecard de Calidad
```
Score total: X/100
Gráfico radial con las 5 áreas
```

---

## 🏗️ Stack del Dashboard

```
HTML + CSS + Vanilla JS (sin dependencias externas)
- Modo oscuro por defecto
- Responsive: desktop / tablet / móvil
- Filtros interactivos con JS vanilla
- Gráficos con CSS (barras, radial) — sin librerías
- Exportable como archivo HTML standalone
```

---

## ⚠️ Reglas

```
1. El dashboard es un archivo HTML standalone (sin servidor)
2. Modo oscuro obligatorio
3. Responsive en las 3 resoluciones (mobile, tablet, desktop)
4. Los datos se inyectan como JSON en el HTML
5. Filtros funcionan sin recargar página
6. Click en requisito muestra detalle expandible
7. Colores semánticos: 🔴 rojo, 🟡 amarillo, 🟢 verde
```

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```

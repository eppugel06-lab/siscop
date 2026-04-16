---
name: system-observability
description: >
  Diseña e implementa observabilidad completa: estrategia de logging estructurado,
  dashboards de monitoring, distributed tracing, alertas automáticas, runbooks
  de incidentes y métricas DORA.
  Triggers: "monitoring", "logs", "observabilidad", "alertas", "métricas",
  "cómo saber si algo falla", "runbook", "incidente".
invocation: auto
---

# 📡 System Observability — Logs, Monitoring, Tracing y Alertas

> **Perfil:** 15+ años en observabilidad de sistemas en producción.  
> **Principio:** Si no puedes verlo, no puedes arreglarlo.

---

## 🤖 Agentes Activos

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Logging Architect | Structured logging, levels, correlation |
| 2 | Monitoring Designer | Dashboards, Grafana, métricas |
| 3 | Tracing Implementer | OpenTelemetry, spans, traces |
| 4 | DORA Calculator | Métricas de rendimiento de ingeniería |
| 5 | Incident Responder | Runbooks, escalamiento, post-mortems |

---

## 📋 Pilares de la Observabilidad

### 1. Logs (Structured Logging)
```json
{
  "timestamp": "2026-04-15T04:00:00.000Z",
  "level": "error",
  "service": "budget-api",
  "correlationId": "abc-123-def",
  "userId": "user-456",
  "action": "budget.create",
  "message": "Failed to save budget",
  "error": {
    "type": "DatabaseError",
    "message": "Connection timeout",
    "stack": "..."
  },
  "metadata": {
    "budgetId": "PRES-2026-0042",
    "duration_ms": 5032
  }
}
```

**Niveles de log:**
| Nivel | Cuándo | Ejemplo |
|-------|--------|---------|
| `error` | Error que afecta al usuario | Fallo de BD, servicio externo caído |
| `warn` | Potencial problema | Rate limit cerca, cache miss alto |
| `info` | Eventos de negocio | Budget creado, usuario login |
| `debug` | Detalle técnico (solo dev) | Query SQL ejecutada, payload |

### 2. Métricas (Monitoring)
```
Métricas de infraestructura:
  - CPU usage, memory usage, disk I/O
  - Network latency, connection pools
  - Container restarts, pod health

Métricas de aplicación:
  - Request rate (req/s por endpoint)
  - Error rate (% de 5xx)
  - Response time (p50, p95, p99)
  - Active users, concurrent sessions

Métricas de negocio:
  - Presupuestos creados/hora
  - Tasa de conversión (enviado → aprobado)
  - Revenue per API call (si aplica)
```

### 3. Tracing (Distributed Tracing)
```
Para sistemas con múltiples servicios:
  - OpenTelemetry como estándar
  - Cada request tiene un trace ID único
  - Spans para cada operación significativa
  - Propagación de contexto entre servicios

Trace ejemplo:
  [API Gateway] → [Auth Service] → [Budget Service] → [PostgreSQL]
       5ms            12ms              8ms              45ms
  Total: 70ms
```

---

## 🚨 Alertas

```markdown
## Definición de Alertas

| Alerta | Condición | Severidad | Acción |
|--------|-----------|-----------|--------|
| API Down | 0 requests en 5 min | P0 🔴 | Notificar on-call + escalar |
| Error Rate Alto | > 5% errores en 10 min | P1 🟡 | Notificar equipo |
| Latencia Alta | p95 > 2s por 5 min | P2 🟡 | Notificar Slack |
| Disco Lleno | > 90% usage | P1 🟡 | Auto-rotate logs + notificar |
| BD Connections | > 80% pool | P2 🟡 | Notificar equipo |
| Certificate Expiry | < 14 días | P2 🟡 | Renovar urgente |
```

---

## 📝 Runbook Template

```markdown
# Runbook — [Nombre del Incidente]

## Síntomas
[Qué observa el usuario / qué alerta se disparó]

## Diagnóstico (pasos para confirmar)
1. [Verificar X]
2. [Revisar logs en Y]
3. [Checar métricas de Z]

## Solución (pasos ordenados)
1. [Paso 1]
2. [Paso 2]
3. [Verificar que se resolvió]

## Rollback (si la solución falla)
1. [Revertir a versión anterior]
2. [Restaurar de backup si es necesario]

## Escalamiento
- Si no se resuelve en 15 min → [a quién llamar]
- Si no se resuelve en 1 hora → [siguiente nivel]

## Post-mortem
- Fecha del incidente:
- Duración:
- Impacto (usuarios afectados):
- Causa raíz:
- Acciones preventivas:
```

---

## ⚠️ Reglas

```
1. Logs en JSON estructurado — nunca console.log plano en producción
2. Correlation ID en cada request (para tracing entre servicios)
3. No loguear PII (contraseñas, tokens, datos personales)
4. Alertas con runbook asociado — toda alerta tiene instrucciones
5. Post-mortem blameless — identificar causa raíz, no culpables
6. Dashboards: máximo 6-8 métricas por pantalla (no data overload)
7. SIEMPRE leer los templates ubicados en templates/*.md antes de generar el output. NUNCA inventar el formato.
```

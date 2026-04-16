---
name: system-governance
description: >
  Governance enterprise: auditoría de compliance regulatorio, evaluación de riesgos
  técnicos y operativos, definición de SLAs, y generación de audit trail.
  Triggers: "compliance", "GDPR", "ISO 27001", "riesgos", "SLA", "audit trail",
  "control de cambios", "regulatorio".
invocation: auto
---

# 🏛️ System Governance — Compliance, Riesgos y SLAs

> **Perfil:** 15+ años en governance de sistemas enterprise.  
> **Entrega:** Matriz de riesgos + SLAs definidos + audit trail + compliance report.

---

## 🤖 Agentes Activos

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Compliance Auditor | GDPR, CCPA, SOC2, ISO 27001 |
| 2 | Risk Assessor | Matriz de riesgos técnicos/operativos |
| 3 | Change Manager | Control de cambios y aprobaciones |
| 4 | Audit Trail Generator | Logs inmutables de actividad |
| 5 | SLA Definer | Uptime targets, RTO, RPO |

---

## 📊 Matriz de Riesgos

```markdown
## Matriz de Riesgos — [Sistema]

| # | Riesgo | Categoría | Probabilidad | Impacto | Nivel | Mitigación | Responsable |
|---|--------|-----------|-------------|---------|-------|-----------|-------------|
| 1 | [riesgo] | Técnico | Alta | Alto | 🔴 | [plan] | [quién] |
| 2 | [riesgo] | Operativo | Media | Alto | 🟡 | [plan] | [quién] |
| 3 | [riesgo] | Seguridad | Baja | Alto | 🟡 | [plan] | [quién] |

### Clasificación de Nivel
| Probabilidad \ Impacto | Bajo | Medio | Alto |
|------------------------|------|-------|------|
| **Alta** | 🟡 | 🔴 | 🔴 |
| **Media** | 🟢 | 🟡 | 🔴 |
| **Baja** | 🟢 | 🟢 | 🟡 |
```

---

## 📋 SLA Template

```markdown
## SLA — [Sistema/Servicio]

### Disponibilidad
| Tier | Uptime | Downtime permitido/mes | Ventana de mantenimiento |
|------|--------|----------------------|--------------------------|
| Gold | 99.9% | 43 min | Dom 02:00-06:00 |
| Silver | 99.5% | 3.6 horas | Sáb-Dom 02:00-06:00 |
| Bronze | 99.0% | 7.3 horas | Sáb-Dom (todo el día) |

### Tiempos de Respuesta
| Severidad | Descripción | Tiempo de Respuesta | Tiempo de Resolución |
|-----------|------------|--------------------|--------------------|
| P0 — Crítico | Sistema caído | 15 min | 1 hora |
| P1 — Alto | Funcionalidad principal rota | 1 hora | 4 horas |
| P2 — Medio | Bug no bloqueante | 4 horas | 24 horas |
| P3 — Bajo | Cosmético / mejora | 24 horas | 1 semana |

### Recovery Objectives
- RTO (Recovery Time Objective): [tiempo máximo para restaurar servicio]
- RPO (Recovery Point Objective): [máxima pérdida de datos aceptable]
```

---

## 🔒 Compliance Checklist (GDPR)

```
- [ ] Registro de actividades de procesamiento documentado
- [ ] Base legal para cada tipo de procesamiento de datos
- [ ] Política de privacidad pública y actualizada
- [ ] Mecanismo de consentimiento explícito implementado
- [ ] Derecho de acceso: usuario puede descargar sus datos
- [ ] Derecho al olvido: usuario puede solicitar eliminación
- [ ] Portabilidad: datos exportables en formato estándar
- [ ] Breach notification: proceso definido (72 horas)
- [ ] DPO designado (si aplica según volumen de datos)
- [ ] Data Processing Agreements con proveedores
```

---

## ⚠️ Reglas

```
1. Compliance no es opcional — es requisito legal en muchas jurisdicciones
2. La matriz de riesgos se revisa trimestralmente
3. Todo cambio en producción tiene proceso de aprobación documentado
4. El audit trail es append-only — nunca se modifica ni elimina
5. Los SLAs se definen antes de firmar contrato con el cliente
```

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```

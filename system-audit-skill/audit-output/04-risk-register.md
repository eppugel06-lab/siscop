# 04 Registro de Riesgos

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| **Desgaste de Contexto (Context Bleeding)** | 🔴 Alto. Los agentes olvidan su propia limitación de longitud, perdiendo info crítica del sistema auditado a favor de prosa repetida. | 🔴 Alta | Imponer MODO CAVEMAN a nivel prompt de sistema por encima de las instrucciones individuales de cada agente. |
| **XSS por inyección en Output HTML** | 🟡 Medio. Archivos con nombres maliciosos leídos en Fase 0 inyectados a dashboard provocando ejecución arbitraria en entorno local del analista. | 🟡 Media | Codificación estricta de variables en renderizado del dashboard y limpieza en el pipeline LLM. |
| **Incongruencia entre Fases** | 🟡 Medio. El agente Fase 2 contradice arquitectura de la Fase 1 al haber pérdida de coherencia transversal. | 🟡 Media | Usar un ORQUESTADOR que resuma explícitamente los inputs de otros agentes para estabilizar la ventana. |

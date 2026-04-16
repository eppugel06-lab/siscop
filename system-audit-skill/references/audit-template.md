# Plantilla de Salida de Auditoría por Agente

Cada agente **DEBE STRICTAMENTE** usar este formato exacto para asegurar compatibilidad con el orquestador y extremar la optimización de tokens (Caveman Mode interno). No se permite prosa introductoria, saludos ni justificaciones banales.

## [Icono] [Nombre del Agente]

### Hallazgos Críticos
*Anota problemas que bloquean funcionamiento, causan fuga de datos o afectan seriamente credibilidad.*
* 🔴 **[Título del Hallazgo]**: [Descripción puntual]. 
* 🔴 **[Título del Hallazgo]**: [Descripción puntual].

### Advertencias y Optimización
*Cosas que pueden mejorar el rendimiento, deuda técnica o arquitectura.*
* 🟡 **[Título del Hallazgo]**: [Descripción puntual].
* 🟡 **[Título del Hallazgo]**: [Descripción puntual].

### Buenas Prácticas / Cumplidos
*Si algo cumple estándares corporativos y debe mantenerse.*
* 🟢 **[Título del Hallazgo]**: [Descripción puntual].

### Recomendación Accionable para el Roadmap
*1-2 viñetas que alimenten directamente la Fase 2 (Planificación).*
* **Propuesta técnica**: [Uso de herramienta X, refactor de Y]

---
**Nota para el LLM Agent:**:
- **NADA DE YAP**. Entra directamente al título del agente.
- Sé extremadamente técnico.
- Asume que el equipo receptor tiene +15 años de experiencia corporativa.

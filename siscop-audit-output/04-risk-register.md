# 04 Registro de Riesgos

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| **Timeout Máximo V8 (6 mins)** | 🔴 Alto. Toda la transacción falla silenciosamente, dejando datos incompletos en Sheets. | 🔴 Alta | Ejecución de cronómetros internos; uso de Web Workers en el cliente para cómputo masivo. |
| **Colisión Concurrente** | 🔴 Alto. Dos usuarios procesando o importando a la misma base simultáneamente sobreescribirán celdas y causarán corrupción. | 🟡 Media | Implementación de `LockService` nativo envolviendo toda transacción de escritura. |
| **Inyección HTML/JS** | 🟡 Medio. DOM evalúa todo HTML inyectado de AppsScript, cualquier dato sucio almacenado en celda derivará en XSS. | 🟡 Media | Filtrado en el cliente; jamás usar secuencias `innerHTML` directas para valores que vienen de variables tabulares en Excel. |

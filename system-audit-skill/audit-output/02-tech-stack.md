# 02 Decisión de Stack Tecnológico

El skill opera en un plano estrictamente determinista del LLM basado en promting directo y lectura de texto, con la excepción del Dashboard UI. 

### Core Tech Stack Definido
* **Repositorio de Instrucciones**: Markdown plano anidado en `/references/`.
* **Motor Base**: `system-audit-pro` (Framework LLM-agnóstico).
* **UI/Dashboard**: HTML + CSS Vanilla + JS Nativo. (Requisito estricto: cero dependencias externas que sobrecarguen o expongan el contexto offline, salvo tipografía estándar o íconos SVG inline).
* **Exportación y Data**: JSON estructural plano (inyectado estáticamente en los bloques JS del HTML).

### Justificación
Eliminar todo overhead de Framework para el dashboard generado asegura que la ventana de tokens restante del LLM post-auditoría no colapse al generar las dependencias visuales.

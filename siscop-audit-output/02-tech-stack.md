# 02 Decisión de Stack Tecnológico

El proyecto actual sobrevive en el límite de las capacidades PaaS de Google. Dada la inversión actual y el costo $0 objetivo, el orquestador determina:

### Recomendación: Stack Híbrido "Serverless Edge"

- **Frontend Core:** React/Next.js (Exportación de Single Page App Estática) o Vanilla JS + Clases ES6. (El monolito HTML inyectable actual debe ser migrado a Modular ES6 con Vite para empaquetar un solo `index.html` estático, pero construido en un Pipeline Node.js moderno).
- **Backend API:** Continuar usando Google Apps Script vía `doGet`/`doPost` como Web App, perola lógica pesada debe reescribirse a Clases TypeScript. Usar Clasp + Rollup para transpilar y agrupar.
- **Base de Datos:** Continuar con Google Sheets para el Data Lake, PERO abstraer Sheets a través de un Repositorio en Caché local usando Google Apps Script `CacheService` o `PropertiesService` para limitar I/O al máximo (Batch updates).

### Alternativa Secundaria (Fuera de GAS)
- Si los timeouts persisten post-optimización atómica, migrar la capa de consolidación al cliente (Frontend) montando toda la data en IndexedDB mediante Web Workers locales.

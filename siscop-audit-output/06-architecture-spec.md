# 06 Architecture Spec (Post-Refactor)

## 1. Topología del Ecosistema

El proyecto ahora opera bajo una filosofía híbrida Desacoplada (Headless-Ready) utilizando la terminal OS pura para sincronizarse bidireccionalmente con la Infraestructura V8 en la nube mediante `@google/clasp`.

```mermaid
flowchart TD
  subgraph BROWSER [Frontend Local / Browser]
    V[Visor VUE/UI] --> EXT[Carga XLSX]
    EXT --> |Transformación Uint8Array| X[Parser Excel]
    X --> |Matriz JSON Limpia| REQ[Llamadas server.run]
  end

  subgraph ENTORNO_LOCAL [Entorno de Desarrollo PC]
    SRC[Frontend Fragments: src/*.html] --> |npm run build| BUN[Index.html Empaquetado]
    APP[Backend Modules: app/*.js] -.-> JEST[Jest Unit Tests Core]
    BUN --> |npx clasp push| SYNC[Cloud Sync]
    APP --> |npx clasp push| SYNC
  end

  subgraph GOOGLE_CLOUD [Backend Google Apps Script]
    SYNC --> GS[Código Desglosado: api, core, utils]
    GS -.-> |Seguridad OAuth Lector/Admin| S[Validación de Roles]
    S --> |Matriz JSON 2D Masiva| DS[Google Sheets DB]
  end
```

## 2. Flujo Directriz

1. **Desarrollo**: Modificar archivos en `src/` (HTML/CSS) o en `app/` (Servicios JS).
2. **Build**: Ejecutar `npm run build` para que node acople e inyecte silenciosamente el DOM.
3. **Pushear**: El comando empuja atómicamente el resultado final y los `.js` convertidos a `.gs` hacia la nube de producción.
4. **Validación**: Con correr `npm run test`, `Jest` verificará que no hayas destrozado `2_core.js`.

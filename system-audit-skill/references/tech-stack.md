# 🛠️ Referencia del Stack Tecnológico Libre Profesional

## CRITERIOS DE SELECCIÓN
Todos los stacks recomendados deben ser:
- ✅ Gratis / Código Abierto (MIT, Apache 2.0, o similar)
- ✅ Probados en producción (usados a escala por empresas reales)
- ✅ Mantenimiento activo (actividad de commits en los últimos 6 meses)
- ✅ Comunidad fuerte (docs, plugins, tutoriales)
- ✅ Sin dependencia absoluta de un proveedor (No vendor lock-in)

---

## OPCIONES DE FRONTEND

### Opción A — Next.js (Recomendado para la mayoría de proyectos)
```
next@14+          — App Router, Server Components, Streaming
typescript@5+     — Modo estricto activado
tailwindcss@3+    — CSS focalizado en utilidades (Utility-first)
shadcn/ui         — Componentes accesibles y componibles (basados en Radix UI)
framer-motion     — Animaciones de calidad para producción
zustand           — Gestión de estado ligera
react-query       — Estado del servidor, caché, sincronización
react-hook-form   — Formularios de alto rendimiento
zod               — Validación de esquemas (compartida con backend)
next-themes       — Modo oscuro/claro
next-intl         — Internacionalización (si es necesaria)
```

### Opción B — SvelteKit (Construcciones más ligeras y rápidas)
```
sveltekit@2+      — Full-stack, enrutamiento basado en archivos
typescript
tailwindcss
bits-ui           — Componentes headless para Svelte
motion            — Animación (API compatible con GSAP)
svelte-query      — Gestión de estado del servidor
```

### Opción C — Nuxt 3 (Ecosistema Vue)
```
nuxt@3+           — Importaciones automáticas, SSR/SSG
@nuxt/ui          — Biblioteca de componentes
pinia             — Gestión de estado
@vueuse/core      — Composables útiles
```

---

## OPCIONES DE BACKEND

### Opción A — FastAPI (Python, recomendado para alta carga de datos)
```
python@3.11+
fastapi           — Asíncrono, OpenAPI auto-docs
sqlalchemy@2+     — Soporte ORM + asíncrono
alembic           — Migraciones de base de datos
pydantic@v2       — Validación de datos (esquemas compartidos)
uvicorn           — Servidor ASGI
celery + redis    — Tareas en segundo plano
pytest            — Pruebas
httpx             — Cliente HTTP asíncrono (para pruebas)
```

### Opción B — Hono + TypeScript (Mismo lenguaje Full-stack)
```
hono              — Ultrasónico, compatible con la tecnología Edge
drizzle-orm       — ORM puro para TS, consultas seguras y fuertemente tipadas
@hono/zod-validator
jose              — JWT/JWE (Gestión de tokens)
vitest            — Pruebas
```

### Opción C — NestJS (TypeScript versión Enterprise)
```
nestjs@10+        — Altamente fundamentado, decoradores, DI (Inyección de dependencias)
typeorm o prisma  — ORM
passport          — Estrategias de autenticación
class-validator   — Validación de DTO's
jest              — Pruebas
```

---

## ESTRUCTURA DE LA BASE DE DATOS

### Base de Datos Principal (Primary DB)
```
PostgreSQL 16+    — La elección por defecto para datos relacionales
  + pgvector      — Consultas vectoriales (Para capacidades de IA)
  + pg_trgm       — Búsqueda rápida de texto completo
  + TimescaleDB   — Series temporales (Solo si son necesarias)

SQLite            — Pruebas o despliegues efímeros muy pequeños (Turso for edge)
MongoDB           — A considerar *sólo si* tu data es verdaderamente orientada a documentos o caótica (evitar inicialmente).
```

### ORM / Constructor de Consultas (Query Builder)
```
Prisma            — Muy explícito tipado de rutas, migración sencilla, provisto de GUI (Node.js)
Drizzle           — Muy liviano, comandos SQL-like puros, listo para Edge (Node.js)
SQLAlchemy 2      — Altamente asincrónico y poderoso (Python)
GORM              — Estandar para el entorno de Go
```

### Caché
```
Redis (Upstash)   — Capa gratuita serverless, propagación global
Dragonfly         — Alternativa multihebra compatible con Redis (Autohospedado)
```

### Motor de Búsqueda
```
MeiliSearch       — Fácil instalación, gran experiencia de desarrollo DX, self-hosted autohospedable
Typesense         — Tolerante a faltas de escritura en las búsquedas, rapidísimo, autohospedable
PostgreSQL FTS    — Usar la búsqueda nativa es suficiente para volúmenes de db <100k
```

---

## AUTENTICACIÓN

```
Better Auth       — Modelo moderno, enfocado en TypeScript nativo, provee conexiones multi social provider
Lucia             — Manejo simple basado en cookies/tokens flexibles
Auth.js(NextAuth) — Fuerte y tradicional para el ecosistema Node / React
Keycloak          — Single Sign On de alto nivel para uso empresarial (Autohospedado)
```

---

## DEVOPS E INFRAESTRUCTURA

### Contenedores (Containerization)
```
Docker + Compose  — Estandar de facto para el entorno productivo / pruebas
Podman            — Alternativa rootless frente a docker
```

### Implementaciones y Despliegue (Con Free Tiers)
```
Coolify           — Competidor directo de Heroku / Vercel para auto alojamiento
Kamal             — Despliegue Docker "Cero Caídas" para todo VPS
Railway           — Posee cuota gratuita inicial muy recomendada
Render            — Posee cuota gratuita
Fly.io            — Generosa capa de free tier
```

### Integraciones Continuas CI/CD
```
GitHub Actions    — 2000 min al mes totalmente gratis (Mejor ambiente)
Woodpecker CI     — Gitea Integrable, muy rapido
Forgejo Actions   — Alternativo libre de CI de GitHub
```

### Monitoreo (Observabilidad Analítica)
```
Grafana           — Control por Dashboards gráficos
Prometheus        — Métricas técnicas de consumo y solicitudes
Loki              — Almacenaje de logs en masa (De Grafana Labs)
Tempo             — Para traqueo de cuellos de botella
OpenTelemetry     — Control a bajo nivel multi framework SDK
Uptime Kuma       — Tableros interactivos para observar caídas Web
```

### Prevención e Interceptor de Errores Críticos
```
Sentry            — El mejor en el mercado (Provee ~ 5 Mil Errores libres por mes)
GlitchTip         — La alternativa Open Source autohospedable exacta de Sentry
```

---

## PRUEBAS TÉCNICAS (TESTING)

```
Nivel Frontend:
  Vitest          — Pruebas unitarias relámpago con el poder de Vite
  Playwright      — Pruebas Cross-browser simulando a un usuario haciendo click/escribiendo (E2E)
  Testing Library — Comprobación de funciones exclusivas para un framework UI
  Storybook       — Creador visual del historial de pruebas
  Chromatic       — Comparador de regresiones para atrapar cambios pixel perfect

Nivel Backend:
  pytest          — Test de Python universal
  Vitest/Jest     — Test mas usado de Node / Typescript
  Supertest       — Testeador e Interceptor de Endpoints de APIs
  Pactflow        — Tests de validación de esquemas (Contracts)

Validadores de Rendimiento de red (Performance):
  k6              — Tests inmensos con carga y envíos sintéticos
  Artillery       — Estresador de red y consumo API
  Lighthouse CI   — Performance Web evaluador desde GitHub actions (Mobile First / Accesibilidad)
```

---

## STACK DE ANIMACIONES FRONTEND

```
Framer Motion     — React puro para animar, transitar, o cambiar todo el esqueleto visual. (El mejor para React)
GSAP (Free Tier)  — Usa el Scroll a su favor, hace un timeline general poderoso
Motion One        — Envoltorio optimizado de Web Animation API súper pequeño
CSS animaciones   — Úsalo como fallback "0 Javascript". Es útil sobre Skeleton Loaders, modales de confirmación interactiva.
```

---

## DOCUMENTACIÓN DE APIs OPEN SOURCE

```
Scalar            — Una interfaz limpia, fluida y veloz para el standard OpenAPI OpenAPI / Swagger
Swagger UI        — Clásico, funcional.
Redoc             — Diseño sumamente legible optimizado en markdown.
```

---

# 📋 PLANTILLA / FORMATO ESTRUCTURAL DEL HALLAZGO DEL AUDITOR

Cada agente utiliza esta plantilla vacía para emitir sus comprobaciones de diagnóstico final:

```markdown
## Hallazgos de Auditoría respecto al Agente [Nombre Agente]

**Sistema**: [Nombre Proyecto]
**Fecha**: [Fecha / Hora]
**Agente**: [Agente IA asignado]

### Resumen Analítico
- Hallazgos Totales Resultantes: N
- Errores Críticos 🔴: N
- Fricciones Que Requieren Corrección 🟡: N  
- Fortalezas Detectadas 🟢: N

### Hallazgos Críticos 🔴 (P0 — Corregir Inmediatamente)

| Identificador | Causa Encontrada | Nivel de Impacto | Solución Recomendada e Implementación Práctica |
|---|---|---|---|
| [AGENTE]-[N] | [qué es lo que está mal] | [quién y qué afecta / que rompe] | [qué es lo que se tiene que hacer] |

### Oportunidades Claves de Mejora Proyectada 🟡 (P1/P2)

| Identificador | Oportunidad Identificada | Beneficio Técnico | Esfuerzo de Trabajo |
|---|---|---|---|
| [AGENTE]-[N] | [Qué técnica nueva es recomendada usar] | [Para qué serviría] | L(Ligero) / M(Medio) / P(Pesado) |

### Puntos Fuertes Correctos Identificados 🟢 (Lo Que Debes Mantener Intacto)

- [Comprobar qué parte funcionó perfectamente y validar el acierto de desarrollo del Usuario/Dev de este proyecto]

### Acciones Directas Recomendadas Hacia el Roadmap General (A tomar en cuenta por el orquestador)

En escala de prioridad urgente:
1. [Primera decisión que acatar / Mayor problema inicial]
2. [Siguiente paso necesario]
3. ...
```

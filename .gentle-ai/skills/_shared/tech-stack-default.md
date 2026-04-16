# Stack por Defecto — Libre, OSS, Producción

> **Regla de oro:** Si el proyecto tiene `AGENTS.md`, respetar el stack ahí definido.
> Este archivo aplica solo cuando NO existe stack previo.

---

## 🧱 Stack Completo por Capa

| Capa | Opción Principal | Alternativa | Notas |
|------|-----------------|-------------|-------|
| **Frontend** | Next.js 14 (App Router) | SvelteKit, Nuxt 3 | SSR + RSC por defecto |
| **UI Components** | shadcn/ui + Tailwind CSS | Mantine, Radix UI | Accesible, sin lock-in |
| **Animaciones** | Framer Motion | GSAP, Motion One | Para micro-interacciones |
| **Backend** | FastAPI (Python) | Hono (TypeScript), NestJS | Alto rendimiento, tipado fuerte |
| **Base de datos** | PostgreSQL + Prisma ORM | MySQL, SQLite (dev) | ACID, migraciones seguras |
| **Cache** | Redis (Upstash) | Dragonfly | TTL, sessions, rate limiting |
| **Auth** | Better Auth / Lucia | Auth.js | Sin vendor lock-in |
| **File Storage** | MinIO (self-hosted) | Supabase Storage | Compatibilidad S3 |
| **Search** | MeiliSearch | Typesense | Búsqueda full-text en ms |
| **Queue** | BullMQ + Redis | Inngest | Jobs asíncronos confiables |
| **CI/CD** | GitHub Actions | Woodpecker CI | YAML declarativo |
| **Containers** | Docker + Docker Compose | Podman | Reproducibilidad total |
| **Deploy** | Kamal o Coolify | Dokku | Self-hosted sin Kubernetes |
| **Monitoring** | Grafana + Prometheus | OpenTelemetry | Métricas + alertas |
| **Error Tracking** | Sentry (free tier) | GlitchTip | Alertas de errores en tiempo real |
| **Testing** | Vitest + Playwright | Jest + Cypress | Unit + E2E |
| **API Docs** | Swagger / Scalar | Redoc | OpenAPI 3.x |
| **Mobile** | React Native + Expo | Flutter | Código compartido con web |

---

## 📋 Decisiones de Arquitectura Incluidas

### Base de Datos
- **PostgreSQL** como único sistema transaccional
- **Prisma** para migraciones seguras y tipado en TypeScript
- **Redis** exclusivo para cache y colas — nunca para datos críticos
- Backups automáticos obligatorios en producción

### Autenticación
- **JWT** con refresh token rotation
- Sesiones almacenadas en Redis (TTL configurable)
- MFA opcional desde el inicio (no como agregado posterior)
- **Nunca** almacenar contraseñas en texto plano o MD5/SHA1

### API
- **REST** para operaciones CRUD estándar
- **WebSockets** solo cuando hay necesidad real de tiempo real
- Versionado de API desde v1: `/api/v1/...`
- Rate limiting en todas las rutas públicas

### Frontend
- **Server Components** por defecto (Next.js App Router)
- **Client Components** solo cuando hay interactividad real
- Carga diferida de rutas y componentes pesados
- `next/image` obligatorio para imágenes

---

## 🚫 Prohibiciones de Stack

```
❌ No usar MongoDB en sistemas con relaciones complejas
❌ No usar Firebase en proyectos que requieran portabilidad
❌ No usar AWS/GCP/Azure services propietarios sin evaluación previa
❌ No mezclar ORMs (un solo ORM por proyecto)
❌ No usar jQuery en proyectos nuevos
❌ No usar Create React App (deprecated)
❌ No guardar secretos en el código fuente
❌ No deployar sin HTTPS
```

---

## ✅ Checklist de Stack en Producción

- [ ] Variables de entorno separadas por ambiente (dev / staging / prod)
- [ ] Secrets en gestor de secretos (vault, env del CI, Railway envs)
- [ ] Health check endpoint: `GET /health`
- [ ] Rate limiting activo en endpoints públicos
- [ ] CORS configurado con whitelist explícita
- [ ] Logs estructurados en JSON (no console.log en producción)
- [ ] Backups automáticos de BD programados
- [ ] Alertas de error activas (Sentry o equivalente)
- [ ] HTTPS obligatorio (certificado automático con Let's Encrypt)
- [ ] Dependencias auditadas: `npm audit` / `pip-audit`

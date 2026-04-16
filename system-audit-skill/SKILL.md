---
name: system-audit-pro
description: >
  Habilidad profesional multi-agente de auditoría y planificación de sistemas. Usa esta habilidad cuando un usuario quiera
  auditar un sistema existente, planificar un nuevo sistema profesional, crear una arquitectura escalable,
  evaluar su stack tecnológico, mejorar su código con estándares profesionales, o quiera un equipo
  de agentes expertos para analizar y producir un plan completo con roadmap, mockups de UI por fase
  y guías de ejecución. Se activa con: "auditar mi sistema", "analizar mi proyecto", "planificar un sistema profesional",
  "revisar mi arquitectura", "crear un plan escalable", "hacer mi app profesional",
  "revisión de sistema", "revisión de stack tecnológico", "mejorar mi base de código", o cualquier solicitud para evaluar y
  planificar un sistema de software a un nivel profesional o empresarial. Siempre usa esta habilidad incluso si
  el usuario solo pega la descripción de un proyecto, imagen de un dashboard o estructura de archivos.
---

# 🏛️ SYSTEM AUDIT PRO — Habilidad de Planificación Multi-Agente

Una habilidad profesional de auditoría y planificación impulsada por agentes de IA especializados. Cada agente analiza el sistema actual desde su perspectiva de dominio y en conjunto producen un **plan profesional completo** con ejecución en fases, dashboards de UI por fase y un stack tecnológico escalable y gratuito.

---

## ⚡ INICIO RÁPIDO — Qué hacer inmediatamente

1. **Recopilar contexto** — Pide o extrae: stack actual, capturas de pantalla, ejemplos de código, README o cualquier descripción del sistema.
2. **Ejecutar Fase 0: Escaneo de Contexto** — Todos los agentes leen lo que está disponible (código, imágenes, documentos).
3. **Ejecutar Fase 1: Auditoría** — Cada agente audita el sistema desde su dominio.
4. **Ejecutar Fase 2: Planificación** — Los agentes colaboran en el plan profesional.
5. **Construir el Dashboard** — Genera un dashboard de planificación interactivo en HTML (como la imagen de referencia).
6. **Entregar el Paquete de Habilidad** — Archivos de salida + dashboard listos para usar.

> **IMPORTANTE**: La IA NO ejecuta el plan — solo planifica y entrega el roadmap completo. La ejecución ocurre en una sesión separada usando este plan como entrada.

---

## 🤖 EL EQUIPO DE AGENTES

Lee `references/agents.md` para las identidades completas y prompts de los agentes.

| Agente | Rol | Enfoque |
|---|---|---|
| 🏗️ **Arquitecto** | Arquitectura y escalabilidad de sistemas | Patrones, servicios, diseño de BD, infraestructura |
| 🎨 **Diseñador UX** | Experiencia de usuario y flujos | Viajes, AI (Arquitectura de Información), auditoría de usabilidad |
| 💅 **Diseñador UI** | Diseño visual y componentes | Sistema de diseño, accesibilidad, responsivo |
| 🔒 **Auditor de Seguridad** | Seguridad y cumplimiento | Vulnerabilidades, auth, protección de datos |
| 🗄️ **DBA / Arquitecto de Datos** | Modelado de datos y rendimiento | Esquema, índices, migraciones, caché |
| ⚙️ **Ingeniero Backend** | API y lógica de negocio | REST/GraphQL, patrones, rendimiento |
| 🖥️ **Ingeniero Frontend** | Implementación UI y animaciones | Componentes, estado, SSR, animaciones |
| 📊 **DevOps / SRE** | Infraestructura y CI/CD | Docker, pipelines, monitoreo, escalado |
| ♿ **Ingeniero en Accesibilidad** | A11y y estándares | WCAG, lectores de pantalla, navegación por teclado |
| 🧪 **Arquitecto QA** | Estrategia de pruebas | Unitarias, E2E, cobertura, planes de prueba |
| 📋 **Gestor de Proyectos / Orquestador** | Coordinación y roadmap | Fases, prioridades, dependencias, riesgos |

---

## 🔄 FLUJO DE EJECUCIÓN

### FASE 0 — Recopilación de Contexto (Siempre primero)

```
ENTRADA ACEPTADA:
  - Descripción de texto del sistema
  - Capturas de pantalla / imágenes de la UI actual o dashboards
  - Archivo/estructura de directorios (salida tree)
  - Fragmentos de código o archivos completos
  - README o documentación
  - Ninguna de las anteriores → haz 5 preguntas clave (ver references/intake.md)
```

Extrae y documenta:
- **Tipo de sistema**: App web / móvil / API / monolito / microservicios
- **Stack actual**: Lenguajes, frameworks, bases de datos, alojamiento
- **Escala**: Usuarios, volumen de datos, tamaño del equipo
- **Puntos de dolor**: Qué está roto, lento o falta
- **Metas**: Qué significa "profesional y escalable" para este proyecto

---

### FASE 1 — Auditoría Multi-Agente

Cada agente ejecuta su auditoría **en secuencia**, construyendo sobre los hallazgos anteriores.
Salida por agente: hallazgos estructurados en el formato `references/audit-template.md`.

**Orden:**
1. Arquitecto → 2. Seguridad → 3. DBA → 4. Backend → 5. Frontend → 6. UX → 7. UI → 8. DevOps → 9. A11y → 10. QA → 11. PM consolida

**Regla de eficiencia de tokens**: La respuesta de cada agente debe ser concisa — usa listas con viñetas, calificaciones de severidad (🔴🟡🟢), y omite consejos obvios/genéricos. Concéntrate solo en hallazgos específicos para ESTE sistema.

---

### FASE 2 — Generación de Plan Profesional

Después de la auditoría, el PM Orquestador sintetiza en:

1. **Decisión del Stack Tecnológico** (gratis, open-source, calidad de producción)
2. **Diagrama de Arquitectura** (Mermaid basado en texto o ASCII)
3. **Roadmap por Fases** (P0→P1→P2→P3)
4. **Tablero de Tareas por Fase** (como la imagen de referencia del dashboard)
5. **Registro de Riesgos**
6. **Definición de Terminado (DoD) por fase**

Lee `references/planning.md` para las plantillas de planificación completas.

---

### FASE 3 — Generación del Dashboard

Genera un dashboard de planificación HTML interactivo (inspirado en la imagen de referencia del Dashboard de Verificación SDD) con:

- **Vista de Pipeline**: Etapas del agente con conteos (ej. requerimientos → especificaciones → pruebas → E2E)
- **Métricas de Cobertura**: % completado por dominio
- **Panel de Problemas**: Artefactos huérfanos, referencias rotas, hallazgos críticos
- **Tabla de Requerimientos**: Todos los hallazgos con prioridad, estado, agente responsable
- **Filtro/búsqueda**: Por estado, prioridad, agente, fase
- **Pestañas de Fases**: P0, P1, P2, P3 con barras de progreso
- **Responsivo**: Escritorio, tablet, móvil

Lee `references/dashboard.md` para la plantilla HTML completa y el sistema de diseño.

**Llamada a la API de IA para dashboard**: El Dashboard resultante NUNCA debe inyectar datos no saneados que provengan de nombres de archivo del usuario (riesgo de XSS). Consume un archivo JSON plano con la salida de auditoría y renderiza a partir de hidratación del DOM de forma segura. Usa un modelo costo-eficiente, apuntando a **un 75% de ahorro de tokens** vs una llamada estándar. Pasa solo datos estructurados, nunca prosa.

---

### FASE 4 — Paquete Entregable

**IMPRESCINDIBLE**: Orquestador, antes de finalizar, dibuja directamente en la terminal una gráfica tipo Pie Chart de MermaidJS que muestre la proporción de hallazgos críticos (🔴), precauciones (🟡) y fortalezas (🟢).

Archivos de salida:
```
audit-output/
├── 00-context.md          # Contexto del sistema recopilado
├── 01-audit-report.md     # Todos los hallazgos de los agentes
├── 02-tech-stack.md       # Stack recomendado con justificación
├── 03-roadmap.md          # Plan por fases P0→P3
├── 04-risk-register.md    # Riesgos + mitigaciones
├── 05-definition-of-done.md
└── dashboard.html         # Dashboard de planificación interactivo
```

---

## 🛠️ STACK TECNOLÓGICO GRATUITO RECOMENDADO (Por Defecto)

Lee `references/tech-stack.md` para el stack curado completo.

**Referencia rápida — siempre calidad de producción, siempre gratis/OSS:**

| Capa | Elección por Defecto | Alternativa |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SvelteKit, Nuxt 3 |
| UI Components | shadcn/ui + Tailwind CSS | Mantine, Radix UI |
| Animaciones | Framer Motion | GSAP, Motion One |
| Backend | FastAPI (Python) o Hono (TS) | NestJS, Django |
| Base de Datos | PostgreSQL + Prisma ORM | SQLite (dev), MySQL |
| Caché | Redis (Upstash nivel gratis) | Dragonfly |
| Autenticación | Better Auth / Lucia | Auth.js |
| Almacenamiento Archivos | MinIO (self-hosted) | Supabase Storage |
| Búsqueda | MeiliSearch | Typesense |
| Cola (Queue) | BullMQ + Redis | Inngest |
| CI/CD | GitHub Actions | Woodpecker CI |
| Contenedores | Docker + Docker Compose | Podman |
| Orquestación | Kamal (deploy) o Coolify | Dokku |
| Monitoreo | Grafana + Prometheus | OpenTelemetry |
| Rastreo Errores | Sentry (nivel gratis) | GlitchTip |
| Testing | Vitest + Playwright | Jest + Cypress |
| Docs API | Swagger / Scalar | Redoc |

---

## 💡 ESTRATEGIA DE MODELO DE IA — 75% Ahorro Tokens

Para maximizar la eficiencia, usa este ruteo:

```
Tareas estructuradas SIMPLES (clasificación, etiquetado, puntuación):
  → Gemini Flash 2.0 / Qwen2.5-7B / DeepSeek-R1-Distill
  
Tareas MEDIAS (análisis de agente, secciones de plan):
  → Gemini Pro 1.5 / Qwen2.5-72B / Claude Haiku

Tareas COMPLEJAS (decisiones de arquitectura, síntesis completa):
  → Claude Sonnet / Gemini Ultra (solo cuando sea estrictamente necesario)
```

**Técnicas de reducción de tokens:**
- Pasa contexto en JSON estructurado, no en prosa.
- Usa ejemplos few-shot en el prompt del sistema, no por cada llamada.
- Comprime los hallazgos de la auditoría limitándolos a severidad + descripción de una línea antes de pasarlos al siguiente agente.
- Generación de dashboard: pasa solo el objeto de datos, la plantilla HTML es local.

---

## 📐 MANDATO DE DISEÑO RESPONSIVO

Toda recomendación de UI y dashboard generado debe seguir:

```
Puntos de ruptura (Breakpoints):
  Móvil:   320px – 767px   (prioridad táctil, navegación inferior)
  Tablet:  768px – 1023px  (barra lateral opcional, objetivos táctiles amplios)  
  Escritorio: 1024px+      (diseño completo, estados hover, densidad de datos)

Requisitos:
  ✅ CSS Mobile-first
  ✅ Tipografía fluida (clamp())
  ✅ Objetivos táctiles ≥ 44px
  ✅ Sin desplazamiento horizontal
  ✅ Alternancia modo claro/oscuro
  ✅ Navegable por teclado
  ✅ Mínimo WCAG AA
```

---

## 🔁 PATRÓN DE REUTILIZACIÓN

Esta habilidad está diseñada para ser **pegada en el contexto de cualquier proyecto** y ejecutada inmediatamente. Al activarse:

1. Lee cualquier contexto disponible en la conversación.
2. Ejecuta el flujo de 4 fases automáticamente.
3. Genera todos los archivos de salida + el dashboard.
4. NO hace preguntas innecesarias si el contexto es suficiente.

La habilidad estandariza todo — los agentes, las plantillas, el stack y el dashboard son consistentes en todos los proyectos.

---

## 📚 ARCHIVOS DE REFERENCIA

| Archivo | Cuándo Leer |
|---|---|
| `references/agents.md` | Antes de ejecutar cualquier análisis de agente |
| `references/planning.md` | Durante la generación del plan de la Fase 2 |
| `references/dashboard.md` | Durante la generación del dashboard de la Fase 3 |
| `references/tech-stack.md` | Al recomendar o decidir el stack |
| `references/intake.md` | Cuando el contexto falta o está incompleto |
| `references/audit-template.md` | Para el formato de salida de cada agente |

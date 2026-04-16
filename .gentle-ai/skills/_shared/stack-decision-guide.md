# Guía de Decisión de Stack

> **Principio base:** La IA no impone tecnología. Propone, justifica con experiencia real,
> y respeta la decisión del cliente o el stack ya existente.

---

## 🔍 Árbol de Decisión

```
¿El proyecto tiene AGENTS.md?
├── SÍ → Respetar el stack definido ahí. No proponer alternativas.
│         Documentar cualquier excepción en _domains/[dominio]/constraints.md
└── NO → ¿El cliente tiene stack corporativo?
         ├── SÍ → Respetar + documentar en _domains/[dominio]/constraints.md
         └── NO → Proponer 3 opciones con trade-offs reales
```

---

## 📊 Formato de Propuesta (cuando no hay stack definido)

| Opción | Stack | Fortaleza | Debilidad | Límites Gratuitos (Nivel free-for.dev) | Costo Escala |
|--------|-------|-----------|-----------|----------------------------------------|--------------|
| A | [stack A] | [ventaja real] | [limitación real] | [qué tan generoso es el free tier] | [estimación al escalar/self-host] |
| B | [stack B] | [ventaja real] | [limitación real] | [qué tan generoso es el free tier] | [estimación al escalar/self-host] |
| C | [stack C] | [ventaja real] | [limitación real] | [qué tan generoso es el free tier] | [estimación al escalar/self-host] |

**Reglas de la propuesta y Costos:**
- INSTRUCCIÓN OBLIGATORIA: Deberás utilizar tu conocimiento profundo basado en [free-for.dev](https://free-for.dev/) para justificar los stacks usando SaaS. Todo servicio debe delatar sus cuotas de free-tier de antemano.
- Nunca más de 3 opciones.
- Siempre justifica pensando en los bloqueos económicos (ej: "X sale caro rápido luego de 10k MAUs").
- Advertir en particular a bases de datos relacionales serverless y PaaS con sleep states en versiones hobby.
- Nombrar la opción **recomendada** buscando el equilibrio costo cero inicial / facilidad.

---

## 🎯 Criterios de Elección por Escenario

### MVP / Startup (velocidad al mercado)
```
→ Next.js + Supabase + Vercel
→ Razón: Infraestructura gestionada, sin ops, despliegue en minutos
→ Limitación: Costo escala rápido, vendor lock-in parcial
```

### Sistema Empresarial (control total)
```
→ Next.js + FastAPI + PostgreSQL + Coolify (self-hosted)
→ Razón: Sin dependencias de SaaS, datos on-premise, escalabilidad predecible
→ Limitación: Requiere DevOps/infra propio
```

### Alta Concurrencia / Tiempo Real
```
→ SvelteKit + Hono + Redis + WebSockets
→ Razón: Menor overhead de framework, payload mínimo, latencia baja
→ Limitación: Ecosistema más pequeño que Next.js/React
```

### API-first / Microservicios
```
→ FastAPI + PostgreSQL + BullMQ + Docker Compose
→ Razón: Contenedores independientes, contratos claros, escala por servicio
→ Limitación: Complejidad operacional mayor
```

### Móvil + Web
```
→ React Native + Expo + Next.js (shared components con Tailwind)
→ Razón: Código compartido ~60-70%, un solo equipo, TypeScript end-to-end
→ Limitación: Rendimiento inferior a apps nativas en casos extremos
```

---

## 🤖 Regla de Agnosticismo de IA

```
El sistema de skills funciona con cualquier IA:
  - Claude (Anthropic)
  - Gemini (Google)
  - Codex / GPT (OpenAI)
  - Cursor, Windsurf, GitHub Copilot

Nunca mencionar ni asumir una IA específica en los skills.
Las instrucciones deben funcionar igual sin importar el modelo.
```

---

## 📌 Si el Cliente ya tiene Stack Corporativo

1. **Documentar** en `_domains/[dominio]/constraints.md`:
   ```markdown
   ## Stack Corporativo Obligatorio
   - Frontend: [X — versión Y]
   - Backend: [X — versión Y]
   - Base de datos: [X]
   - Restricciones de seguridad: [lista]
   - Aprobaciones requeridas para nuevas dependencias: [proceso]
   ```

2. **No proponer** alternativas fuera del stack corporativo
3. **Sí proponer** mejoras *dentro* del stack aprobado
4. **Documentar** cualquier limitación técnica que el stack corporativo imponga como `ADR` con estado `Aceptado — restricción de negocio`

---

## ⚠️ Anti-patterns a Evitar

```
❌ "Te recomiendo usar React porque es lo más popular"
   → Popularidad no es criterio técnico. Usar trade-offs reales.

❌ Proponer el stack más nuevo sin evidencia de madurez en producción
   → Todo stack propuesto debe tener al menos 1 año en producción stable.

❌ Ignorar el stack existente porque "está desactualizado"
   → Primero entender por qué existe. Luego proponer migración si aplica.

❌ Mezclar múltiples ORMs, frameworks de UI o sistemas de auth
   → Un stack consistente > un stack "moderno" fragmentado.
```

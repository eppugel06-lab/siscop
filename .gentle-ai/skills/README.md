# BLEST - Business Logic & Engineering System Toolkit 🚀

BLEST es un **framewok de agentes y skills para Inteligencia Artificial** diseñado para elevar el comportamiento de LLMs (como Claude, GPT-4, o Gemini) desde el nivel de un simple "asistente de código" a un verdadero **Equipo de Ingeniería Multi-rol**.

Mediante una arquitectura de *Progressive Disclosure*, separación de capas (Conocimiento vs. Habilidades) y un estricto protocolo de fases, BLEST permite a tu IA generar especificaciones, auditar código, crear sistemas desde cero o diseñar interfaces como un profesional con +15 años de experiencia corporativa.

---

## 🛠️ ¿Cómo empezar?

Si utilizas una herramienta inteligente con acceso a este sistema de archivos (como Cursor, Windsurf, Codium, o el entorno de Gemini), sigue estos tres simples pasos:

1. **Inyecta el Meta-Prompt**: Abre el archivo `SYSTEM-PROMPT.md` y copia su contenido dentro de la configuración de "System Instructions" de tu agente IA.
2. **Inicia el Chat**: Abre una nueva sesión y escribe a tu IA algo natural, por ejemplo:
   > *"Necesito construir una aplicación de presupuestos"* o *"Audita el código de mi backend"*.
3. **El Diseño UI ya está integrado**: El archivo `DESIGN.md` base será leído por el agente táctitamente para crear frontends e interfaces con la estética premium "terminal-native".
4. **Deja que el Router Actúe**: El `system-router` se encargará tácitamente de ubicar la habilidad (**Skill**) correcta, cargar los estándares de calidad que viven en `_methodology/` e iniciar el trabajo.

---

## 🗂️ Catálogo de Skills (Habilidades Disponibles)

El sistema cuenta actualmente con módulos especializados para casi cualquier necesidad de software:

- 🏗️ **`system-builder`**: Para orquestar y generar un proyecto desde cero con arquitectura limpia.
- 📐 **`system-specs`**: Para redactar requerimientos funcionales, BDD, API contracts y casos de uso antes de programar.
- 🔍 **`system-audit`**: Para evaluar arquitecturas, seguridad (OWASP) y deuda técnica en un sistema ya existente.
- 🎨 **`system-design`**: Para diseñar tokens UI, definir micro-interacciones UX y estructurar prototipos frontend.
- 🔐 **`system-auth`**: Para mapear e implementar roles, matrices de permisos y middlewares de acceso seguros.
- 📡 **`system-observability`**: Para definir alertas, logs estructurados, dashboards y runbooks de fallos.
- 💰 **`system-pricing`**: Para desglosar propuestas económicas y cálculos de ROI para agencias y freelancers.
- 📖 **`system-docs`**: Para estructurar y escribir READMEs de calidad, OpenAPI y AGENTS.md.
- Y más... (explora las carpetas `system-*` para ver cada skill).

---

## 🔄 El Flujo de Trabajo (Protocolo Riguroso)

Para tu seguridad, **NINGÚN AGENTE hará cambios destructivos en tu código sin preguntarte**. 
Todos los agentes siguen el `phase-protocol.md`:
1. **PLAN:** Te proponen los cambios que van a hacer detalladamente.
2. **VALIDACIÓN:** Esperan por un "(S/N)" o aprobación explícita tuya.
3. **EXECUTE:** Reciben instrucciones y recién ahí escriben o modifican archivos. Al terminar, si el flujo continuara hacia otra habilidad, la IA manejará silenciosamente la transición de roles y te notificará.

---

## 🧠 Multi-Sesión y Contextos de Proyecto

A diferencia de chats convencionales que mezclan temas, BLEST guarda el estado de lo que el agente aprende de tu proyecto en tiempo real. 

La IA guarda sus Checkpoints automáticamente en `_context/sessions/session-[nombedelproyecto].md`. **Esto significa que puedes tener múltiples proyectos abiertos al mismo tiempo**; la IA detectará intuitivamente (o te preguntará) de cuál proyecto quieres hablar y cargará su contexto aislado.

---

*Diseñado para la Era de Ingeniería Aumentada por IA.*

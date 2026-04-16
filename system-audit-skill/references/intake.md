# 📥 Guía de Recopilación (Intake) — Cuando Falta Contexto

Si el usuario activa la habilidad sin proporcionar información del sistema, haz exactamente estas 5 preguntas (y solo estas — nunca preguntes más de 5):

---

## LAS 5 PREGUNTAS DE RECOPILACIÓN

Haz las 5 preguntas a la vez, con un formato limpio:

```
Para auditar y planificar tu sistema de forma profesional, necesito una visión general rápida:

1. **¿Qué hace tu sistema?** (1–3 oraciones — qué problema resuelve, quién lo usa)

2. **¿Cuál es tu stack tecnológico actual?** (lenguajes, frameworks, base de datos, alojamiento — incluso la información parcial ayuda)

3. **¿Cuál es el estado actual?** Elige uno:
   - 🔴 Roto / apenas funciona
   - 🟡 Funciona pero es un caos / difícil de mantener  
   - 🟢 Funciona pero necesita profesionalizarse
   - 🔵 Proyecto nuevo (nada construido aún)

4. **¿Cuál es tu escala?** (usuarios/peticiones actuales, escala objetivo en 12 meses, tamaño del equipo)

5. **¿Cuál es el mayor punto de dolor (#1)?** (qué es lo que está causando más problemas en este momento)

También puedes pegar: fragmentos de código, una estructura de carpetas, un README, capturas de pantalla — ¡cualquier cosa sirve!
```

---

## MANEJO DE CONTEXTO PARCIAL

Si hay algo de contexto disponible pero no está completo, extrae lo que puedas y llena los vacíos con valores predeterminados razonables. Nunca bloquees la auditoría por falta de información — documenta las suposiciones claramente.

### Suposiciones comunes cuando falta información:

| Información Faltante | Suposición Predeterminada |
|---|---|
| Base de datos desconocida | Asumir relacional (PostgreSQL) |
| Tamaño de equipo desconocido | Asumir equipo pequeño (1–5 devs) |
| Escala desconocida | Asumir escala de startup (<10k usuarios) |
| Entorno de alojamiento desconocido | Asumir servidor único / VPS básico |
| Framework desconocido | Analizar desde la estructura de archivos si está disponible |
| Pruebas (Testing) desconocido | Asumir cero pruebas (suposición segura) |

Documenta todas las suposiciones en la parte superior de `00-context.md`.

---

## CONTEXTO DESDE IMÁGENES

Si el usuario proporciona una captura de pantalla (como un dashboard, UI, o código):

1. Describe lo que ves (pistas del stack tecnológico, patrones de UI, estructuras de datos)
2. Nota qué es claramente visible vs qué se infiere
3. Haz una pregunta de seguimiento si falta información crítica
4. Procede con la auditoría basada en el contexto visual

El contexto visual es una entrada válida — no lo descartes.

---

## CONTEXTO DESDE CÓDIGO/REPOSITORIOS

Si el usuario pega un árbol de archivos o código:

```
Detectar:
- package.json / requirements.txt / go.mod → stack tecnológico
- directorio /pages vs /app → versión de Next.js
- prisma/ o migrations/ → ORM y tipo de BD
- .github/workflows/ → presencia de CI/CD
- docker-compose.yml → uso de contenedores (containerization)
- tests/ o __tests__/ → presencia de pruebas
- .env.example → enfoque de gestión de secretos
```

Construye contexto desde la estructura de archivos antes de preguntar cualquier cosa.

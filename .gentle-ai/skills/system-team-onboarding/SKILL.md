---
name: system-team-onboarding
description: >
  Genera documentación de incorporación para desarrolladores nuevos en un proyecto
  existente: explica la arquitectura, decisiones ADR, flujos de trabajo, convenciones
  y cómo empezar a contribuir.
  Triggers: "onboarding", "incorporar desarrollador", "nuevo en el equipo",
  "cómo contribuir", "entender el proyecto", "documentación para el equipo".
invocation: auto
---

# 👥 System Team Onboarding — Onboarding de Desarrolladores

> **Perfil:** 15+ años liderando equipos y haciendo onboarding de engineers.  
> **Entrega:** Guía completa para que un developer nuevo sea productivo en < 1 semana.

---

## 📋 Documentos que Genera

### 1. Guía de Onboarding
```markdown
# Bienvenido al Equipo — [Proyecto]

## 📋 Día 1: Setup
1. Clonar el repositorio
2. Instalar dependencias: `[comando]`
3. Copiar `.env.example` a `.env`
4. Levantar servicios: `[comando]`
5. Abrir http://localhost:[puerto]
6. Ejecutar tests: `[comando]`

## 📚 Día 2-3: Entender la Arquitectura
- Leer AGENTS.md (stack y convenciones)
- Revisar diagramas C4 en docs/
- Leer los ADRs en spec/decisions/
- Entender la estructura de carpetas

## 🔧 Día 4-5: Primer Contribución
- Tomar un issue tagged "good-first-issue"
- Crear branch: `feature/[descripción]`
- Desarrollar con tests
- Commit con Conventional Commits
- Abrir PR con template

## 📏 Convenciones del Proyecto
[Resumen de convenciones del AGENTS.md]

## ❓ Preguntas Frecuentes
[FAQ del equipo]
```

### 2. Mapa de Arquitectura (para nuevos)
```markdown
## Arquitectura en 5 minutos

### ¿Cómo funciona una request?
  Usuario → [Frontend: Next.js]
         → [API: FastAPI]
         → [BD: PostgreSQL]
         → Respuesta al usuario

### ¿Dónde está cada cosa?
  - Rutas/páginas: src/presentation/
  - Lógica de negocio: src/domain/
  - Acceso a datos: src/infrastructure/
  - Configuración: src/config/

### ¿Cómo agrego una feature?
  1. Modelo en domain/
  2. Use case en application/
  3. Repository en infrastructure/
  4. Route en presentation/
  5. Test en tests/
```

---

## ⚠️ Reglas

```
1. La guía debe funcionar — seguir los pasos debe resultar en setup exitoso
2. Incluir troubleshooting de errores comunes de setup
3. Máximo 1 semana para ser productivo — si tarda más, la guía falla
4. Mantener actualizado con cada cambio de stack o proceso
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```

# DESIGN.md - Sistema de Diseño UI/UX

Este documento define el lenguaje visual y la estética del proyecto. Cualquier agente de IA, Google Stitch o LLM que esté generando código UI (HTML, CSS, React, etc.) **DEBE** leer y respetar estas reglas para mantener un aspecto pixel-perfect.

## 1. Visual Theme & Atmosphere
- **Mood**: Terminal-native, técnico, profesional, ciber-elegante.
- **Density**: Media-alta. Interfaz centrada en datos.
- **Design Philosophy**: Priorizar la legibilidad del código y la información técnica mediante un canvas ultra oscuro ("Void-black") y detalles mínimos pero impactantes brillantes ("Emerald accent").

## 2. Color Palette & Roles (Theming)

El diseño debe soportar tanto Modo Oscuro (predeterminado) como Modo Claro. Debe integrar un mecanismo animado para alternarlos y, por defecto, activar la auto-detección de uso basada en las preferencias del sistema operativo/navegador en PC, móvil o tablet (`@media (prefers-color-scheme: dark)`).

| Semantic Name | Dark Mode (Void) | Light Mode | Functional Role |
|---------------|------------------|------------|-----------------|
| `bg-main` | `#050505` | `#FAFAFA` | Fondo principal de la app y del canvas. |
| `surface-main`| `#111111` | `#FFFFFF` | Fondo de tarjetas, modales y bloques de código. |
| `surface-hover`|`#1A1A1A` | `#F1F5F9` | Hover sobre elementos interactivos secundarios. |
| `border-subtle`|`#222222` | `#E2E8F0` | Bordes de inputs, tarjetas y divisores. |
| `text-primary`| `#F8FAFC` | `#0F172A` | Texto principal, encabezados. |
| `text-muted` | `#94A3B8` | `#64748B` | Texto secundario, descripciones, placeholders. |
| `accent-emerald`|`#10B981` | `#10B981` | Botones principales, enlaces, estados activos. |
| `accent-hover`| `#059669` | `#059669` | Hover para botones principales. |

> **Implementación UI:** La aplicación debe usar CSS Variables. Al cambiar de modo, el documento debe animar estos cambios (ej. `transition: background-color 0.3s ease, color 0.3s ease`).

## 3. Typography Rules
- **Sans-serif (UI General)**: `Inter` o `system-ui`.
- **Monospace (Código & Terminal)**: `JetBrains Mono`, `Fira Code` o `monospace`.

| Rango | Familia | Tamaño | Peso | Uso |
|-------|---------|--------|------|-----|
| H1 | Sans-serif | 2rem (32px) | 600 | Título principal de página |
| H2 | Sans-serif | 1.5rem (24px)| 600 | Secciones |
| Body | Sans-serif | 1rem (16px) | 400 | Párrafos |
| Code | Monospace | 0.875rem | 400 | Snippets, datos json, variables |

## 4. Component Stylings

### Buttons
- **Primary**: fondo `accent-emerald` (#10B981), texto negro (`#000000`), border-radius `4px` (ligeramente cuadrado), hover a `accent-hover`.
- **Secondary / Ghost**: fondo transparente, borde `border-subtle`, color `text-primary`, hover en `surface-hover`.

### Inputs
- Fondo `surface-main`, borde `border-subtle`, texto `text-primary`.
- Focus ring: 1px sólido de `accent-emerald` sin outline default. BorderRadius `4px`.

### Cards & Surfaces
- Fondo `surface-main`, borde `1px solid border-subtle`.
- Sin sombras excesivas, el diseño es flat oscuro.

### Iconography & Animations
- **Fuente Oficial:** Estándar obligatorio es [icones.js.org](https://icones.js.org/) (Iconify framework). Se priorizan sets limpios y modernos como *Lucide*, *Phosphor* o *Tabler*.
- **Animaciones Nativas:** La gran ventaja de Icônes es inyectar SVGs puros. Como regla general, si un ícono es interactivo o acompaña a un botón, **debe tener micro-animaciones**. Usa transiciones CSS (escalado `scale-105`, rotaciones menores `rotate-3` en hover, o dibujo de líneas mediante `stroke-dashoffset`) para aportar dinamismo fluido sin comprometer el perfomance.

### Loading States (Skeletons)
- **Herramienta Obligatoria:** Utilizar [boneyard-js](https://github.com/0xGF/boneyard) para la generación automática de skeletons perfectos a nivel de pixel.
- **Implementación:** Evitar el maquetado manual de placeholders; envolver el componente real con el tag funcional que provee la librería (ej. `<Skeleton name="..." loading={...}>`). El color base del skeleton debe integrarse armónicamente con la variante oscura `surface-hover` para no desentonar con el "Void-black".

## 5. Layout Principles
- **Grid / Spacing**: Escala de 4px (4, 8, 12, 16, 24, 32, 48).
- **Whitespace**: Amplio margen entre secciones para aislar visualmente los componentes densos.

## 6. Depth & Elevation
- Se evita el uso de sombras (box-shadow).
- La profundidad se crea mediante la diferenciación de colores de fondo (`#050505` vs `#111111`) y bordes muy sutiles (`#222222`).

## 7. Do's and Don'ts
- ✅ **DO**: Usar `JetBrains Mono` para cualquier texto que represente comandos, teclas, JSON o código.
- ✅ **DO**: Mantener los bordes finos (1px) y el radius pequeño (4px).
- ❌ **DON'T**: No usar blancos puros (`#FFFFFF`) para fondos bajo ninguna circunstancia.
- ❌ **DON'T**: No usar sombras difuminadas grandes. El diseño es flat y "cracking".
- ❌ **DON'T**: No mezclar más colores cálidos. El acento es esmeralda estricto.

## 8. Responsive Behavior
- **Mobile** (`< 768px`): Padding contenedor 16px, fuente general baja a 14px.
- **Tablet** (`768px - 1024px`): Padding contenedor 24px.
- **Desktop** (`> 1024px`): Maximum content width `1200px` centrado.

## 9. Agent Prompt Guide & Validaciones

*Estimado agente generador, cuando se planifique y se prototipeé UI, **estás obligado a pedir que el usuario valide o solicite cambios respecto a los tokens de color y la tipografía**.*

Al generar código (CSS/Tailwind/Frameworks):
1. Formula las variables CSS correspondientes a los esquemas claros y oscuros de arriba.
2. Añade un control animado para alternar modo claro/oscuro.
3. Asegura la detección automática del tema basándose en `(prefers-color-scheme: light/dark)` para coincidir con la PC, móvil o tablet de los visitantes.
4. Pausa y pide confirmación antes de dar la UI por terminada, adaptando los tokens según feedback.

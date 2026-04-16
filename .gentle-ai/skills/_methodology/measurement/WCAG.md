# ♿ WCAG 2.1 — Accesibilidad Web

> **Referencia:** Web Content Accessibility Guidelines 2.1 — W3C  
> **Nivel mínimo:** AA (obligatorio para todo proyecto del sistema)  
> **Principio:** Un sistema que no es accesible es un sistema incompleto.

---

## 🎯 Los 4 Principios POUR

### 1. Perceivable (Perceptible)
El contenido debe ser presentable de formas que el usuario pueda percibir.

| Criterio | Nivel | Verificación | Check |
|----------|-------|-------------|-------|
| **1.1** Texto alternativo para imágenes | A | `alt` en todos los `<img>` | ☐ |
| **1.2** Subtítulos para video/audio | A | Tracks de subtítulos | ☐ |
| **1.3** Estructura semántica | A | HTML5 semántico (`header`, `nav`, `main`) | ☐ |
| **1.4.1** Color no es el único indicador | A | Iconos + texto, no solo color | ☐ |
| **1.4.3** Contraste mínimo texto | AA | 4.5:1 texto normal, 3:1 texto grande | ☐ |
| **1.4.4** Texto redimensionable | AA | Zoom 200% sin pérdida de contenido | ☐ |
| **1.4.10** Reflow | AA | Sin scroll horizontal a 320px | ☐ |
| **1.4.11** Contraste de UI | AA | 3:1 para bordes, iconos, controles | ☐ |

---

### 2. Operable (Operable)
La interfaz debe ser navegable y operable por todos.

| Criterio | Nivel | Verificación | Check |
|----------|-------|-------------|-------|
| **2.1.1** Navegación por teclado | A | Todo accesible con Tab/Enter/Escape | ☐ |
| **2.1.2** Sin trampas de teclado | A | Se puede salir de cualquier componente | ☐ |
| **2.4.1** Skip navigation | A | Link "Ir al contenido" al inicio | ☐ |
| **2.4.2** Títulos de página | A | `<title>` descriptivo y único | ☐ |
| **2.4.3** Orden de foco lógico | A | Tab order sigue el orden visual | ☐ |
| **2.4.6** Headings descriptivos | AA | `h1` > `h2` > `h3` sin saltar niveles | ☐ |
| **2.4.7** Focus visible | AA | Outline visible al navegar con teclado | ☐ |
| **2.5.3** Labels coinciden con texto | A | Label del botón = texto visible | ☐ |

---

### 3. Understandable (Comprensible)
El contenido y la operación deben ser comprensibles.

| Criterio | Nivel | Verificación | Check |
|----------|-------|-------------|-------|
| **3.1.1** Idioma de la página | A | `lang="es"` en `<html>` | ☐ |
| **3.2.1** Sin cambios inesperados al focus | A | Focus no abre popovers automáticos | ☐ |
| **3.2.2** Sin cambios inesperados al input | A | Select no navega automáticamente | ☐ |
| **3.3.1** Errores identificados | A | Mensajes de error claros y específicos | ☐ |
| **3.3.2** Labels e instrucciones | A | Cada input tiene label visible | ☐ |
| **3.3.3** Sugerencias de error | AA | "Ingresa un email válido (ej: user@empresa.com)" | ☐ |
| **3.3.4** Prevención de errores | AA | Confirmación en acciones destructivas | ☐ |

---

### 4. Robust (Robusto)
El contenido debe ser interpretable por tecnologías asistivas.

| Criterio | Nivel | Verificación | Check |
|----------|-------|-------------|-------|
| **4.1.1** HTML válido | A | Sin errores de parseo en validador | ☐ |
| **4.1.2** Nombre, rol, valor | A | Componentes custom con ARIA correcto | ☐ |
| **4.1.3** Mensajes de estado | AA | `role="status"` / `aria-live` para toasts | ☐ |

---

## 🎨 Atributos ARIA Esenciales

```html
<!-- Botón con ícono sin texto -->
<button aria-label="Cerrar menú">
  <svg>...</svg>
</button>

<!-- Input con error -->
<input 
  id="email" 
  aria-invalid="true" 
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">Email no válido</span>

<!-- Región que se actualiza dinámicamente -->
<div aria-live="polite" aria-atomic="true">
  3 resultados encontrados
</div>

<!-- Navegación -->
<nav aria-label="Navegación principal">...</nav>
<nav aria-label="Menú de usuario">...</nav>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmar eliminación</h2>
</div>

<!-- Tabla de datos -->
<table aria-label="Lista de presupuestos">
  <caption>Presupuestos del mes de enero</caption>
  ...
</table>
```

---

## 📋 Checklist Rápido WCAG AA

- [ ] Todo `<img>` tiene `alt` descriptivo (o `alt=""` si es decorativa)
- [ ] Contraste 4.5:1 en texto, 3:1 en UI elements
- [ ] Navegable 100% con teclado (Tab, Enter, Escape, Arrow)
- [ ] Focus outline visible en todos los interactivos
- [ ] `<html lang="es">` definido
- [ ] Headings en orden jerárquico sin saltos
- [ ] Formularios con labels visibles y accesibles
- [ ] Mensajes de error específicos y asociados al campo
- [ ] Touch targets mínimo 44×44px en mobile
- [ ] Sin scroll horizontal a 320px de ancho (reflow)
- [ ] Modo oscuro con contraste suficiente
- [ ] `aria-live` en actualizaciones dinámicas (toasts, counters)

---

## 🛠️ Herramientas de Verificación

| Herramienta | Tipo | Uso |
|------------|------|-----|
| **axe-core** | Automated | Integración en tests (Playwright) |
| **Lighthouse** | Automated | Chrome DevTools > Audit |
| **WAVE** | Browser ext. | Análisis visual de errores |
| **Color Contrast Analyzer** | Manual | Verificar ratios de contraste |
| **Screen reader** | Manual | NVDA (Windows), VoiceOver (Mac) |

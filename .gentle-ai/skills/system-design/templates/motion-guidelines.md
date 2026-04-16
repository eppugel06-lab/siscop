# Motion Guidelines — Reglas de Animación

## Principios
1. **Con propósito:** Toda animación comunica algo (feedback, estado, transición)
2. **No bloquear:** Las animaciones NUNCA impiden la interacción
3. **Rápidas:** Bajo 300ms para interacciones, hasta 500ms para transiciones de página
4. **Accesibles:** Respetar `prefers-reduced-motion`
5. **Consistentes:** Mismas duraciones y easings en todo el sistema

## Duraciones
| Tipo | Duración | Uso |
|------|----------|-----|
| Instant | 100ms | Hover, toggle, cambio de color |
| Fast | 200ms | Fade in/out, scale, icon change |
| Normal | 300ms | Slide, expand, accordion, drawer |
| Slow | 500ms | Page transitions, modals, complex |

## Easing Functions
| Tipo | CSS | Uso |
|------|-----|-----|
| Ease Out | `cubic-bezier(0, 0, 0.2, 1)` | Elementos que aparecen (entradas) |
| Ease In | `cubic-bezier(0.4, 0, 1, 1)` | Elementos que desaparecen (salidas) |
| Ease In Out | `cubic-bezier(0.4, 0, 0.2, 1)` | Movimientos dentro de la pantalla |
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Feedback de acciones (bounce sutil) |

## Patrones de Animación

### Feedback de Click
```css
button:active {
  transform: scale(0.97);
  transition: transform var(--duration-instant) var(--ease-out);
}
```

### Hover
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: all var(--duration-fast) var(--ease-out);
}
```

### Fade In (aparición)
```css
.element-enter {
  opacity: 0;
  transform: translateY(8px);
}
.element-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all var(--duration-normal) var(--ease-out);
}
```

### Skeleton Loading (con boneyard-js)
*Nota: Siempre se debe priorizar el uso de la librería [boneyard-js](https://github.com/0xGF/boneyard) para la generación automática desde UI en lugar de aplicar CSS manual.*

```css
/* Fallback: Si boneyard-js no es aplicable, usar este CSS base */
.skeleton {
  background: linear-gradient(90deg, var(--surface-card) 25%, var(--surface-elevated) 50%, var(--surface-card) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }
```

### Toast Notification
```
Entrada: slide from top + fade in (300ms, ease-out)
Permanencia: 4 segundos
Salida: fade out (200ms, ease-in)
```

### Modal
```
Entrada: backdrop fade (200ms) + scale from 0.95 to 1 (300ms, ease-out)
Salida: scale to 0.95 + fade out (200ms, ease-in)
```

## Accesibilidad
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Anti-patterns
```
❌ Bounce excesivo (parece juguete, no herramienta profesional)
❌ Animaciones que bloquean la interacción
❌ Duraciones > 500ms (se sienten lentas)
❌ Animaciones en cada hover/scroll (fatiga visual)
❌ Parallax agresivo (mareo, peor accesibilidad)
```

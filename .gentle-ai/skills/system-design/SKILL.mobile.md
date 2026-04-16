---
name: system-design-mobile
extends: system-design
description: >
  Extensión de system-design para diseño móvil iOS/Android.
  Agrega reglas de plataforma, navegación nativa, gestos y guidelines.
---

# 📱 System Design — Extensión Mobile

> **Extiende:** `system-design/SKILL.md`  
> **Agrega:** Reglas específicas para iOS y Android.

---

## 📋 Reglas para Mobile

### Navegación
```
Patrones de navegación por plataforma:

iOS:
  - Tab Bar inferior (máximo 5 tabs)
  - Navigation Controller (push/pop)
  - Modal (de abajo hacia arriba)
  - Swipe back (gesture nativo)

Android:
  - Bottom Navigation (máximo 5 items)
  - Navigation Drawer (hamburger menu)
  - Material 3 guidelines
  - Back button del sistema

Compartido (React Native):
  - Tab Navigator para secciones principales
  - Stack Navigator para flujos internos
  - Evitar deep nesting (máximo 3 niveles)
```

### Touch Targets
```
- Mínimo 44×44px (Apple HIG)
- Mínimo 48×48dp (Material Design)
- Espacio entre targets: mínimo 8px
- Áreas de acción primaria al alcance del pulgar (bottom zone)
```

### Gestos
```
- Swipe horizontal: navegar entre tabs/páginas
- Swipe vertical: scroll / pull-to-refresh
- Long press: acciones secundarias / menú contextual
- Pinch: zoom en imágenes/mapas
- Double tap: zoom in (imágenes)

Regla: Todo gesto debe tener alternativa por botón
       (accesibilidad para usuarios con dificultades motrices)
```

### Formularios Mobile
```
- Keyboard type correcto por campo:
  - Email: email-address
  - Teléfono: phone-pad
  - Número: numeric
  - URL: url
- Input accesorio: botones "Done", "Next" en el teclado
- Auto-focus en el primer campo
- Scroll automático al campo activo (evitar que el teclado tape)
- Validación inline, no on-submit
```

### Offline-first
```
- La app debe funcionar sin conexión para operaciones de lectura
- Queue de escritura para sincronizar cuando vuelva la conexión
- Indicador visual de estado de conexión (sutil, no bloqueante)
- Conflict resolution: last-write-wins o merge manual
```

### Plataform-specific
```
iOS:
  - Safe area insets (notch, Dynamic Island, home indicator)
  - Haptic feedback en acciones confirmadas
  - SF Symbols para iconos nativos
  - Dark mode con los colores del sistema

Android:
  - Material You dynamic colors (Android 12+)
  - Edge-to-edge (detrás de status bar y nav bar)
  - Predictive back gesture (Android 14+)
  - Adaptive icons
```

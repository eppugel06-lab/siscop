# Prototype Checklist — Validación antes de Implementar

## Checklist de Revisión

### Estructura y Navegación
- [ ] ¿La navegación es intuitiva sin explicación?
- [ ] ¿El usuario puede completar la tarea principal en ≤ 3 clicks?
- [ ] ¿Hay breadcrumbs o indicador de ubicación?
- [ ] ¿El back button funciona correctamente?
- [ ] ¿Los links/botones principales son visibles sin scroll?

### Contenido y Jerarquía
- [ ] ¿El contenido más importante está visible first-fold?
- [ ] ¿La jerarquía visual guía al ojo correctamente?
- [ ] ¿Los CTAs se distinguen claramente del resto?
- [ ] ¿Los textos son legibles (tamaño, contraste, line-height)?
- [ ] ¿No hay lorem ipsum ni placeholders en la demo?

### Interacción y Feedback
- [ ] ¿Los botones tienen hover/active states?
- [ ] ¿Los formularios muestran validación en tiempo real?
- [ ] ¿Las acciones destructivas piden confirmación?
- [ ] ¿Los loading states están implementados (priorizando skeletons con boneyard-js)?
- [ ] ¿Los empty states son informativos y tienen CTA?

### Responsive
- [ ] ¿Funciona en mobile (320px)?
- [ ] ¿Funciona en tablet (768px)?
- [ ] ¿Funciona en desktop (1024px+)?
- [ ] ¿Touch targets ≥ 44×44px en mobile?
- [ ] ¿No hay scroll horizontal en ninguna resolución?

### Accesibilidad
- [ ] ¿Navegable con teclado (Tab, Enter, Escape)?
- [ ] ¿Contraste suficiente (4.5:1)?
- [ ] ¿Focus visible en todos los interactivos?
- [ ] ¿Imágenes con alt text?

### Modo Oscuro
- [ ] ¿Implementado y funcional?
- [ ] ¿Contraste suficiente en modo oscuro?
- [ ] ¿Switch de tema accesible?

---

## ✅ Validación con el Usuario

Antes de implementar, presentar el prototipo al usuario con estas preguntas:

1. ¿La pantalla principal muestra lo que esperabas?
2. ¿Puedes completar [tarea principal] sin ayuda?
3. ¿Hay algo que te confunda o que cambiarías?
4. ¿El estilo visual (colores, tipografía) te parece correcto?
5. ¿Apruebas este diseño para iniciar la implementación?

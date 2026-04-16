---
name: system-design-web
extends: system-design
description: >
  Extensión de system-design para diseño web responsive.
  Agrega reglas específicas de diseño web, SEO, y Progressive Web App.
---

# 🌐 System Design — Extensión Web

> **Extiende:** `system-design/SKILL.md`  
> **Agrega:** Reglas específicas para web responsive, SEO y PWA.

---

## 📋 Reglas Adicionales para Web

### Responsive Design
```
1. Mobile-first: escribir CSS para mobile, luego media queries ascendentes
2. Breakpoints del sistema (ver SKILL.md principal):
   - Mobile: 320px – 767px
   - Tablet: 768px – 1023px
   - Desktop: 1024px+

3. Patrones de layout:
   - Mobile: stack vertical, bottom navigation
   - Tablet: sidebar colapsable, contenido al centro
   - Desktop: sidebar fija, contenido ancho completo

4. Imágenes responsive:
   - srcset con múltiples resoluciones
   - next/image con priority para hero
   - WebP/AVIF con fallback JPG

5. Tipografía fluida:
   - clamp() para tamaños adaptativos
   - Ejemplo: font-size: clamp(1rem, 2.5vw, 1.5rem)
```

### SEO Obligatorio
```
- <title> único y descriptivo por página (50-60 chars)
- <meta name="description"> por página (150-160 chars)
- Un solo <h1> por página
- Estructura semántica: header, nav, main, section, footer
- URLs amigables: /presupuestos/PRES-2026-0042
- Sitemap.xml generado automáticamente
- robots.txt configurado
- Open Graph tags para redes sociales
- JSON-LD para structured data (si aplica)
```

### Progressive Web App (opcional)
```
- manifest.json con iconos, colores, nombre
- Service Worker para offline básico
- Cache-first para assets estáticos
- Network-first para datos dinámicos
- Install prompt en mobile
```

### Performance Web
```
- Lighthouse Score ≥ 90 en las 4 categorías
- Core Web Vitals en verde
- First paint < 1.5s
- Total Blocking Time < 200ms
- JavaScript bundle < 200KB gzipped
```

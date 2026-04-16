# ⚡ Core Web Vitals — Métricas de Rendimiento Web

> **Referencia:** Google Chrome UX Report + web.dev  
> **Principio:** Un sitio lento es un sitio roto. El rendimiento es UX.

---

## 🎯 Las 3 Métricas Core

### LCP — Largest Contentful Paint
**Pregunta:** ¿Cuánto tarda en aparecer el contenido más grande de la pantalla?

| Nivel | Tiempo | Clasificación |
|-------|--------|---------------|
| 🟢 Bueno | ≤ 2.5s | Ideal |
| 🟡 Necesita mejorar | 2.5s – 4.0s | Aceptable |
| 🔴 Pobre | > 4.0s | Inaceptable |

**Qué lo afecta:**
- Imágenes hero sin optimizar (sin WebP/AVIF, sin dimensiones)
- Fonts bloqueantes (sin `font-display: swap`)
- CSS bloqueante sin critical CSS inline
- Server response lento (TTFB > 800ms)

**Cómo optimizar:**
```
1. Imágenes: next/image con priority, formato WebP/AVIF
2. Fonts: preload + font-display: swap
3. CSS: Critical CSS inline, resto async
4. Server: CDN, edge caching, SSG cuando sea posible
5. preload del recurso LCP: <link rel="preload" as="image" href="hero.webp">
```

---

### INP — Interaction to Next Paint
**Pregunta:** ¿Cuánto tarda la interfaz en responder a una interacción?

| Nivel | Tiempo | Clasificación |
|-------|--------|---------------|
| 🟢 Bueno | ≤ 200ms | Imperceptible |
| 🟡 Necesita mejorar | 200ms – 500ms | Notorio |
| 🔴 Pobre | > 500ms | Frustrante |

**Qué lo afecta:**
- Hydration pesada en frameworks SSR
- Event handlers que bloquean el main thread
- Re-renders innecesarios (React sin memo/useMemo)
- Third-party scripts bloqueantes (analytics, ads)

**Cómo optimizar:**
```
1. Debounce en inputs de búsqueda (300ms)
2. useTransition para actualizaciones no urgentes (React 18+)
3. Web Workers para cálculos pesados
4. Code splitting: lazy load de componentes no visibles
5. Virtualización para listas largas (TanStack Virtual)
```

---

### CLS — Cumulative Layout Shift
**Pregunta:** ¿Cuánto se mueve el layout mientras carga la página?

| Nivel | Score | Clasificación |
|-------|-------|---------------|
| 🟢 Bueno | ≤ 0.1 | Estable |
| 🟡 Necesita mejorar | 0.1 – 0.25 | Layout shifts visibles |
| 🔴 Pobre | > 0.25 | Layout caótico |

**Qué lo causa:**
- Imágenes sin `width` y `height` definidos
- Ads/embeds que aparecen tarde y empujan contenido
- Fonts web que cambian el tamaño del texto al cargar
- Contenido dinámico insertado arriba del viewport

**Cómo evitar:**
```
1. SIEMPRE definir width/height en imágenes (o aspect-ratio CSS)
2. Reservar espacio para ads/embeds con min-height
3. font-display: optional (evita FOUT que desplaza)
4. Skeleton loaders con dimensiones fijas
5. Contenido dinámico: insertar debajo del viewport, no arriba
```

---

## 📋 Checklist de Performance

### Imágenes
- [ ] Formato WebP/AVIF con fallback JPG
- [ ] Dimensiones explícitas (`width`, `height`)
- [ ] Lazy loading (`loading="lazy"`) excepto hero/LCP
- [ ] Hero image con `priority` (Next.js) o `fetchpriority="high"`
- [ ] Responsive images con `srcset` y `sizes`

### CSS y Fonts
- [ ] Critical CSS inline en `<head>`
- [ ] CSS no-crítico cargado async
- [ ] Fonts preloaded: `<link rel="preload" as="font" crossorigin>`
- [ ] `font-display: swap` (o `optional` para CLS estricto)
- [ ] No más de 2-3 font families

### JavaScript
- [ ] Code splitting por ruta (dinamic import)
- [ ] Tree shaking activo (ES modules)
- [ ] Third-party scripts async/defer
- [ ] No render-blocking JS en `<head>`
- [ ] Bundle total < 200KB gzipped (primera carga)

### Server
- [ ] TTFB < 800ms (idealmente < 200ms)
- [ ] Gzip/Brotli compression activa
- [ ] Cache-Control headers en assets estáticos
- [ ] CDN para assets (imágenes, fonts, JS/CSS)
- [ ] HTTP/2 o HTTP/3 habilitado

---

## 🛠️ Herramientas de Medición

| Herramienta | Tipo | Datos |
|------------|------|-------|
| **Lighthouse** | Lab | Chrome DevTools > Performance |
| **PageSpeed Insights** | Field + Lab | Datos reales de Chrome UX Report |
| **WebPageTest** | Lab | Waterfalls, video comparison |
| **Chrome DevTools Performance** | Lab | Flame charts, main thread |
| **CrUX Dashboard** | Field | Datos reales de usuarios (BigQuery) |
| **web-vitals (npm)** | RUM | Medición en tu propia app |

---

## 📊 Scorecard de Performance

```markdown
## Performance Scorecard — [URL] — [Fecha]

| Métrica | Valor | Target | Estado |
|---------|-------|--------|--------|
| LCP | [X]s | ≤ 2.5s | 🔴🟡🟢 |
| INP | [X]ms | ≤ 200ms | 🔴🟡🟢 |
| CLS | [X] | ≤ 0.1 | 🔴🟡🟢 |
| TTFB | [X]ms | ≤ 800ms | 🔴🟡🟢 |
| Total Bundle | [X]KB | ≤ 200KB gz | 🔴🟡🟢 |
| Lighthouse Score | [X]/100 | ≥ 90 | 🔴🟡🟢 |

### Top 3 Oportunidades de Mejora
1. [oportunidad con mayor impacto]
2. [segunda oportunidad]
3. [tercera oportunidad]
```

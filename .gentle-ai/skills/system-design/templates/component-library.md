# Component Library — [Proyecto]

## Componentes Base

| Componente | Estados | Variantes | Accesible |
|-----------|---------|-----------|-----------|
| Button | default, hover, active, disabled, loading | primary, secondary, ghost, danger | ✅ |
| Input | default, focus, error, disabled | text, email, password, number, search | ✅ |
| Select | default, open, disabled | single, multi, searchable | ✅ |
| Checkbox | unchecked, checked, indeterminate, disabled | default, with-label | ✅ |
| Radio | unselected, selected, disabled | default, with-description | ✅ |
| Toggle | off, on, disabled | default, with-label | ✅ |
| Badge | — | success, warning, error, info, neutral | ✅ |
| Avatar | — | image, initials, icon, sizes (sm, md, lg) | ✅ |
| Tooltip | hidden, visible | top, right, bottom, left | ✅ |

## Componentes de Layout

| Componente | Descripción |
|-----------|-------------|
| Card | Contenedor elevado con padding, border-radius, shadow |
| Modal | Overlay centrado con backdrop, trap focus |
| Drawer | Panel lateral deslizable (mobile: full, desktop: 400px) |
| Tabs | Navegación horizontal con indicador animado |
| Accordion | Secciones colapsables con transición suave |
| Sidebar | Navegación lateral colapsable |
| Container | Max-width responsive con padding lateral |

## Componentes de Datos

| Componente | Features |
|-----------|----------|
| DataTable | Sort, filtros, búsqueda, paginación, bulk select |
| EmptyState | Icono + mensaje + CTA cuando no hay datos |
| Skeleton | Implementado con `boneyard-js` para captura automática de UI real (cero maquetado manual) |
| Pagination | Páginas, items por página, total |
| Stats Card | KPI con valor, label, tendencia (↑↓) e ícono |

## Componentes de Feedback

| Componente | Uso |
|-----------|-----|
| Toast | Notificación temporal (success, error, info, warning) |
| Alert | Mensaje persistente en contexto (dismissible o no) |
| Progress | Barra o circular para progreso determinado |
| Spinner | Loading indeterminado (usar skeleton cuando sea posible) |
| ConfirmDialog | Diálogo de confirmación para acciones destructivas |

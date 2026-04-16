# Design Tokens — [Proyecto]

## Colores

### Paleta Principal
```css
--color-primary-50:  [tint más claro];
--color-primary-100: ;
--color-primary-200: ;
--color-primary-300: ;
--color-primary-400: ;
--color-primary-500: ; /* color principal */
--color-primary-600: ;
--color-primary-700: ;
--color-primary-800: ;
--color-primary-900: ; /* shade más oscuro */
```

### Semánticos
```css
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-info:    #3b82f6;
```

### Superficies (Modo Claro)
```css
--surface-background: #ffffff;
--surface-card:       #f9fafb;
--surface-elevated:   #ffffff;
--text-primary:       #111827;
--text-secondary:     #6b7280;
--text-muted:         #9ca3af;
--border-default:     #e5e7eb;
--border-strong:      #d1d5db;
```

### Superficies (Modo Oscuro)
```css
--surface-background: #0f172a;
--surface-card:       #1e293b;
--surface-elevated:   #334155;
--text-primary:       #f1f5f9;
--text-secondary:     #94a3b8;
--text-muted:         #64748b;
--border-default:     #334155;
--border-strong:      #475569;
```

---

## Tipografía
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Scale */
--text-xs:    0.75rem / 1rem;     /* 12px */
--text-sm:    0.875rem / 1.25rem; /* 14px */
--text-base:  1rem / 1.5rem;      /* 16px */
--text-lg:    1.125rem / 1.75rem; /* 18px */
--text-xl:    1.25rem / 1.75rem;  /* 20px */
--text-2xl:   1.5rem / 2rem;      /* 24px */
--text-3xl:   1.875rem / 2.25rem; /* 30px */
--text-4xl:   2.25rem / 2.5rem;   /* 36px */

/* Weights */
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
```

---

## Espaciado
```css
--space-0:  0;
--space-1:  0.25rem;  /* 4px */
--space-2:  0.5rem;   /* 8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

---

## Bordes y Sombras
```css
/* Border Radius */
--radius-sm:   0.25rem;  /* 4px */
--radius-md:   0.5rem;   /* 8px */
--radius-lg:   0.75rem;  /* 12px */
--radius-xl:   1rem;     /* 16px */
--radius-full: 9999px;

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## Motion
```css
--duration-instant: 100ms;
--duration-fast:    200ms;
--duration-normal:  300ms;
--duration-slow:    500ms;

--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in:     cubic-bezier(0.4, 0.0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
```

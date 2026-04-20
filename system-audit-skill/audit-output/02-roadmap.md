# Fase 2: Roadmap de Evolución SISCOP Professional

## P0: Fundación Visual y Estándar "Apple Pro"
*Fase de refinamiento estético y corrección de inconsistencias críticas.*
- [ ] Implementación de Apple System Colors dinámicos (Adaptativo claro/oscuro).
- [ ] Normalización de radios de borde (Squircle) a 12px/16px globalmente.
- [ ] Refactor del motor de tipografía (`SF Pro` + `Inter` fallback).
- [ ] **Esfuerzo**: S (2-3 días).

## P1: Experiencia de Datos de Élite
*Optimización de dashboards y visualización de presupuesto.*
- [ ] Introducción de `Chart.js` para visualización ejecutiva en Dashboard General.
- [ ] Virtualización de tablas para manejar >1000 filas sin lag.
- [ ] Skeletons de carga Apple-style (Shimmer animado).
- [ ] **Esfuerzo**: M (1 semana).

## P2: Robustez y UX Avanzada
*Mejora de seguridad y flujos de usuario.*
- [ ] Sanitización de entradas y salidas en el motor de `build.js`.
- [ ] Implementación de micro-interacciones (Spring animations) en Sidebar y Modales.
- [ ] Tooltips y ayuda contextual (Popover) en columnas técnicas.
- [ ] **Esfuerzo**: M (1 semana).

## P3: Escala y Automatización
*Preparación para multi-unidad y auditoría automática.*
- [ ] Sistema de logs avanzado (Auditoría de cambios por usuario).
- [ ] Exportación avanzada (Formatos de informe PDF ejecutivos).
- [ ] Optimización de cuotas de Apps Script para alta concurrencia.
- [ ] **Esfuerzo**: L (2 semanas).

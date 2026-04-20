# Fase 0: Escaneo de Contexto — SISCOP

## Tipo de Sistema
- **Categoría**: Aplicación Web (SaaS Interno)
- **Tecnología**: Google Apps Script + Google Sheets API
- **Frontend**: Vanilla HTML/JS, Vite (local development), CSS Personalizado.

## Stack Tecnológico Actual
- **Hospedaje**: Google Apps Script (Servidores de Google).
- **Base de Datos**: Google Sheets (Hojas de cálculo como tablas).
- **Frontend**: 
  - Framework: Ninguno (Vanilla JS).
  - Librerías: `xlsx` (Excel), LocalStorage para temas.
  - Diseño: Apple HIG (en proceso).

## Escala y Usuarios
- **Uso**: Interno (UGEL 06 - Presupuesto).
- **Dispositivos**: Escritorio (Prioridad), Responsivo (Deseado).

## Puntos de Fricción Identificados
- Sincronización manual entre Apps Script y entorno local (clasp).
- Complejidad en la carga de insumos (múltiples archivos y validaciones).
- Rendimiento dependiente de la API de Google Sheets (I/O bloqueante).

## Metas del Rediseño
- Excelencia visual "Apple Pro".
- Eficiencia en la visualización de grandes volúmenes de datos presupuestales.
- Robustez y seguridad en el procesamiento de datos.

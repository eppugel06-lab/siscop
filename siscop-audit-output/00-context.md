# 00 Contexto del Sistema

## Tipo de Sistema
Aplicación Web Monolítica (Serverless Proxy) con Base de Datos en Hojas de Cálculo.

## Stack Actual
- **Backend:** Google Apps Script (V8 Engine) - Archivo `Código.gs`
- **Frontend:** Vanilla JS (`JS_Upload.html`, `JS_Admin.html`), CSS Custom (`CSS_Global.html`), HTML5.
- **Base de Datos:** Google Sheets (`SpreadsheetApp`).
- **Infraestructura:** Infraestructura Serverless PaaS de Google (GAS).

## Escala
- Operación departamental corporativa (UGEL 06), alta transferencia de filas en Excel (consolidación de presupuesto/gastos), decenas/cientos de miles de registros transaccionales en memoria.

## Puntos de Dolor Identificados
- Cuellos de botella severos de I/O por escritura redundante en Google Sheets.
- Monolito JS en frontend sin modularidad nativa (archivos HTML aglomerados en `Index.html`).
- Tiempos de ejecución en servidor limitados a 6 minutos (Límite estricto de Google Apps Script).
- CSS global inyectado monolíticamente causando estrés en re-renderizado.
- Variables globales mutables (`S`) rompiendo la trazabilidad en cliente y servidor.

## Metas de Auditoría Profesional
Evolucionar el sistema de un script sobrecargado a una arquitectura tolerante a fallos, altamente asíncrona, con abstracciones limpias, conservando los límites de Google Apps Script o dictando migración.

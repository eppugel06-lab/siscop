# 00 Contexto del Sistema

## Meta
Auditoría del componente `system-audit-skill`.

## Tipo de Sistema
Habilidad de agente (Skill Protocol), arquitectura multi-agente en formato Markdown.

## Stack Actual
- Markdown (SKILL y referencias).
- HTML (Dashboard de planificación referenciado).

## Puntos de Dolor Identificados Inmediatamente
- Dependencias rotas en las referencias (falta `audit-template.md`).
- Escalabilidad del parsing de tokens para la generación del Dashboard.

## Metas de la Auditoría
Evaluar solidez, coherencia y eficiencia de token del prompt multi-agente, asegurando cumplimiento del Caveman Mode e interfaces declaradas.

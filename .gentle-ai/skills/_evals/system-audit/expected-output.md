# Output Esperado — system-audit

## Hallazgos críticos esperados
- [🔴 CRÍTICO] Seguridad: contraseñas en MD5 → migrar a bcrypt/argon2 con cost ≥ 12
- [🔴 CRÍTICO] Arquitectura: monolito de 3000 líneas sin separación de capas → refactorizar a Clean Architecture
- [🔴 CRÍTICO] Deuda técnica: 0% cobertura de tests → implementar al menos unit tests de módulos críticos
- [🟡 MEDIO] Rendimiento: sin índices identificados en queries de búsqueda → analizar EXPLAIN y crear índices
- [🟡 MEDIO] Dependencias: librerías con 3 años sin actualizar, CVEs probables → npm audit y actualizar
- [🟡 MEDIO] Seguridad: Express sin security headers, CORS probablemente abierto → helmet + CORS restrictivo
- [🟢 BAJO] Estándares: sin linter ni formatter configurado → ESLint + Prettier

## Scorecard esperado

| Área | Estado | Score |
|------|--------|-------|
| Seguridad | 🔴 | 2/10 |
| Arquitectura | 🔴 | 1/10 |
| Rendimiento | 🟡 | 4/10 |
| Deuda Técnica | 🔴 | 1/10 |
| Estándares | 🟡 | 3/10 |
| **Total** | 🔴 | **11/50** |

## Plan de acción esperado

| Prioridad | Acción | Skill |
|-----------|--------|-------|
| P0 | Migrar contraseñas de MD5 a bcrypt | system-maintenance |
| P0 | Agregar security headers (helmet) | system-maintenance |
| P1 | Separar app.js en módulos/capas | system-maintenance |
| P1 | Agregar tests unitarios a auth y queries críticas | system-maintenance |
| P2 | Actualizar dependencias + auditoría de CVEs | system-maintenance |
| P2 | Agregar índices a BD según queries frecuentes | system-maintenance |

# Output Esperado — system-builder

## Comportamiento esperado del skill

### 1. Discovery (debe preguntar máximo 2 cosas más)
- ¿Necesitas facturación electrónica (CFDI) o solo cotización?
- ¿Los clientes necesitan crear cuenta o solo acceden por link?

### 2. Stack propuesto (3 opciones con trade-offs)

| Opción | Stack | Fortaleza | Debilidad |
|--------|-------|-----------|-----------|
| A (rec.) | Next.js + FastAPI + PostgreSQL | Fullstack moderno, tipado | 2 lenguajes |
| B | Next.js + tRPC + PostgreSQL | Un solo lenguaje (TS) | Menor ecosistema backend |
| C | SvelteKit + PostgreSQL | Menor bundle, DX alto | Comunidad más pequeña |

### 3. Plan de construcción esperado
- Módulo 1: Auth (login, roles admin/vendedor)
- Módulo 2: Clientes (CRUD)
- Módulo 3: Presupuestos (CRUD + cálculos + estados)
- Módulo 4: Envío por email + link de aprobación
- Módulo 5: Dashboard con métricas

### 4. Entregables esperados
- [ ] Estructura Clean Architecture
- [ ] Auth con JWT + roles
- [ ] CRUD de clientes
- [ ] CRUD de presupuestos con partidas
- [ ] Cálculo automático de subtotal + IVA (16%) + total
- [ ] Estado machine: DRAFT → SENT → APPROVED/REJECTED
- [ ] API REST documentada con OpenAPI
- [ ] Tests unitarios de módulos críticos
- [ ] README.md completo
- [ ] AGENTS.md del proyecto
- [ ] Docker Compose para desarrollo

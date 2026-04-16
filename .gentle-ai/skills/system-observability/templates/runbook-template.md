# Runbook — [Nombre del Incidente]

## Metadata
- **Severidad:** P0 🔴 / P1 🟡 / P2 🟢
- **Última actualización:** YYYY-MM-DD
- **Autor:** [quién creó este runbook]
- **Servicios afectados:** [lista de servicios]

---

## Síntomas
[Qué observa el usuario o qué alerta se disparó]
- [Síntoma 1: ej. "Usuarios reportan error 500 en /api/budgets"]
- [Síntoma 2: ej. "Alerta de latencia > 5s en Grafana"]
- [Síntoma 3: ej. "Logs muestran Connection Timeout a PostgreSQL"]

---

## Diagnóstico (pasos para confirmar)

### Paso 1: Verificar estado del servicio
```bash
# Verificar health check
curl -s https://api.ejemplo.com/health | jq .

# Verificar logs recientes
docker logs --tail 100 api-container 2>&1 | grep ERROR
```

### Paso 2: Verificar base de datos
```bash
# Verificar conexión
pg_isready -h db-host -p 5432

# Verificar conexiones activas
psql -c "SELECT count(*) FROM pg_stat_activity;"
```

### Paso 3: Verificar métricas
```
- Grafana > Dashboard [nombre] > Panel [métrica]
- ¿CPU > 90%? ¿Memory > 85%? ¿Disk > 90%?
```

---

## Solución (pasos ordenados)

### Si es problema de conexión a BD:
1. Reiniciar connection pool: `[comando]`
2. Verificar que BD acepta conexiones
3. Si persiste, reiniciar servicio: `[comando]`
4. Verificar que el servicio levantó correctamente

### Si es problema de memoria:
1. Identificar procesos pesados: `top -o %MEM`
2. Reiniciar contenedor: `docker restart [container]`
3. Si recurre, investigar memory leak

### Si es problema de disco:
1. Identificar archivos grandes: `du -sh /var/log/*`
2. Rotar logs: `[comando]`
3. Si es BD, verificar vacuum

---

## Rollback (si la solución falla)
1. Revertir último deploy: `[comando de rollback]`
2. Restaurar BD desde último backup: `[comando]`
3. Verificar integridad de datos
4. Notificar al equipo

---

## Escalamiento

| Tiempo | Acción |
|--------|--------|
| 0-15 min | On-call intenta resolver con este runbook |
| 15-30 min | Escalar a Tech Lead: [nombre] — [contacto] |
| 30-60 min | Escalar a CTO: [nombre] — [contacto] |
| 60+ min | Comunicar a stakeholders, activar war room |

---

## Post-mortem (plantilla para análisis posterior)

```markdown
## Post-mortem — [Fecha] — [Título del incidente]

### Timeline
- HH:MM — [primera alerta]
- HH:MM — [acción tomada]
- HH:MM — [servicio restaurado]

### Impacto
- Duración: [X minutos/horas]
- Usuarios afectados: [N]
- Datos perdidos: [ninguno / descripción]

### Causa Raíz
[Descripción técnica de la causa]

### ¿Por qué no se detectó antes?
[Análisis de monitoring/alerting gaps]

### Acciones Preventivas
- [ ] [Acción 1 — responsable — fecha límite]
- [ ] [Acción 2 — responsable — fecha límite]

### Lecciones Aprendidas
- [Lección 1]
- [Lección 2]
```

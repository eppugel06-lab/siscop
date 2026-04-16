---
name: system-security
description: >
  Análisis de seguridad profundo: pentest conceptual, análisis de superficie de
  ataque, gestión de secretos, políticas de autenticación, hardening de infraestructura.
  Triggers: "seguridad", "pentest", "vulnerabilidades", "hardening", "gestión de secretos",
  "análisis de seguridad profundo", "superficie de ataque".
invocation: auto
---

# 🔒 System Security — Seguridad Profunda

> **Perfil:** 15+ años en seguridad de aplicaciones y hardening.  
> **Diferencia con system-audit:** audit revisa OWASP básico como parte del diagnóstico.  
> Este skill hace análisis PROFUNDO exclusivo de seguridad.

---

## 📋 Áreas de Análisis

### 1. Superficie de Ataque
```
Mapear todos los puntos de entrada:
  - Endpoints públicos (sin auth)
  - Endpoints autenticados (con auth)
  - WebSockets
  - File uploads
  - Formularios de input
  - Webhooks entrantes
  - Admin panels
  - APIs internas entre servicios
  
Para cada punto: ¿qué puede hacer un atacante?
```

### 2. Gestión de Secretos
```
Auditar:
  - ¿Dónde están los secrets? (env vars, vault, hardcoded)
  - ¿Se rotan periódicamente?
  - ¿Quién tiene acceso?
  - ¿Los logs no exponen secrets?
  - ¿El .env está en .gitignore?
  - ¿Hay secrets en el historial de git?
  
Recomendación: vault (HashiCorp, Doppler, Infisical)
```

### 3. Autenticación y Sesiones
```
  - ¿Passwords con bcrypt/argon2 (cost ≥ 12)?
  - ¿JWT con expiración corta (15 min)?
  - ¿Refresh token rotation?
  - ¿MFA disponible para admins?
  - ¿Rate limiting en login?
  - ¿Account lockout after N attempts?
  - ¿Session invalidation on password change?
  - ¿Secure, HttpOnly, SameSite en cookies?
```

### 4. Hardening de Infraestructura
```
  - ¿Puertos innecesarios cerrados?
  - ¿SSH con key-based auth (no password)?
  - ¿Firewall configurado (UFW, security groups)?
  - ¿Actualizaciones de OS aplicadas?
  - ¿Docker images con user non-root?
  - ¿Network segmentation (DB no pública)?
  - ¿Backups cifrados y offsite?
```

### 5. Pentest Conceptual
```
Sin acceso directo al servidor, simular:
  - SQL Injection en inputs conocidos
  - XSS en campos de texto libre
  - CSRF en formularios de acción
  - IDOR (acceder a recursos de otro usuario)
  - Privilege escalation (usuario → admin)
  - File upload abuse (RCE via archivo)
  - SSRF (server-side request forgery)
  - Mass assignment (enviar campos extra)
```

---

## 📊 Formato de Entrega

```markdown
## 🔒 Análisis de Seguridad — [Sistema]

### Superficie de Ataque
| Punto de Entrada | Protección | Riesgo |
|-----------------|-----------|--------|
| [endpoint] | [qué tiene] | 🔴🟡🟢 |

### Vulnerabilidades Encontradas
| # | Tipo | Severidad | Descripción | Solución |
|---|------|-----------|------------|---------|
| 1 | [tipo] | 🔴 Crítico | [detalle] | [fix] |

### Recomendaciones de Hardening
1. [recomendación prioritaria]
2. [siguiente recomendación]

### Security Scorecard
| Área | Score | Estado |
|------|-------|--------|
| Auth | X/10 | 🔴🟡🟢 |
| Secrets | X/10 | 🔴🟡🟢 |
| Infra | X/10 | 🔴🟡🟢 |
| Data | X/10 | 🔴🟡🟢 |
```

---

## ⚠️ Reglas

```
1. Si se encuentra una vulnerabilidad CRÍTICA, alertar de inmediato
2. No ejecutar ataques reales — solo análisis conceptual y de código
3. Toda recomendación con prioridad y paso a paso para implementar
4. No generar exploits funcionales — solo describir el vector
5. Principio de defensa en profundidad (múltiples capas)
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

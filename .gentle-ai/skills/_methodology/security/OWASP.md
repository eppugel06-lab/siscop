# 🔒 OWASP Top 10 — Checklist de Seguridad

> **Referencia:** OWASP Top 10:2021  
> **Principio:** Seguridad no es una feature — es una propiedad del sistema.  
> Cada auditoría y cada build deben verificar estos 10 riesgos.

---

## 🛡️ Los 10 Riesgos Críticos

### A01:2021 — Broken Access Control (Control de Acceso Roto)

**Riesgo:** Usuarios acceden a recursos/acciones que no les corresponden.

| Verificación | Check |
|-------------|-------|
| ¿Cada endpoint valida rol/permiso? | ☐ |
| ¿Los IDs de recursos se validan contra el usuario? | ☐ |
| ¿CORS está configurado con whitelist explícita? | ☐ |
| ¿Los tokens expiran en tiempo razonable? | ☐ |
| ¿Se previene escalación de privilegios? | ☐ |
| ¿Las rutas de admin están protegidas en backend (no solo frontend)? | ☐ |

**Mitigación clave:** Deny by default. Todo cerrado hasta que se permita explícitamente.

---

### A02:2021 — Cryptographic Failures (Fallos Criptográficos)

**Riesgo:** Datos sensibles expuestos por cifrado débil o ausente.

| Verificación | Check |
|-------------|-------|
| ¿Contraseñas hasheadas con bcrypt/argon2 (nunca MD5/SHA1)? | ☐ |
| ¿HTTPS obligatorio en producción? | ☐ |
| ¿Datos sensibles cifrados at-rest? | ☐ |
| ¿Claves de cifrado rotadas periódicamente? | ☐ |
| ¿No se loguean datos sensibles (passwords, tokens, PII)? | ☐ |

**Mitigación clave:** TLS 1.2+ obligatorio. Bcrypt con cost ≥ 12. Nunca cifrado propio.

---

### A03:2021 — Injection (Inyección)

**Riesgo:** SQL injection, NoSQL injection, OS command injection, LDAP injection.

| Verificación | Check |
|-------------|-------|
| ¿Se usan queries parametrizados / ORM? | ☐ |
| ¿Se sanitiza todo input del usuario? | ☐ |
| ¿Se escapan outputs en HTML (XSS prevention)? | ☐ |
| ¿No se usa eval() ni funciones de ejecución dinámica? | ☐ |
| ¿Se validan tipos y rangos de datos? | ☐ |

**Mitigación clave:** Nunca concatenar strings en queries. Usar ORM o prepared statements.

---

### A04:2021 — Insecure Design (Diseño Inseguro)

**Riesgo:** Fallos arquitecturales que no se pueden parchear con código.

| Verificación | Check |
|-------------|-------|
| ¿Se hizo threat modeling antes de implementar? | ☐ |
| ¿Hay separación de privilegios en la arquitectura? | ☐ |
| ¿Los flujos críticos tienen rate limiting? | ☐ |
| ¿Hay validación de negocio server-side (no solo frontend)? | ☐ |

**Mitigación clave:** Threat modeling en la fase de diseño. Pensar como atacante.

---

### A05:2021 — Security Misconfiguration (Configuración Insegura)

**Riesgo:** Headers faltantes, debug activo, configuraciones default permisivas.

| Verificación | Check |
|-------------|-------|
| ¿Debug mode desactivado en producción? | ☐ |
| ¿Security headers configurados (CSP, X-Frame, HSTS)? | ☐ |
| ¿Permisos de archivos restrictivos? | ☐ |
| ¿Dependencias actualizadas y sin CVEs conocidos? | ☐ |
| ¿Error messages genéricos (sin stack traces al cliente)? | ☐ |
| ¿Puertos innecesarios cerrados? | ☐ |

**Mitigación clave:** Hardening checklist aplicado en cada deploy.

---

### A06:2021 — Vulnerable & Outdated Components

**Riesgo:** Dependencias con vulnerabilidades conocidas.

| Verificación | Check |
|-------------|-------|
| ¿`npm audit` / `pip-audit` ejecutado sin CVEs críticos? | ☐ |
| ¿Lockfile (`package-lock.json`, `poetry.lock`) en control de versiones? | ☐ |
| ¿No hay dependencias abandonadas (sin updates en 2+ años)? | ☐ |
| ¿Sub-dependencias también auditadas? | ☐ |

**Mitigación clave:** Auditoría de dependencias en CI/CD. Renovate/Dependabot activo.

---

### A07:2021 — Identification and Authentication Failures

**Riesgo:** Auth débil, sesiones predecibles, fuerza bruta posible.

| Verificación | Check |
|-------------|-------|
| ¿Rate limiting en login (máx 5 intentos/min)? | ☐ |
| ¿Tokens con expiración corta (15 min access, 7d refresh)? | ☐ |
| ¿Refresh token rotation implementado? | ☐ |
| ¿MFA disponible para roles administrativos? | ☐ |
| ¿Session invalidation al cambiar password? | ☐ |
| ¿Password policy (mínimo 8 chars, complejidad)? | ☐ |

**Mitigación clave:** Nunca implementar auth propio — usar librerías probadas.

---

### A08:2021 — Software and Data Integrity Failures

**Riesgo:** Code sin verificación, CI/CD inseguro, deserialization attacks.

| Verificación | Check |
|-------------|-------|
| ¿CI/CD pipeline seguro (no ejecuta código de PRs sin review)? | ☐ |
| ¿Verificación de integridad de dependencias (checksums)? | ☐ |
| ¿No se usa `eval()` ni deserialización insegura? | ☐ |
| ¿Las auto-updates están controladas y verificadas? | ☐ |

---

### A09:2021 — Security Logging and Monitoring Failures

**Riesgo:** No detectar ataques por falta de logs/alertas.

| Verificación | Check |
|-------------|-------|
| ¿Se loguean intentos de login fallidos? | ☐ |
| ¿Se loguean cambios en roles/permisos? | ☐ |
| ¿Alertas activas para patrones sospechosos? | ☐ |
| ¿Logs centralizados y con retención definida? | ☐ |
| ¿Los logs no contienen datos sensibles? | ☐ |

---

### A10:2021 — Server-Side Request Forgery (SSRF)

**Riesgo:** El servidor hace requests a URLs controladas por el atacante.

| Verificación | Check |
|-------------|-------|
| ¿Se validan/whitelist URLs antes de hacer requests server-side? | ☐ |
| ¿No se permite acceso a metadata endpoints (169.254.169.254)? | ☐ |
| ¿Se sanitizan URLs recibidas del usuario? | ☐ |

---

## 📋 Security Headers Obligatorios

```
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0  (deprecated, usar CSP)
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

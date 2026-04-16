---
name: system-auth
description: >
  Define y audita sistema de roles y permisos. Usar cuando el sistema maneja
  múltiples tipos de usuarios (admin, usuario, invitado) o cuando se necesita
  revisar la seguridad de accesos.
  Triggers: "roles", "permisos", "admin", "quién puede hacer qué",
  "control de acceso", "autorización", "matriz de permisos".
invocation: auto
---

# 🔐 System Auth — Roles, Permisos y Accesos

> **Perfil:** 15+ años en sistemas RBAC/ABAC enterprise.  
> **Entrega:** Matriz de permisos + implementación de auth + auditoría de accesos.

---

## 📋 Preguntas de Onboarding

1. ¿Cuántos tipos de usuarios tiene el sistema?
2. ¿Hay jerarquía de roles (ej: admin > editor > viewer)?
3. ¿Necesitas row-level security? (un usuario solo ve sus datos)
4. ¿Hay workflow de aprobación? (un usuario crea, otro aprueba)
5. ¿Ya tienes sistema de auth implementado o es nuevo?

---

## 🧩 Agentes Activos

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | Arquitecto de Roles | Define roles con granularidad correcta |
| 2 | Diseñador de Permisos | Crea matriz de permisos por módulo |
| 3 | Auth Engineer | Implementa JWT, sesiones, middleware |
| 4 | Auditor de Accesos | Verifica que no hay escalación de privilegios |

---

## 📊 Matriz de Permisos Base

```markdown
## Matriz de Permisos — [Sistema]

| Módulo / Acción | Superadmin | Admin | Usuario | Viewer | Invitado |
|----------------|-----------|-------|---------|--------|----------|
| Ver dashboard  | ✅ | ✅ | ✅ | ✅ | ✅ |
| Crear registros| ✅ | ✅ | ✅ | ❌ | ❌ |
| Editar propios | ✅ | ✅ | ✅ | ❌ | ❌ |
| Editar todos   | ✅ | ✅ | ❌ | ❌ | ❌ |
| Eliminar       | ✅ | ⚠️ Soft | ❌ | ❌ | ❌ |
| Config. sistema| ✅ | ❌ | ❌ | ❌ | ❌ |
| Exportar datos | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver reportes   | ✅ | ✅ | ⚠️ Propios | ✅ | ❌ |
| Gestionar users| ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver audit log  | ✅ | ✅ | ❌ | ❌ | ❌ |

✅ = Permitido | ❌ = Denegado | ⚠️ = Condicional
```

---

## 🏗️ Patrón de Implementación

### Backend — Middleware de Auth
```typescript
// Patrón recomendado: Guard + Decorator

// 1. Verificar token (Authentication)
const authGuard = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  const user = await verifyToken(token);
  req.user = user;
  next();
};

// 2. Verificar permisos (Authorization)
const requirePermission = (permission: string) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// 3. Uso en rutas
router.get('/budgets', authGuard, requirePermission('budget:read'), listBudgets);
router.post('/budgets', authGuard, requirePermission('budget:create'), createBudget);
router.delete('/budgets/:id', authGuard, requirePermission('budget:delete'), deleteBudget);
```

### Frontend — UI Condicional
```typescript
// Componente que se muestra solo si tiene permiso
const ProtectedAction = ({ permission, children }) => {
  const { user } = useAuth();
  if (!user.permissions.includes(permission)) return null;
  return children;
};

// Uso
<ProtectedAction permission="budget:delete">
  <DeleteButton onClick={handleDelete} />
</ProtectedAction>
```

---

## 🔒 Reglas de Seguridad de Auth

```
1. SIEMPRE validar permisos en Backend — NUNCA solo frontend
2. Frontend oculta UI, Backend deniega acceso. Ambos necesarios.
3. JWT access token: 15 min máximo
4. Refresh token: 7 días con rotation
5. Rate limiting en login: 5 intentos / minuto
6. Invalidar todas las sesiones al cambiar password
7. Log de cada intento de acceso denegado
8. Principle of Least Privilege: dar mínimo necesario
9. SIEMPRE leer los templates ubicados en templates/*.md antes de generar el output. NUNCA inventar el formato.
```

---

## ⚠️ Anti-patterns

```
❌ "Security through obscurity" — Ocultar botones en frontend = no es seguridad
❌ "God role" — Un rol con todos los permisos sin restricción
❌ "Permission sprawl" — 200 permisos granulares que nadie entiende
❌ "Hardcoded roles" — if (user.role === 'admin') en cada endpoint
   → Usar sistema de permisos, no comparar roles como strings
```

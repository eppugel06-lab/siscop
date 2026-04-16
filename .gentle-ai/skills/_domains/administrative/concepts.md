# 📚 Conceptos del Dominio — Administrativo

> **Bounded Context:** Panel Administrativo y Gestión Operativa  
> **Ubiquitous Language:** Vocabulario estándar para el módulo administrativo  
> que gestiona usuarios, configuración del sistema y operaciones internas.

---

## 🏗️ Entidades Principales

### Usuario (User) — Aggregate Root
```
Persona que accede al sistema con credenciales y permisos asignados.

Atributos:
  - id: UUID (inmutable)
  - email: Email (único, login principal)
  - nombre: string
  - apellido: string
  - avatar: URL (opcional)
  - rol: UserRole (enum)
  - estado: UserStatus (enum)
  - último_acceso: datetime
  - preferencias: UserPreferences (value object)
  - created_at: datetime
  - updated_at: datetime
```

### Organización (Organization) — Aggregate Root
```
Entidad empresarial que agrupa usuarios, configuraciones y datos.
Multi-tenant: cada organización tiene su espacio aislado.

Atributos:
  - id: UUID
  - nombre: string
  - slug: string (único, para URLs)
  - logo: URL (opcional)
  - plan: SubscriptionPlan (enum)
  - configuración: OrganizationConfig (value object)
  - activa: boolean
  - created_at: datetime
```

### Rol (Role) — Entity
```
Define el conjunto de permisos que un usuario tiene en el sistema.

Roles predefinidos:
  - SUPERADMIN: acceso total, gestión de organizaciones
  - ADMIN: gestión de usuarios y configuración de su organización
  - USER: operaciones estándar dentro de sus permisos
  - VIEWER: solo lectura
  - GUEST: acceso limitado sin autenticación (si aplica)
```

### Permiso (Permission) — Value Object
```
Capacidad específica asignada a un rol.

Formato: {módulo}:{acción}
Ejemplos:
  - budget:create
  - budget:read
  - budget:update
  - budget:delete
  - user:manage
  - settings:configure
  - reports:export
```

### Sesión (Session) — Entity
```
Conexión activa de un usuario al sistema.

Atributos:
  - id: UUID
  - user_id: referencia a User
  - token: string (JWT o session ID)
  - ip: string
  - user_agent: string
  - created_at: datetime
  - expires_at: datetime
  - activa: boolean
```

---

## 💎 Value Objects

### UserPreferences
```
Preferencias personales del usuario (inmutable, se reemplaza completo).
  - idioma: Language (es, en, pt)
  - tema: Theme (light, dark, system)
  - zona_horaria: string (America/Mexico_City)
  - formato_fecha: string (DD/MM/YYYY, MM/DD/YYYY)
  - formato_moneda: Currency (MXN, USD)
  - notificaciones_email: boolean
  - items_por_página: integer (10, 20, 50, 100)
```

### OrganizationConfig
```
Configuración global de la organización.
  - moneda_default: Currency
  - tasa_impuesto_default: Percentage
  - logo_url: string
  - colores_marca: BrandColors (primary, secondary, accent)
  - formato_código_presupuesto: string (default: "PRES-{YYYY}-{NNNN}")
  - días_vigencia_default: integer (default: 30)
  - requiere_aprobación: boolean (workflow de aprobación)
```

### AuditEntry
```
Registro de auditoría para cambios en el sistema.
  - id: UUID
  - usuario: referencia a User
  - acción: string (CREATE, UPDATE, DELETE, LOGIN, LOGOUT)
  - entidad: string (Budget, User, Client)
  - entidad_id: string
  - cambios: JSON (before/after)
  - ip: string
  - timestamp: datetime
```

---

## 🔄 Estados del Usuario (UserStatus)

```
  PENDING → usuario registrado, esperando verificación de email
  ACTIVE  → usuario verificado y operativo
  SUSPENDED → usuario suspendido por admin (no puede acceder)
  INACTIVE → usuario que no ha accedido en 90+ días
  DELETED → soft-delete (datos preservados, acceso revocado)
```

**Transiciones válidas:**
| Desde | Hacia | Acción |
|-------|-------|--------|
| PENDING | ACTIVE | Verificar email |
| ACTIVE | SUSPENDED | Admin suspende |
| SUSPENDED | ACTIVE | Admin reactiva |
| ACTIVE | INACTIVE | Automático (90 días sin acceso) |
| INACTIVE | ACTIVE | Login exitoso |
| Cualquiera | DELETED | Admin elimina (soft) |

---

## 📊 Domain Events del Administrativo

```
UserRegistered       → Nuevo usuario creado
UserVerified         → Email verificado
UserLoggedIn         → Login exitoso
UserLoggedOut        → Logout
UserSuspended        → Admin suspendió usuario
UserReactivated      → Admin reactivó usuario
UserRoleChanged      → Cambio de rol
UserDeleted          → Soft-delete de usuario
OrganizationCreated  → Nueva organización
SettingsUpdated      → Configuración modificada
PermissionGranted    → Permiso asignado
PermissionRevoked    → Permiso revocado
```

---

## 📋 Módulos del Panel Administrativo

| Módulo | Descripción | Roles con acceso |
|--------|------------|------------------|
| **Dashboard** | KPIs, métricas, resumen | Todos |
| **Usuarios** | CRUD de usuarios, roles, permisos | Admin, Superadmin |
| **Clientes** | Gestión de clientes | Admin, User |
| **Configuración** | Settings de organización | Admin, Superadmin |
| **Auditoría** | Logs de actividad | Admin, Superadmin |
| **Reportes** | Reportes y exportación | Admin, User (limitado) |
| **Facturación** | Plan, suscripción, pagos | Superadmin |

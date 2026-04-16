# Matriz de Permisos — [Sistema]

## Roles del Sistema

| Rol | Descripción | Nivel |
|-----|------------|-------|
| **Superadmin** | Acceso total, gestión de organizaciones | Máximo |
| **Admin** | Gestión de usuarios y configuración | Alto |
| **Usuario** | Operaciones estándar | Normal |
| **Viewer** | Solo lectura | Bajo |
| **Invitado** | Acceso limitado sin auth | Mínimo |

---

## Permisos por Módulo

### Módulo: [Nombre del Módulo]

| Acción | Superadmin | Admin | Usuario | Viewer | Invitado |
|--------|-----------|-------|---------|--------|----------|
| Ver listado | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver detalle | ✅ | ✅ | ✅ | ✅ | ❌ |
| Crear | ✅ | ✅ | ✅ | ❌ | ❌ |
| Editar propios | ✅ | ✅ | ✅ | ❌ | ❌ |
| Editar todos | ✅ | ✅ | ❌ | ❌ | ❌ |
| Eliminar | ✅ | ⚠️ Soft-delete | ❌ | ❌ | ❌ |
| Exportar | ✅ | ✅ | ❌ | ❌ | ❌ |

### Módulo: Gestión de Usuarios

| Acción | Superadmin | Admin | Usuario | Viewer | Invitado |
|--------|-----------|-------|---------|--------|----------|
| Ver usuarios | ✅ | ✅ | ❌ | ❌ | ❌ |
| Crear usuario | ✅ | ✅ | ❌ | ❌ | ❌ |
| Asignar roles | ✅ | ⚠️ No puede Superadmin | ❌ | ❌ | ❌ |
| Suspender | ✅ | ✅ | ❌ | ❌ | ❌ |
| Eliminar | ✅ | ❌ | ❌ | ❌ | ❌ |

### Módulo: Configuración

| Acción | Superadmin | Admin | Usuario | Viewer | Invitado |
|--------|-----------|-------|---------|--------|----------|
| Ver config | ✅ | ✅ | ❌ | ❌ | ❌ |
| Modificar config | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ver audit log | ✅ | ✅ | ❌ | ❌ | ❌ |
| Exportar audit | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## Leyenda

| Símbolo | Significado |
|---------|------------|
| ✅ | Permitido sin restricción |
| ❌ | Denegado |
| ⚠️ | Permitido con condiciones (ver nota) |

---

## Notas de Implementación

```
1. Los permisos se validan en BACKEND — frontend solo oculta UI
2. Deny by default — todo cerrado hasta que se permita
3. Row-level security: usuarios ven solo sus propios datos
4. Admin no puede asignar rol superior al suyo
5. Superadmin no puede eliminarse a sí mismo
6. Toda acción de admin queda en audit log
```

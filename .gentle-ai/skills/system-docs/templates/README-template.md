# [Nombre del Proyecto]

[Descripción en 1-2 líneas — qué hace el sistema y para quién]

## 🚀 Quick Start

```bash
# Clonar el repositorio
git clone [url]
cd [proyecto]

# Instalar dependencias
[comando de instalación]

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Levantar servicios (BD, Cache, etc.)
docker-compose up -d

# Ejecutar el proyecto
[comando de dev server]

# Abrir en el navegador
open http://localhost:[puerto]
```

## 📋 Requisitos

| Requisito | Versión Mínima |
|-----------|---------------|
| Node.js | 20 LTS |
| PostgreSQL | 15+ |
| Redis | 7+ |
| Docker | 24+ |

## 🛠️ Instalación Detallada

### 1. Base de datos
```bash
# Con Docker
docker-compose up -d db

# O local
createdb [nombre_bd]
```

### 2. Dependencias
```bash
[comando de instalación]
```

### 3. Migraciones
```bash
[comando de migraciones]
```

### 4. Seed (datos iniciales)
```bash
[comando de seed]
```

## 🔧 Variables de Entorno

| Variable | Descripción | Ejemplo | Requerida |
|----------|------------|---------|-----------|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/db` | ✅ |
| `REDIS_URL` | Conexión a Redis | `redis://localhost:6379` | ✅ |
| `JWT_SECRET` | Secret para tokens | `openssl rand -hex 32` | ✅ |
| `PORT` | Puerto del servidor | `8000` | ❌ (default: 8000) |

## 📂 Estructura del Proyecto

```
src/
├── domain/          ← Entidades y reglas de negocio
├── application/     ← Casos de uso
├── infrastructure/  ← BD, APIs externas, cache
└── presentation/    ← Routes, controllers, UI
```

## 🧪 Tests

```bash
# Ejecutar todos los tests
[comando de tests]

# Ejecutar con cobertura
[comando de cobertura]

# Ejecutar solo unit tests
[comando unit]

# Ejecutar solo E2E
[comando e2e]
```

## 🚀 Deploy

```bash
# Build de producción
[comando de build]

# Deploy
[comando de deploy]
```

## 📝 Convenciones

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/)
- **Branches:** `feature/*`, `fix/*`, `chore/*`
- **PRs:** Requieren 1+ review antes de merge

## 📄 Licencia

[Tipo de licencia]

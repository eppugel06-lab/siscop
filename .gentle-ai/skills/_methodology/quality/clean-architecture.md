# 🏛️ Clean Architecture

> **Principio:** La lógica de negocio es el centro del sistema.  
> Frameworks, bases de datos y UIs son detalles reemplazables.

---

## 🎯 ¿Qué es Clean Architecture?

Es una estructura de capas concéntricas donde las dependencias SIEMPRE apuntan hacia adentro (hacia las reglas de negocio). Las capas externas pueden cambiar sin afectar las internas.

---

## 🔄 Capas (de adentro hacia afuera)

```
┌─────────────────────────────────────────────────────┐
│                   INFRAESTRUCTURA                   │
│  (Frameworks, BD, APIs externas, UI, Drivers)       │
│  ┌─────────────────────────────────────────────┐    │
│  │              ADAPTADORES                     │    │
│  │  (Controllers, Gateways, Presenters, Repos) │    │
│  │  ┌─────────────────────────────────────┐    │    │
│  │  │          CASOS DE USO               │    │    │
│  │  │  (Application Services, Interactors) │    │    │
│  │  │  ┌─────────────────────────────┐    │    │    │
│  │  │  │        ENTIDADES            │    │    │    │
│  │  │  │  (Domain Models, Rules,     │    │    │    │
│  │  │  │   Value Objects, Events)    │    │    │    │
│  │  │  └─────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘

Regla de Dependencia: → SIEMPRE apunta hacia adentro ←
```

---

## 📂 Estructura de Carpetas (Ejemplo Next.js + FastAPI)

### Frontend (Next.js)
```
src/
├── domain/              ← Entidades y reglas (CAPA INTERNA)
│   ├── entities/
│   │   ├── Order.ts
│   │   └── User.ts
│   ├── value-objects/
│   │   ├── Money.ts
│   │   └── Email.ts
│   └── events/
│       └── OrderCreated.ts
│
├── application/         ← Casos de uso (CAPA MEDIA)
│   ├── use-cases/
│   │   ├── CreateOrder.ts
│   │   └── GetUserOrders.ts
│   └── ports/           ← Interfaces (contratos)
│       ├── OrderRepository.ts
│       └── PaymentGateway.ts
│
├── infrastructure/      ← Implementaciones concretas (CAPA EXTERNA)
│   ├── repositories/
│   │   └── PrismaOrderRepository.ts
│   ├── gateways/
│   │   └── StripePaymentGateway.ts
│   └── api/
│       └── orderApi.ts
│
└── presentation/        ← UI (CAPA MÁS EXTERNA)
    ├── components/
    ├── pages/
    └── hooks/
```

### Backend (FastAPI)
```
app/
├── domain/
│   ├── models/
│   │   ├── order.py
│   │   └── user.py
│   ├── value_objects/
│   │   └── money.py
│   ├── events/
│   │   └── order_created.py
│   └── services/
│       └── price_calculator.py
│
├── application/
│   ├── use_cases/
│   │   ├── create_order.py
│   │   └── get_user_orders.py
│   └── ports/
│       ├── order_repository.py   ← Interface (ABC)
│       └── payment_gateway.py
│
├── infrastructure/
│   ├── persistence/
│   │   └── sqlalchemy_order_repo.py
│   ├── external/
│   │   └── stripe_gateway.py
│   └── config/
│       └── database.py
│
└── presentation/
    ├── api/
    │   └── routes/
    │       └── orders.py
    └── schemas/
        └── order_schema.py
```

---

## 📋 Regla de Dependencias por Capa

| Capa | Puede depender de | NO puede depender de |
|------|--------------------|----------------------|
| **Entidades** | Nada (solo primitivos del lenguaje) | Application, Infrastructure, Presentation |
| **Application** | Entidades, Ports (interfaces) | Infrastructure, Presentation |
| **Infrastructure** | Application (ports), Entidades | Presentation |
| **Presentation** | Application (use cases) | Infrastructure directamente |

---

## 🎯 Ports & Adapters (Hexagonal)

```
Los "Ports" son interfaces definidas en la capa de Application.
Los "Adapters" son implementaciones concretas en Infrastructure.

Port (contrato):
  interface OrderRepository {
    findById(id: string): Promise<Order>
    save(order: Order): Promise<void>
  }

Adapter (implementación):
  class PrismaOrderRepository implements OrderRepository {
    async findById(id: string) { return prisma.order.findUnique({ where: { id } }); }
    async save(order: Order) { await prisma.order.create({ data: order }); }
  }

Beneficio: Puedes cambiar Prisma por Drizzle o TypeORM
           sin tocar ningún caso de uso ni entidad.
```

---

## ✅ Checklist Clean Architecture

- [ ] Las entidades NO importan nada de frameworks externos
- [ ] Los casos de uso dependen de interfaces (ports), no de implementaciones
- [ ] Los controladores/routes son thin — solo mapean HTTP a use cases
- [ ] La BD se puede cambiar sin modificar reglas de negocio
- [ ] Los tests unitarios de entidades no requieren BD ni HTTP
- [ ] Cada capa tiene su propia nomenclatura de errores/excepciones
- [ ] No hay imports de `prisma`, `express`, `fastapi` en la carpeta `domain/`

---

## 🚫 Anti-patterns

```
❌ "Fat Controller" — Toda la lógica en el controller/route
   → El controller solo recibe, valida input, llama use case, y responde

❌ "Anemic Domain" — Entidades sin lógica, todo en servicios
   → Las entidades contienen reglas de negocio

❌ "Leaky Abstraction" — ORM entities como domain entities
   → Separar: PrismaOrder (infra) ≠ Order (domain)

❌ "Framework Coupling" — Decoradores de framework en el domain
   → El domain es TypeScript/Python puro, sin decoradores de Nest/FastAPI
```

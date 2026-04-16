# 🧩 DDD — Domain Driven Design

> **Principio:** El software modela el negocio, no al revés.  
> El código debe hablar el idioma del dominio.

---

## 🎯 ¿Qué es DDD?

Domain Driven Design es la disciplina de construir software cuya estructura y lenguaje reflejan directamente el dominio de negocio. No es un framework — es una forma de pensar y modelar.

---

## 📊 Conceptos Clave (Building Blocks)

### Ubiquitous Language (Lenguaje Ubicuo)
```
Un ÚNICO vocabulario compartido entre negocio y desarrollo.
Si el negocio dice "Pedido", el código dice "Order", no "Request" ni "Transaction".
Si el negocio dice "Presupuesto", el código dice "Budget", no "Quote" ni "Estimate".

→ Se documenta en: _domains/[dominio]/concepts.md
→ Se valida en: _domains/[dominio]/glossary.md
```

### Bounded Context (Contexto Delimitado)
```
Cada dominio tiene fronteras claras donde el lenguaje tiene significado específico.

Ejemplo:
- En el contexto "Ventas": "Cliente" = quien compra
- En el contexto "Soporte": "Cliente" = quien reporta un problema
- En el contexto "Facturación": "Cliente" = quien paga

Cada contexto tiene su propio modelo, su propia BD (idealmente), y su propia API.
```

### Aggregates (Agregados)
```
Cluster de entidades que se tratan como una unidad para cambios de datos.
Tiene un ROOT ENTITY que controla el acceso.

Reglas:
1. Las referencias externas solo apuntan al aggregate root
2. Las invariantes de negocio se validan dentro del aggregate
3. Un solo aggregate por transacción
4. Eliminación en cascada dentro del aggregate

Ejemplo:
Order (root)
├── OrderItem
├── OrderDiscount
└── OrderNote

Si modificas un OrderItem, lo haces a través de Order.
```

### Entities vs Value Objects
| Concepto | Identidad | Mutabilidad | Ejemplo |
|----------|-----------|-------------|---------|
| **Entity** | Tiene ID único | Mutable | User, Order, Product |
| **Value Object** | Se compara por valor | Inmutable | Money, Address, DateRange |

### Domain Events
```
Hechos que ya ocurrieron en el dominio y que otros contextos podrían necesitar.

Nomenclatura: [Entidad][PastTense]
  - OrderCreated
  - PaymentProcessed
  - UserRegistered
  - InventoryDepleted

Regla: Los eventos son inmutables. Una vez emitidos, no se modifican.
```

### Domain Services
```
Lógica que no pertenece a ninguna entidad específica pero sí al dominio.

Ejemplo:
- PriceCalculator → calcula precio con descuentos, impuestos, reglas
- ShippingCostCalculator → depende de peso, destino, carrier
- AvailabilityChecker → cruza inventario + reservas + límites

No son services de infraestructura — son reglas de negocio puras.
```

---

## 🗂️ Estructura en el Sistema de Skills

```
_domains/
├── [dominio]/
│   ├── concepts.md      → Ubiquitous Language (entidades, value objects)
│   ├── rules.md         → Invariantes y reglas de negocio
│   ├── agents.md        → Agentes especializados del dominio
│   ├── glossary.md      → Glosario completo de términos
│   ├── constraints.md   → Restricciones y prohibiciones
│   └── references/      → Fuentes de conocimiento procesadas
```

---

## 📋 Checklist DDD para Nuevos Dominios

- [ ] Ubiquitous language documentado en `concepts.md`
- [ ] Bounded contexts identificados con fronteras claras
- [ ] Aggregates definidos con root entities
- [ ] Invariantes del dominio listadas en `rules.md`
- [ ] Domain events definidos con nomenclatura correcta
- [ ] Value objects identificados (inmutables, sin ID)
- [ ] Glosario validado con el usuario/domain expert
- [ ] Anti-corruption layers definidos entre contextos

---

## 🚫 Anti-patterns DDD

```
❌ "Anemic Domain Model" — Entidades que solo tienen getters/setters sin lógica
   → Las entidades DEBEN contener su lógica de negocio

❌ "Smart Service, Dumb Entity" — Toda la lógica en servicios
   → Los servicios son para lógica que cruza entidades, no para reemplazarlas

❌ "God Aggregate" — Un aggregate con 20 entidades dentro
   → Si es muy grande, probablemente son 2+ aggregates

❌ "Shared Database" — Dos bounded contexts compartiendo tablas
   → Cada contexto debe poder evolucionar su modelo independientemente

❌ "Technical Language in Domain" — Usar "Record" en vez de "Presupuesto"
   → El código debe hablar el idioma del negocio, no del framework
```

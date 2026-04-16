# 🏗️ Principios SOLID

> **Principio:** 5 reglas fundamentales de diseño orientado a objetos  
> que producen código mantenible, extensible y testeable.

---

## S — Single Responsibility Principle (Responsabilidad Única)

> **Una clase/módulo tiene una sola razón para cambiar.**

```typescript
// ❌ VIOLA SRP — UserService hace todo
class UserService {
  createUser(data) { ... }
  sendWelcomeEmail(user) { ... }      // ← Responsabilidad de EmailService
  generateInvoice(user) { ... }       // ← Responsabilidad de InvoiceService
  validatePassword(password) { ... }  // ← Responsabilidad de AuthService
}

// ✅ CUMPLE SRP — Cada clase una responsabilidad
class UserService { createUser(data) { ... } }
class EmailService { sendWelcomeEmail(user) { ... } }
class InvoiceService { generateInvoice(user) { ... } }
class AuthService { validatePassword(password) { ... } }
```

**Pregunta clave:** "¿Si cambio X, debería tocar esta clase?" Si la respuesta es NO, viola SRP.

---

## O — Open/Closed Principle (Abierto/Cerrado)

> **Abierto para extensión, cerrado para modificación.**

```typescript
// ❌ VIOLA OCP — Modificar cada vez que hay nuevo descuento
function calculateDiscount(type: string, amount: number) {
  if (type === 'seasonal') return amount * 0.1;
  if (type === 'loyalty') return amount * 0.15;
  if (type === 'blackfriday') return amount * 0.3; // ← Hay que modificar
}

// ✅ CUMPLE OCP — Nuevos descuentos sin modificar código existente
interface DiscountStrategy {
  calculate(amount: number): number;
}

class SeasonalDiscount implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.1; }
}

class LoyaltyDiscount implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.15; }
}

// Agregar nuevo descuento = nueva clase, cero modificaciones
class BlackFridayDiscount implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.3; }
}
```

---

## L — Liskov Substitution Principle (Sustitución de Liskov)

> **Las subclases deben ser intercambiables con su clase base sin romper el programa.**

```typescript
// ❌ VIOLA LSP — ReadOnlyFile rompe el contrato de File
class File {
  read() { return this.content; }
  write(data: string) { this.content = data; }
}

class ReadOnlyFile extends File {
  write(data: string) { throw new Error('No se puede escribir'); } // ← Rompe LSP
}

// ✅ CUMPLE LSP — Interfaces separadas
interface Readable { read(): string; }
interface Writable { write(data: string): void; }

class RegularFile implements Readable, Writable { ... }
class ReadOnlyFile implements Readable { ... }  // ← Solo lo que cumple
```

---

## I — Interface Segregation Principle (Segregación de Interfaces)

> **Ningún cliente debe depender de métodos que no usa.**

```typescript
// ❌ VIOLA ISP — Printer obliga a implementar scan y fax
interface MultiFunctionDevice {
  print(doc: Document): void;
  scan(doc: Document): void;
  fax(doc: Document): void;
}

// SimplePrinter se ve obligada a implementar métodos que no tiene
class SimplePrinter implements MultiFunctionDevice {
  print(doc) { ... }
  scan(doc) { throw new Error('No soportado'); }  // ← Violación
  fax(doc) { throw new Error('No soportado'); }   // ← Violación
}

// ✅ CUMPLE ISP — Interfaces granulares
interface Printer { print(doc: Document): void; }
interface Scanner { scan(doc: Document): void; }
interface Fax { fax(doc: Document): void; }

class SimplePrinter implements Printer { print(doc) { ... } }
class OfficeMachine implements Printer, Scanner, Fax { ... }
```

---

## D — Dependency Inversion Principle (Inversión de Dependencias)

> **Los módulos de alto nivel no dependen de los de bajo nivel.  
> Ambos dependen de abstracciones.**

```typescript
// ❌ VIOLA DIP — OrderService depende directamente de MySQLDatabase
class OrderService {
  private db = new MySQLDatabase(); // ← Acoplamiento directo

  getOrders() {
    return this.db.query('SELECT * FROM orders');
  }
}

// ✅ CUMPLE DIP — Depende de abstracción, inyectada desde fuera
interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  save(order: Order): Promise<void>;
}

class OrderService {
  constructor(private repo: OrderRepository) {} // ← Inyección

  getOrders() {
    return this.repo.findAll();
  }
}

// La implementación concreta se inyecta desde fuera
class MySQLOrderRepository implements OrderRepository { ... }
class PostgresOrderRepository implements OrderRepository { ... }
class InMemoryOrderRepository implements OrderRepository { ... } // ← Para tests
```

---

## 📋 Checklist SOLID por Code Review

| Principio | Pregunta | Si la respuesta es SÍ → |
|-----------|----------|--------------------------|
| **S** | ¿Esta clase tiene más de 1 razón para cambiar? | Dividir responsabilidades |
| **O** | ¿Debo modificar código existente para agregar funcionalidad? | Usar estrategias/plugins |
| **L** | ¿Una subclase lanza excepciones que la base no define? | Revisar herencia |
| **I** | ¿Alguna clase implementa métodos vacíos o con throw? | Segregar interfaces |
| **D** | ¿Alguna clase instancia directamente sus dependencias? | Inyectar dependencias |

---

## 🚫 Anti-pattern: SOLID Excesivo

```
⚠️ SOLID no es ley absoluta — aplicar con criterio:

- No crear 20 interfaces para 3 clases → Over-engineering
- No segregar interfaces de 1 solo método si no hay múltiples consumidores
- No invertir dependencias en scripts de 50 líneas
- SOLID brilla en sistemas que crecen y cambian. En prototipos, pragmatismo primero.

Regla: Si el equipo necesita leer 10 archivos para entender 1 feature,
       se pasaron de SOLID.
```

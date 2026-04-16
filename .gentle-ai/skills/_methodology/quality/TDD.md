# 🧪 TDD — Test Driven Development

> **Principio:** Primero el test, luego el código. El test define el comportamiento esperado  
> antes de que exista la implementación. Código sin tests no es código — es un borrador.

---

## 🎯 ¿Qué es TDD?

Test Driven Development es la disciplina de escribir un test que falla **antes** de escribir el código que lo haga pasar. No es "escribir tests" — es usar tests como herramienta de diseño.

---

## 🔄 Ciclo Red-Green-Refactor

```
┌─────────────────────────────────────────┐
│                                         │
│    🔴 RED — Escribir test que falla     │
│         │                               │
│         ▼                               │
│    🟢 GREEN — Código mínimo para pasar  │
│         │                               │
│         ▼                               │
│    🔵 REFACTOR — Limpiar sin romper     │
│         │                               │
│         └────────── repetir ────────────┘
│                                         │
└─────────────────────────────────────────┘
```

### Reglas del Ciclo
1. **No escribir código de producción sin un test que falle primero**
2. **Escribir solo el test mínimo necesario para fallar** (no todo el test suite)
3. **Escribir solo el código mínimo necesario para pasar** (no la solución completa)
4. **Refactorizar solo cuando todos los tests pasan**

---

## 📊 Tipos de Tests (Pirámide)

```
         ┌───────┐
         │  E2E  │  ← Pocos, lentos, costosos (Playwright)
         │ tests │     Validan flujos completos de usuario
        ┌┴───────┴┐
        │ Integra-│  ← Moderados (API tests, DB tests)
        │  ción   │     Validan interacción entre componentes
       ┌┴─────────┴┐
       │  Unitarios │  ← Muchos, rápidos, baratos (Vitest/Jest)
       │   tests    │     Validan funciones individuales
       └────────────┘
```

| Tipo | Cantidad | Velocidad | Qué valida | Herramienta |
|------|----------|-----------|------------|-------------|
| **Unit** | ~70% | < 1ms c/u | Función aislada | Vitest, Jest |
| **Integración** | ~20% | < 1s c/u | Módulos conectados | Supertest, TestContainers |
| **E2E** | ~10% | < 30s c/u | Flujo completo | Playwright, Cypress |

---

## 📋 Convenciones de Tests

### Nomenclatura
```typescript
// Patrón: describe('[Módulo]') > it('[debería] [comportamiento] [cuando] [condición]')

describe('PriceCalculator', () => {
  it('debería aplicar descuento del 10% cuando el total supera $100', () => { ... });
  it('debería rechazar cantidades negativas', () => { ... });
  it('debería redondear a 2 decimales', () => { ... });
});
```

### Estructura AAA (Arrange-Act-Assert)
```typescript
it('debería calcular el precio con descuento', () => {
  // Arrange — preparar datos
  const calculator = new PriceCalculator();
  const items = [{ price: 50, quantity: 3 }];

  // Act — ejecutar acción
  const total = calculator.calculate(items, { discount: 10 });

  // Assert — verificar resultado
  expect(total).toBe(135);
});
```

### Organización de Archivos
```
src/
├── services/
│   ├── price-calculator.ts
│   └── price-calculator.test.ts    ← Co-ubicado
├── utils/
│   ├── format-currency.ts
│   └── format-currency.test.ts     ← Co-ubicado
tests/
├── integration/
│   └── api/
│       └── orders.test.ts          ← Integración separada
└── e2e/
    └── checkout-flow.spec.ts       ← E2E separado
```

---

## 🎯 Métricas de Cobertura

| Métrica | Target Mínimo | Ideal |
|---------|---------------|-------|
| Cobertura de líneas | 80% | 90%+ |
| Cobertura de ramas | 75% | 85%+ |
| Cobertura de funciones | 85% | 95%+ |
| Tests críticos (auth, pagos) | 95% | 100% |

**Regla:** La cobertura alta sin tests significativos es peor que cobertura baja con tests bien diseñados. Priorizar calidad sobre número.

---

## 🚫 Anti-patterns de Testing

```
❌ "Ice cream cone" — Muchos E2E, pocos unitarios
   → Invertir la pirámide: muchos unitarios, pocos E2E

❌ "Test de implementación" — Testear CÓMO funciona en vez de QUÉ hace
   → Testear comportamiento observable, no detalles internos

❌ "Tests frágiles" — Se rompen con cambios que no afectan el comportamiento
   → Usar mocks con moderación, preferir fakes y stubs

❌ "Tests lentos" — Suite que tarda 30+ minutos
   → Unit tests < 10 segundos, toda la suite < 5 minutos

❌ "Tests comentados" — Tests deshabilitados porque fallan
   → Si falla, arréglalo o elimínalo. Jamás commentear
```

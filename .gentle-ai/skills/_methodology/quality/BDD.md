# 🥒 BDD — Behavior Driven Development

> **Principio:** Las especificaciones escritas en lenguaje natural son los tests.  
> El negocio define el comportamiento esperado, el código lo verifica.

---

## 🎯 ¿Qué es BDD?

Behavior Driven Development extiende TDD usando escenarios escritos en lenguaje natural (Gherkin) que tanto el negocio como los desarrolladores entienden. El escenario ES el test — no una traducción del test.

---

## 📋 Formato Gherkin

```gherkin
Feature: [Nombre de la funcionalidad]
  Como [actor/rol]
  Quiero [acción]
  Para [beneficio de negocio]

  Scenario: [Nombre del escenario - caso feliz]
    Given [estado inicial del sistema]
    And [condición adicional]
    When [acción del usuario]
    And [acción adicional]
    Then [resultado esperado]
    And [verificación adicional]

  Scenario: [Nombre del escenario - caso de error]
    Given [estado inicial]
    When [acción que falla]
    Then [mensaje de error esperado]
    And [estado del sistema no cambia]
```

---

## 📊 Ejemplo Completo

```gherkin
Feature: Crear Presupuesto
  Como administrador del sistema
  Quiero crear un presupuesto con partidas detalladas
  Para presentar una cotización profesional al cliente

  Background:
    Given que estoy autenticado como "admin"
    And que existe el cliente "Empresa XYZ"

  Scenario: Crear presupuesto con partidas válidas
    Given que estoy en la pantalla de nuevo presupuesto
    When selecciono el cliente "Empresa XYZ"
    And agrego una partida con descripción "Desarrollo web" y monto 5000
    And agrego una partida con descripción "Diseño UI/UX" y monto 2000
    And presiono "Guardar presupuesto"
    Then el sistema crea el presupuesto con total 7000
    And el estado es "Borrador"
    And se muestra el mensaje "Presupuesto creado exitosamente"

  Scenario: Rechazar presupuesto sin partidas
    Given que estoy en la pantalla de nuevo presupuesto
    When selecciono el cliente "Empresa XYZ"
    And presiono "Guardar presupuesto" sin agregar partidas
    Then el sistema muestra error "Debe agregar al menos una partida"
    And no se crea ningún presupuesto

  Scenario Outline: Validar montos de partidas
    Given que estoy creando un presupuesto
    When agrego una partida con monto <monto>
    Then el sistema <resultado>

    Examples:
      | monto  | resultado                              |
      | 100    | acepta la partida                      |
      | 0      | muestra error "El monto debe ser mayor a 0" |
      | -50    | muestra error "El monto debe ser mayor a 0" |
      | 999999 | acepta la partida                      |
```

---

## 🔗 Relación BDD ↔ Pipeline SDD

```
REQ-F-001 (Crear Presupuesto)
    │
    ├── UC-001 (Caso de uso: Crear Presupuesto)
    │       │
    │       └── BDD-UC-001 (Escenarios Gherkin)
    │               ├── Scenario: caso feliz
    │               ├── Scenario: caso de error
    │               └── Scenario Outline: validaciones
    │
    └── INV-001 (Invariante: monto > 0, al menos 1 partida)
```

---

## 📋 Palabras Clave Gherkin

| Keyword | Uso | En Español |
|---------|-----|------------|
| `Feature` | Descripción de la funcionalidad | Funcionalidad |
| `Scenario` | Un caso específico | Escenario |
| `Given` | Estado previo / precondiciones | Dado que |
| `When` | Acción del usuario/sistema | Cuando |
| `Then` | Resultado esperado | Entonces |
| `And` | Continúa el paso anterior | Y |
| `But` | Excepción al paso anterior | Pero |
| `Background` | Setup común a todos los escenarios | Antecedentes |
| `Scenario Outline` | Escenario parametrizado | Esquema del escenario |
| `Examples` | Datos para el outline | Ejemplos |

---

## 🎯 Reglas de Escritura

```
1. Un Feature por funcionalidad de negocio (no por endpoint)
2. Cada Scenario testea UN comportamiento específico
3. Given: preparar estado — sin lógica de negocio
4. When: UNA acción principal (máximo 2 con And)
5. Then: verificar resultado observable — nunca estado interno
6. Scenario Outline para validaciones repetitivas con datos diferentes
7. Background para setup compartido — mantenerlo mínimo
8. Nombres de scenario descriptivos: "Rechazar pedido sin stock" no "Test caso 3"
```

---

## 🚫 Anti-patterns BDD

```
❌ Escenarios técnicos: "Given que hay un registro en la tabla orders"
   → Usar lenguaje de negocio: "Dado que existe un pedido pendiente"

❌ Escenarios genéricos: "Scenario: Funciona correctamente"  
   → Ser específico: "Scenario: Aplicar descuento del 15% a clientes frecuentes"

❌ Escenarios largos: 20 pasos Given/When/Then
   → Máximo 3-5 Given, 1-2 When, 2-4 Then

❌ Duplicar lógica de UI: "When hago click en el botón azul de la esquina"
   → Describir intención: "When confirmo el pedido"
```

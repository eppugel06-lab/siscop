---
id: BDD-UC-XXX
title: "[Nombre del escenario]"
uc: UC-XXX
req: REQ-F-XXX
status: "Draft | Approved | Automated"
---

```gherkin
Feature: [Nombre de la funcionalidad]
  Como [actor/rol]
  Quiero [acción que realiza]
  Para [beneficio de negocio que obtiene]

  Background:
    Given que estoy autenticado como "[rol]"
    And que [precondición común a todos los escenarios]

  Scenario: [Caso feliz — flujo principal exitoso]
    Given que [estado inicial del sistema]
    And que [condición adicional si aplica]
    When [acción principal del usuario]
    And [acción complementaria si aplica]
    Then el sistema [resultado esperado]
    And [verificación adicional]
    And se muestra el mensaje "[mensaje de confirmación]"

  Scenario: [Caso de error — validación que falla]
    Given que [estado inicial]
    When [acción que debe fallar]
    Then el sistema muestra error "[mensaje de error exacto]"
    And [el estado del sistema no cambia]

  Scenario: [Caso de borde — condición límite]
    Given que [condición especial/límite]
    When [acción]
    Then [resultado esperado en condición límite]

  Scenario Outline: [Validación con múltiples datos]
    Given que estoy en [contexto]
    When ingreso <campo> con valor <valor>
    Then el sistema <resultado>

    Examples:
      | campo | valor | resultado |
      | [campo] | [valor_válido] | acepta el dato |
      | [campo] | [valor_inválido] | muestra error "[mensaje]" |
      | [campo] | [valor_límite] | [resultado en límite] |
```

## Trazabilidad
- Requisito: REQ-F-XXX
- Caso de Uso: UC-XXX
- Invariantes validadas: INV-XXX

## Estado de Automatización
- [ ] Escenario escrito y aprobado
- [ ] Test automatizado implementado
- [ ] Test pasa en CI/CD

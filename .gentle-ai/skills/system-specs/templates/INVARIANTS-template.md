# Invariantes del Dominio — [Nombre del Sistema]

> **Definición:** Una invariante es una regla de negocio que NUNCA puede violarse,  
> independientemente del estado del sistema o las acciones del usuario.

---

## Invariantes Críticas

### INV-001: [Nombre de la invariante]
```
Regla: [Descripción precisa de la regla]
Entidad: [A qué entidad/aggregate aplica]
Validar en: [creación / edición / transición de estado]
Mensaje de error: "[Mensaje exacto que se muestra al usuario]"

Ejemplo válido: [caso que cumple la invariante]
Ejemplo inválido: [caso que viola la invariante]
```

### INV-002: [Nombre de la invariante]
```
Regla: [Descripción]
Entidad: [Entidad]
Validar en: [Cuándo]
Mensaje de error: "[Mensaje]"
```

---

## Reglas de Cálculo

### CALC-001: [Nombre del cálculo]
```
Fórmula: [fórmula matemática]
Inputs: [qué datos necesita]
Output: [qué produce]
Precisión: [decimales, redondeo]
Ejemplo: [cálculo con números reales]
```

---

## Restricciones de Estado

### EST-001: [Transición de estado]
```
Desde: [estado origen]
Hacia: [estado destino]
Condición: [qué debe cumplirse para la transición]
Efecto: [qué cambia en el sistema al transicionar]
```

---

## Trazabilidad

| Invariante | REQ | UC | Implementada | Testeada |
|-----------|-----|-----|-------------|---------|
| INV-001 | REQ-F-XXX | UC-XXX | ☐ | ☐ |
| INV-002 | REQ-F-XXX | UC-XXX | ☐ | ☐ |

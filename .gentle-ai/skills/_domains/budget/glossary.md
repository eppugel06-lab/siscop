# 📖 Glosario — Dominio de Presupuestos

> **Uso:** Este glosario es la referencia definitiva de términos del dominio.  
> Si un término no está aquí, no es parte del lenguaje del dominio.

---

## A

**Aprobación** — Acción por la cual un presupuesto en estado SENT pasa a APPROVED. Indica que el cliente aceptó la propuesta económica y las condiciones.

---

## C

**Categoría** — Agrupación lógica de partidas dentro de un presupuesto (ej: "Desarrollo", "Diseño", "Infraestructura"). Opcional. Sirve para presentación visual y reportes.

**Cliente (Client)** — Entidad comercial destinataria del presupuesto. Tiene nombre comercial, razón social, identificador fiscal y datos de contacto. Es un aggregate root independiente.

**Código de presupuesto** — Identificador único auto-generado con formato `PRES-YYYY-NNNN`. Inmutable una vez creado. No se reutiliza.

**Condiciones de pago** — Texto libre que describe cómo y cuándo debe pagarse (ej: "50% anticipo, 50% contra entrega", "Pago a 30 días").

---

## D

**Descuento global** — Porcentaje de descuento que se aplica sobre el subtotal completo del presupuesto, antes de impuestos. Máximo configurable por admin (default: 50%).

**Descuento por partida** — Porcentaje de descuento aplicado a una partida individual. Se aplica antes de sumar al subtotal.

---

## E

**Estado (Status)** — Posición actual del presupuesto en su ciclo de vida: DRAFT, SENT, APPROVED, REJECTED, INVOICED, EXPIRED. Solo transiciones válidas permitidas.

**Expiración** — Proceso automático por el cual un presupuesto SENT cuya fecha de vencimiento ha pasado cambia a EXPIRED.

---

## F

**Fecha de emisión** — Día en que se crea o envía formalmente el presupuesto.

**Fecha de vencimiento** — Día límite para que el cliente responda. Default: 30 días desde emisión.

---

## I

**Impuesto (Tax)** — Carga fiscal aplicada sobre el subtotal. Default: IVA 16% (México). Configurable por país y tipo de servicio.

**Invariante** — Regla de negocio que nunca puede violarse independientemente del estado del sistema (ver `rules.md`).

---

## M

**Moneda (Currency)** — Unidad monetaria del presupuesto. Un presupuesto maneja una sola moneda. Soportadas: MXN, USD, EUR, COP.

**Money** — Value object que encapsula un monto monetario con su moneda. Inmutable. Operaciones matemáticas seguras con redondeo a 2 decimales.

---

## P

**Partida (BudgetItem)** — Línea individual en el presupuesto que describe un servicio o producto, con cantidad, precio unitario y subtotal.

**Presupuesto (Budget)** — Aggregate root. Documento comercial que detalla una propuesta económica a un cliente, con partidas, montos e impuestos.

**Precio unitario** — Costo de una unidad individual del servicio/producto en la partida. Siempre > 0.

---

## R

**Razón social** — Nombre legal de la empresa cliente, usado para facturación formal.

**RFC/NIT/RUT** — Identificador fiscal del cliente según su país (México: RFC, Colombia: NIT, Chile: RUT).

---

## S

**Subtotal** — Suma de todos los subtotales de partidas, antes de impuestos y descuento global. Calculado automáticamente.

---

## T

**Total** — Monto final del presupuesto = subtotal + impuestos - descuento_global. Calculado automáticamente. Nunca editable directamente.

**Transición** — Cambio de estado del presupuesto. Solo las transiciones definidas en rules.md son válidas.

---

## U

**Unidad** — Medida de la cantidad en una partida: "hora", "unidad", "mes", "proyecto", "servicio".

---

## V

**Versión** — Número incremental que trackea cuántas veces se ha re-enviado un presupuesto después de modificación. Versión 1 = primer envío.

**Vigencia** — Período entre fecha_emisión y fecha_vencimiento durante el cual el presupuesto es válido.

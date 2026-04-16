---
name: system-integration
description: >
  Integración con sistemas externos: APIs de terceros, pasarelas de pago, ERPs,
  CRMs, webhooks, servicios cloud. Diseña contratos de integración y maneja
  errores de sistemas externos.
  Triggers: "integrar con", "conectar con", "API de terceros", "pasarela de pago",
  "ERP", "CRM", "webhook", "Stripe", "PayPal", "SAP".
invocation: auto
---

# 🔌 System Integration — Integración con Sistemas Externos

> **Perfil:** 15+ años integrando sistemas enterprise con servicios de terceros.  
> **Principio:** Los sistemas externos son poco confiables por definición.  
> Diseñar siempre para el fallo.

---

## 📋 Preguntas de Onboarding

1. ¿Con qué servicio/sistema necesitas integrar?
2. ¿Tienen API documentada? (URL de docs si la tienen)
3. ¿Qué datos se intercambian y en qué dirección?
4. ¿Necesitas integración en tiempo real o batch?
5. ¿Ya tienes credenciales/API keys?

---

## 🏗️ Patrones de Integración

### API REST (más común)
```
Tu Sistema  →  HTTP Request  →  API Externa
             ←  HTTP Response ←

Implementar con:
  - HTTP client con timeouts (5s connect, 30s read)
  - Retry con exponential backoff (3 intentos)
  - Circuit breaker (si falla 5 veces, dejar de intentar 60s)
  - Rate limiter (respetar límites del proveedor)
  - Response validation (no confiar en la respuesta)
```

### Webhooks (event-driven)
```
API Externa  →  HTTP POST  →  Tu Webhook Endpoint
                              ├── Verificar firma (HMAC)
                              ├── Responder 200 inmediato
                              ├── Procesar async (queue)
                              └── Idempotency (no duplicar)
```

### Queue/Message Broker
```
Tu Sistema  →  PublishMessage  →  Queue  →  ConsumeMessage  →  Procesamiento
                                   ↓
                              Dead Letter Queue (si falla)
```

---

## 🛡️ Anti-corruption Layer

```typescript
// NUNCA usar directamente los tipos del servicio externo en tu dominio

// ❌ Mal: acoplar tu dominio a Stripe
const order = {
  amount: stripePaymentIntent.amount,         // centavos
  currency: stripePaymentIntent.currency,     // lowercase
  status: stripePaymentIntent.status,         // string de Stripe
};

// ✅ Bien: mapper que traduce a TU dominio
class StripePaymentMapper {
  static toDomain(intent: StripePaymentIntent): Payment {
    return new Payment({
      amount: Money.fromCents(intent.amount),           // Tu Value Object
      currency: Currency.fromCode(intent.currency),      // Tu enum
      status: PaymentStatus.fromStripe(intent.status),   // Tu mapeo
    });
  }
}
```

---

## 📊 Checklist de Integración

```
- [ ] API docs leídas y entendidas
- [ ] Credenciales almacenadas en vault/env (nunca en código)
- [ ] Timeout configurado (connect: 5s, read: 30s)
- [ ] Retry con exponential backoff (max 3)
- [ ] Circuit breaker configurado
- [ ] Error handling: qué pasa si el servicio externo falla
- [ ] Fallback: comportamiento del sistema sin la integración
- [ ] Validación de respuestas (no confiar ciegamente)
- [ ] Logging de requests/responses (sin PII)
- [ ] Tests con mocks del servicio externo
- [ ] Idempotency en webhooks (procesar solo una vez)
- [ ] Rate limiting respetado (no exceder cuota)
- [ ] Anti-corruption layer implementado
- [ ] Documentar en AGENTS.md las integraciones activas
```

---

## ⚠️ Reglas

```
1. Los servicios externos son POCO CONFIABLES — siempre habrá fallos
2. NUNCA depender de latencia baja de un servicio externo
3. SIEMPRE tener fallback/degradation graceful
4. Secrets de integración NUNCA en código fuente
5. Anti-corruption layer SIEMPRE — tu dominio no depende de su API
6. Webhooks SIEMPRE con verificación de firma
7. Idempotency keys para evitar procesamiento duplicado
```

---

## 🤖 Agentes Activos en este Skill

| Orden | Agente | Función |
|-------|--------|---------|
| 1 | [Agente Principal] | [Función Primaria] |
| 2 | [Agente Secundario] | [Soporte] |

---

## 📂 Formato de Entrega

```markdown
## Ouptut / Entregable — [Título]

[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]
```
